import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("connected: ", socket.id);

  socket.on("Send-location", (data) => {
    console.log("location id: ", socket.id);
    io.emit("receive-location", {
      id: socket.id,
      ...data,
    });
  });

  socket.on("disconnect", (data) => {
    console.log("disconnected id: ", socket.id);
    io.emit("disconnected-location", {
      id: socket.id,
      ...data,
    });
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3100, () => {
  console.log("Server is running on http://localhost:3100");
});
