const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");

const { connectSockets } = require("./socket");

const PORT = 8000;

const app = express();

const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "..","public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

app.use("/", (req, res) => {
    res.render("index.html");
});

connectSockets(io);

server.listen(PORT, () => {
    console.log(`Server is open in ${PORT}`);
});