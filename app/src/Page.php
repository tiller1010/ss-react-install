<?php

namespace {

    use SilverStripe\Forms\Tab;
    use SilverStripe\Forms\TabSet;
    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

    class Page extends SiteTree
    {
        private static $db = [];

        private static $has_one = [];

        public function getCMSFields()
        {
        	$fields = parent::getCMSFields();

            $ElementalArea = $fields->fieldByName('Root.Main.ElementalArea');
            $fields->removeByName('ElementalArea');

            $fields->insertAfter(new TabSet(
                'PageContent',
                new Tab(
                    'HTML Content',
                    HTMLEditorField::create('Content')
                ),
                new Tab(
                    'Elemental',
                    $ElementalArea
                )
            ), 'Navigation Label');

        	return $fields;
        }
    }
}
