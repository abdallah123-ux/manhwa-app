require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: "session",
    keys: ["secretKey"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (username) {
    req.session.user = username;
    return res.json({ success: true, username });
  }
  res.status(400).json({ success: false });
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.get("/library", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });
  res.json({ username: req.session.user, library: [] });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
