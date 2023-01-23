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
            <p class="article-author">${article.author} - <span>
              ${new Date(article.createdAt).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span></p>
            <p class="article-content">${article.content}</p>
            <div class="article-actions">
              <button class="btn btn-primary" data-id=${
                article._id
              }>Modifier</button>
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
  const editBtns = articlesContainer.querySelectorAll(".btn-primary");

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

  editBtns.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const target = event.target;

      const articleId = target.dataset.id;
      location.assign(`./form.html?id=${articleId}`);
    });
  });
};

const fetchArticles = async () => {
  // fonction asynchrone qui recupere les donnees depuis l'API
  try {
    const response = await fetch("https://restapi.fr/api/dwwm_rachid");
    let articles = await response.json(); // <=== on change 'const' en 'let'

    if (!(articles instanceof Array)) {
      // si 'articles' n'est pas un tableau
      articles = [articles]; // on le transforme en tableau
    }

    if (articles.length) {
      displayArticles(articles);
    } else {
      articlesContainer.innerHTML = "<p>Pas d'articles pour le moment</p>";
    }
  } catch (error) {
    console.log(error);
  }
};

fetchArticles();
