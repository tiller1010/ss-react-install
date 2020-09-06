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
            $socialMediaLinks = [];
            foreach($this->SiteConfig->SocialMediaLinks()->toArray() as $sml){
                $link = [
                    'Type' => $sml->Type,
                    'Link' => $sml->Link,
                    'Icon' => $sml->Icon
                ];
                array_push($socialMediaLinks, $link);
            }

            $viewableData = [
                'Content' => $this->Content,
                'SiteConfig_Title' => $this->SiteConfig->Title,
                'SiteConfig_Phone' => $this->SiteConfig->Phone,
                'SiteConfig_SocialMediaLinks' => json_encode($socialMediaLinks)
            ];
            /**/
            $this->response->addHeader('Content-Type', 'application/json');
            return json_encode($viewableData);
        }
    }
}
