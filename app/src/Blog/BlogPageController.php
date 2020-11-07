<?php

use SilverStripe\Control\HTTPRequest;

class BlogPageController extends PageController
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
        /**/
        $articles = [];
        foreach($this->Articles()->toArray() as $article){
            $link = [
                'Title' => $article->Title,
                'Content' => $article->Content,
                'Image' => $article->Image,
                'URLSegment' => $article->URLSegment
            ];
            array_push($articles, $link);
        }

        $viewableData = [
            'Content' => $this->Content,
            'Articles' => json_encode($articles),
            'SiteConfig_Title' => $this->SiteConfig->Title,
            'SiteConfig_Phone' => $this->SiteConfig->Phone,
            'SiteConfig_SocialMediaLinks' => json_encode($socialMediaLinks)
        ];
        /**/
        $this->response->addHeader('Content-Type', 'application/json');
        return json_encode($viewableData);
    }
}