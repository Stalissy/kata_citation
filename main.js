const form = document.getElementById("form-citation");
const inputCitation = document.getElementById("citation");
const inputAuthor = document.getElementById("author");
const quoteLst = document.getElementById("quote-list");
const count = document.getElementById("count");
const keyLocalStorage = "quotesData";

const citation = {
  author: "",
  text: "",
};

let quoteCount = 0;

// Initialisation
addQuote(citation, keyLocalStorage);
countQuote();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();

  form.reset();
});

function submitForm() {
  const quote = inputCitation.value;
  const author = inputAuthor.value;

  citation.text = quote;
  citation.author = author;

  //   addQuote(quote, author);
  addJson(citation, keyLocalStorage);
  addQuote(citation, keyLocalStorage);
  countQuote();
}

function addQuote(citation, key) {
  const storedQuotes = JSON.parse(localStorage.getItem(key) || "[]");

  quoteLst.innerHTML = "";

  storedQuotes.forEach((item, index) => {
    quoteLst.innerHTML += `
      <div class="quote">
        <p class="text">${item.text}</p>
        <p class="author">${item.author}</p>
        <button class="delete" data-index="${index}">🗑️</button>
      </div>`;
  });
}

function countQuote() {
  const lstQuote = document.querySelectorAll(".quote");
  nbQuote = lstQuote.length;
  count.textContent = `${nbQuote} citation`;
}

function addJson(citation, key) {
  // Récupérer les citations déjà stockées dans localStorage (ou tableau vide)
  const storedQuotes = JSON.parse(localStorage.getItem(key) || "[]");
  if (citation.text !== "clear" && citation.author !== "clear") {
    // Ajouter ta nouvelle citation
    storedQuotes.push(citation);
    // Sauvegarder à nouveau dans localStorage
    localStorage.setItem(key, JSON.stringify(storedQuotes));
  } else {
    localStorage.removeItem(key);
  }
  console.log(storedQuotes);
}

quoteLst.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const index = event.target.dataset.index;

    const storedQuotes = JSON.parse(
      localStorage.getItem(keyLocalStorage) || "[]",
    );

    storedQuotes.splice(index, 1);

    localStorage.setItem(keyLocalStorage, JSON.stringify(storedQuotes));

    addQuote(null, keyLocalStorage);
    countQuote();
  }
});
