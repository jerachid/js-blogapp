import "./form.scss";

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");

let errors = [];

const formIsValid = (data) => {
  if (!data.author || !data.category || !data.content) {
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

      const response = await fetch("https://restapi.fr/api/dwwm_rachid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });
      const body = await response.json(); // j'attends que json me renvoie le body de la response
      form.reset();
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  }
});
