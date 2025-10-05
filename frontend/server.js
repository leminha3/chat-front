const express = require("express");
const path = require("path");

const app = express();
const PORT = 5500;

app.use(express.static(__dirname)); // phục vụ index.html, script.js, style.css, assets

app.listen(PORT, () => {
  console.log(`✅ Frontend chạy tại http://localhost:${PORT}`);
});
