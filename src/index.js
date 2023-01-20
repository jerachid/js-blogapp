import "./index.scss";

const articlesContainer = document.querySelector(".articles-container");

const displayArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleNode = document.createElement("div");
    articleNode.classList.add("article");
    articleNode.innerHTML = `
            <img
              src=${
                article.image
                  ? article.image
                  : "assets/images/default_profile.png"
              }
              alt=""
            />
            <h2>${article.title}</h2>
            <p class="article-author">${article.author}</p>
            <p class="article-content">${article.content}</p>
            <div class="article-actions">
              <button class="btn btn-danger" data.id=${
                article._id
              } >Supprimer</button>
            </div>
          `;
    return articleNode;
  });
  console.log(articlesDOM);

  articlesContainer.innerHTML = "";
  articlesContainer.append(...articlesDOM);
};

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/dwwm_rachid");
    const articles = await response.json();

    if (!articles.length) {
      displayArticles([articles]);
    } else {
      displayArticles(articles);
    }
  } catch (error) {
    console.log(error);
  }
};

fetchArticles();
