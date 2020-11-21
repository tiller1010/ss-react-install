<?php

namespace {

    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

    class Page extends SiteTree
    {
        private static $db = [];

        private static $has_one = [];

        public function getCMSFields()
        {
        	$fields = parent::getCMSFields();

        	$fields->addFieldToTab('Root.Main', HTMLEditorField::create('Content'), 'ElementalArea');

        	return $fields;
        }
    }
}
