export function getArticle(articleID) {
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    return articles.find(item => item.id===articleID);
}

export function addArticle(article) {
    const response = {success: true};

    const latestArticleID = localStorage.getItem("latest_article_id", 0);
    const articles = JSON.parse(localStorage.getItem("articles")) || [];

    article.id = latestArticleID + 1;
    articles.push(article);

    response.articles = articles;

    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("latest_article_id", article.id);

    return response;
}

export function editArticle(article) {
    const response = {success: false};

    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    articles = articles.map(item => {
        if(item.id === article.id) {
            item = article;
            response.success = true;
        }
        return item;
    });

    localStorage.setItem("articles", JSON.stringify(articles));

    response.articles = articles;
    return response;
}

export function deleteArticle(article) {
    const response = {success: true};

    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    articles = articles.filter(item => item.id !== article.id);

    localStorage.setItem("articles", JSON.stringify(articles));

    response.articles = articles;

    return response;
}