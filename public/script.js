function login() {
  const username = document.getElementById("username").value;
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem("user", username);
      loadLibrary();
    }
  });
}

function logout() {
  fetch("/logout").then(() => {
    localStorage.clear();
    location.reload();
  });
}

function loadLibrary() {
  document.getElementById("login-area").style.display = "none";
  document.getElementById("library").style.display = "block";
  const chapters = JSON.parse(localStorage.getItem("chapters") || "[]");
  const list = document.getElementById("chapters");
  list.innerHTML = "";
  chapters.forEach((ch, i) => {
    const li = document.createElement("li");
    li.innerHTML = '<a href="' + ch.link + '" target="_blank">' + ch.name + '</a>';
    list.appendChild(li);
  });
}

function addChapter(e) {
  e.preventDefault();
  const name = document.getElementById("chapter-name").value;
  const link = document.getElementById("chapter-link").value;
  const chapters = JSON.parse(localStorage.getItem("chapters") || "[]");
  chapters.push({ name, link });
  localStorage.setItem("chapters", JSON.stringify(chapters));
  document.getElementById("chapter-form").reset();
  loadLibrary();
}

window.onload = function () {
  const user = localStorage.getItem("user");
  if (user) {
    loadLibrary();
  }
};
