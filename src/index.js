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
              <button class="btn btn-danger" data-id=${
                article._id
              } >Supprimer</button>
            </div>
          `;
    return articleNode;
  });

  articlesContainer.innerHTML = "";
  articlesContainer.append(...articlesDOM);

  const deleteBtns = articlesContainer.querySelectorAll(".btn-danger");

  deleteBtns.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const target = event.target;
        console.log(target);
        const articleId = target.dataset.id;

        const response = await fetch(
          `https://restapi.fr/api/dwwm_rachid/${articleId}`,
          { method: "DELETE" }
        );
        const body = await response.json();
        fetchArticles();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const fetchArticles = async () => {
  // fonction asynchrone qui recupere les donnees depuis l'API
  try {
    const response = await fetch("https://restapi.fr/api/dwwm_rachid");
    const articles = await response.json();

    if (articles.length !== 0) {
      if (!articles.length) {
        displayArticles([articles]);
      } else {
        displayArticles(articles);
      }
    } else {
      articlesContainer.innerHTML = "<p>Pas d'articles...<p>";
    }
  } catch (error) {
    console.log(error);
  }
};

fetchArticles();
