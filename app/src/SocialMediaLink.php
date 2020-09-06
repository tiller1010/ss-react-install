<?php

use SilverStripe\ORM\DataObject;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\Forms\Fieldlist;
use SilverStripe\Forms\TextField;

class SocialMediaLink extends DataObject {

	private static $db = [
		'Type' => 'Text',
		'Link' => 'Text',
		'Icon' => 'Text'
	];

	private static $has_one = [
		'SiteConfig' => SiteConfig::class
	];

	private static $summary_fields = [
		'Type'
	];
	
	public function getCMSFields()
	{
		return new Fieldlist(
			TextField::create('Type'),
			TextField::create('Link'),
			TextField::create('Icon')
				->setAttribute('placeholder', 'Example: facebook')
		);
	}
}