<?php

use SilverStripe\ORM\DataExtension;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\Fieldlist;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\Gridfield\Gridfield;
use SilverStripe\Forms\Gridfield\GridfieldConfig_RecordEditor;

class SiteConfigExtension extends DataExtension {

	private static $db = [
		'Phone' => 'Text',
		'Email' => 'Text'
	];
	
	private static $has_one = [
		'Logo' => Image::class
	];

	private static $has_many = [
		'SocialMediaLinks' => SocialMediaLink::class
	];

	private static $owns = [
		'Logo'
	];

	public function updateCMSFields(Fieldlist $fields)
	{
		$fields->addFieldToTab('Root.Main', UploadField::create('Logo'));
		$fields->addFieldToTab('Root.Main', TextField::create('Phone'));
		$fields->addFieldToTab('Root.Main', TextField::create('Email'));
		$fields->addFieldToTab('Root.Main',
			Gridfield::create(
				'SocialMediaLinks',
				'Social Media Links',
				$this->owner->SocialMediaLinks(),
				GridfieldConfig_RecordEditor::create()
			)
		);
	}
}