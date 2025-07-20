function login() {
  const username = document.getElementById("username").value;
  if (username.trim() !== "") {
    localStorage.setItem("manhwaUser", username);
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("display-name").textContent = username;
    loadChapters();
  }
}

function logout() {
  localStorage.removeItem("manhwaUser");
  location.reload();
}

function addChapter() {
  const link = document.getElementById("chapter-link").value;
  if (link.trim() !== "") {
    let chapters = JSON.parse(localStorage.getItem("manhwaChapters") || "[]");
    chapters.push(link);
    localStorage.setItem("manhwaChapters", JSON.stringify(chapters));
    document.getElementById("chapter-link").value = "";
    loadChapters();
  }
}

function loadChapters() {
  let chapters = JSON.parse(localStorage.getItem("manhwaChapters") || "[]");
  const list = document.getElementById("chapter-list");
  list.innerHTML = "";
  chapters.forEach((link, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link}" target="_blank">فصل ${index + 1}</a>`;
    list.appendChild(li);
  });
}

window.onload = () => {
  const user = localStorage.getItem("manhwaUser");
  if (user) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("display-name").textContent = user;
    loadChapters();
  }
};