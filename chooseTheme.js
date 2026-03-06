const themeSelect = document.getElementById("theme-select");
const body = document.body;

themeSelect.addEventListener("change", changeTheme);

function changeTheme() {
  body.classList.remove(
    "nurgle-theme",
    "khorne-theme",
    "slaneesh-theme",
    "tzeentch-theme",
    "chaos-universal-theme",
  );

  // Ajouter la classe du thème sélectionné
  const selectedTheme = themeSelect.value;
  body.classList.add(`${selectedTheme}-theme`);
}

changeTheme();
