/* Servidor que manejará la comunicación en tiempo real. 
Se tiene que llamar server.js por defecto porque asi lo busca Node.js*/

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let camerasState = [false, false, false, false, false]; // Estado de las cámaras

app.use(express.static('public')); // Sirve el contenido estático (HTML, CSS, JS)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar el estado inicial de las cámaras al cliente recién conectado
    socket.emit('stateUpdate', camerasState);

    // Escuchar cuando un cliente cambia el estado de una cámara
    socket.on('toggleCamera', (camIndex) => {
        camerasState[camIndex] = !camerasState[camIndex]; // Cambiar el estado de la cámara

        // Enviar la actualización a todos los clientes
        io.emit('stateUpdate', camerasState);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

//Esto significa que tu aplicación escuchará en el puerto que Heroku le asigne o, si no está en Heroku, en el puerto 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
