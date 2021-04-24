<?php

use SilverStripe\Forms\Tab;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class BlogPage extends Page {
	
	private static $db = [];

	private static $has_many = [
		'Articles' => Article::class
	];

	public function getCMSFields()
	{
		$fields = parent::getCMSFields();

		$fields->insertAfter(new Tab(
			'Articles',
			GridField::create(
				'Articles',
				'Articles',
				$this->Articles(),
				GridFieldConfig_RecordEditor::create()
			)
		), 'Elemental');

		return $fields;
	}
}