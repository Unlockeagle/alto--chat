console.log("Soy javaScript funcionaa");

//Creamos la instancia desde el lado del cliente

const socket = io();

//Crear variable para guardar el nombre del usuario

let user;
const chatBox = document.getElementById("chatBox");

//Utilizamos Sewwt Alert para mensaje de bienvenida

//Swal es un objeto global que nos permite usar los metodos de la libreria
//fire es el metodo que nos permite configurar el alert

Swal.fire({
  title: "Identeficate amiguito",
  input: "text",
  text: "Ingresa un usuario para identificartes en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log(user);
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    //metodo trim elimina espacios en blanco
    if (chatBox.value.trim().length > 0) {
      //envia mensaje
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

// vamos a mostrar los mensajes en la pantalla del navegador:
socket.on("messagesLogs", (data) => {
  const log = document.getElementById("messagesLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });

  log.innerHTML = messages
 
});
