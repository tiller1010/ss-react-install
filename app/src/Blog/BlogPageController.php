<?php

use SilverStripe\Control\HTTPRequest;

class BlogPageController extends PageController
{
    private static $url_handlers = [
        'fetchViewableData' => 'feedViewableData',
        'articles/$articleURL' => 'renderArticle'
    ];
    /**/
    private static $allowed_actions = [
        'feedViewableData',
        'renderArticle'
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
                'Image' => $article->Image->URL,
                'URLSegment' => $article->URLSegment
            ];
            array_push($articles, $link);
        }

        $viewableData = [
            'Title' => $this->Title,
            'URLSegment' => $this->URLSegment,
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

    public function renderArticle(){
        $articleURL = $this->getRequest()->param('articleURL');
        $article = Article::get()->filter(['URLSegment' => $articleURL])->first();
        if($article->exists()){
            return $article->renderWith('Layout/Article');
        }
    }
}