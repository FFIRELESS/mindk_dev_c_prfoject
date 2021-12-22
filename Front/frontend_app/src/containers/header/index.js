import { Articles, Add_article, Profile, None } from "../../components/body";
import { useState } from "react";

export var HeaderContainer = function () {
    const [articles, setArticles] = useState(<None/>);
    const [add_article, setAdd_article] = useState(<None/>);
    const [profile, setProfile] = useState(<None/>);
    const none = useState(<None/>);

    const showArticles = () => {
        hideAll();
        setArticles(<Articles/>);
    }

    const showAdd_articles = () => {
        hideAll();
        setAdd_article(<Add_article/>);
    }

    const showProfile = () => {
        hideAll();
        setProfile(<Profile/>);
    }

    const showNone = () => {
        hideAll();
    }

    const hideAll = () => {
        setArticles(<None/>);
        setAdd_article(<None/>);
        setProfile(<None/>);
    }

    return <div>
        <button onClick={showArticles}>SHOW ARTICLES</button>
        {articles}
        <button onClick={showAdd_articles}>ADD ARTICLE</button>
        {add_article}
        <button onClick={showProfile}>SHOW PROFILE</button>
        {profile}
        <button onClick={showNone}>HIDE ALL</button>
        {none}
    </div>;
};