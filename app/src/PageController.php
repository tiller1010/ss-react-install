<?php

namespace {

    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Control\HTTPRequest;

    class PageController extends ContentController
    {
        private static $url_handlers = [
            'fetchViewableData' => 'feedViewableData'
        ];
        /**/
        private static $allowed_actions = [
            'feedViewableData'
        ];
        /**/
        protected function init()
        {
            parent::init();
        }

        public function feedViewableData(HTTPRequest $request){
            /**/
            $viewableData = [
                'Content' => $this->Content
            ];
            /**/
            $this->response->addHeader('Content-Type', 'application/json');
            return json_encode($viewableData);
        }
    }
}
