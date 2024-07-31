import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const PUERTO = 8080;
//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//configuramos handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.get("/", (req, res) => {
  res.render("index");
});

//listen
const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto \nhttp://localhost:${PUERTO}`);
});
//Me guardo una referencia del servidor y generamos 2 instancias frontend y backend con socket

//Creamos un array para el historial de mensajes
let messages = []

//Instancia backend
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
  //escuchamos el evento
  socket.on("message", (data) => {
    messages.push(data)
    //emitimos mensaje para el cliente con todo el array de datos
    io.emit("messagesLogs", messages)
  })

});


