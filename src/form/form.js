import "./form.scss";

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");
const cancelBtn = document.querySelector(".btn-secondary");
let articleId;

const initForm = async () => {
  const params = new URL(location.href); // une querystring
  articleId = params.searchParams.get("id"); // on recupere l'id depuis la querystring
  const submitBtn = document.querySelector(".btn-primary");

  if (articleId) {
    const response = await fetch(
      `https://restapi.fr/api/dwwm_rachid/${articleId}`
    );
    if (response.status < 299) {
      const article = await response.json();
      // on va remplir notre formulaire
      submitBtn.innerText = "Sauvegarder";
      fillForm(article);
    }
  }
};

const fillForm = (article) => {
  const author = document.querySelector('input[name="author"]');
  const image = document.querySelector('input[name="image"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");

  author.value = article.author;
  image.value = article.image;
  category.value = article.category;
  title.value = article.title;
  content.value = article.content;
};

initForm();

cancelBtn.addEventListener("click", () => {
  location.assign("./index.html");
});

const formIsValid = (data) => {
  let errors = [];
  if (!data.author || !data.category || !data.content || !data.title) {
    errors.push("Vous devez renseigner tous les champs");
  }

  if (errors.length) {
    // si qqchose, renvoie true
    let errorHtml = "";
    errors.forEach((error) => {
      errorHtml += `<li>${error}</li>`;
    });
    errorList.innerHTML = errorHtml;
    return false;
  } else {
    errorList.innerHTML = "";
    return true;
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const entries = formData.entries();

  const data = Object.fromEntries(entries); // conversion en un objet

  if (formIsValid(data)) {
    try {
      const json = JSON.stringify(data);
      let response;

      if (articleId) {
        // j'enregistre la modification de mon article
        response = await fetch("https://restapi.fr/api/dwwm_rachid", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: json,
        });
      } else {
        // sinon je creer un nouvel article
        response = await fetch("https://restapi.fr/api/dwwm_rachid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json,
        });
      }

      if (response.status < 299) {
        // une redirection vers la page d'accueil
        location.assign("./index.html");
      }
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  }
});
