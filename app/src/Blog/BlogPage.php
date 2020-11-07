<?php

use SilverStripe\Forms\Tab;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;

class BlogPage extends Page {
	
	private static $db = [];

	private static $has_many = [
		'Articles' => Article::class
	];

	public function getCMSFields()
	{
		$fields = parent::getCMSFields();

		$fields->insertBefore(new Tab(
			'Articles',
			GridField::create(
				'Articles',
				'Articles',
				$this->Articles(),
				GridFieldConfig_RecordEditor::create()
			)
		), 'Content');

		return $fields;
	}
}