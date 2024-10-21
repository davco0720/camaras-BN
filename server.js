const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let camerasState = [false, false, false, false, false]; // Estado de las cámaras

app.use(express.static('public')); // Servir contenido estático

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar el estado inicial de las cámaras al cliente
    socket.emit('stateUpdate', camerasState);

    // Escuchar cuando un cliente activa/desactiva una cámara
    socket.on('toggleCamera', (camIndex) => {
        // Desactivar todas las cámaras
        camerasState = camerasState.map(() => false);
        // Activar solo la cámara seleccionada
        camerasState[camIndex] = true;

        // Enviar el estado actualizado a todos los clientes
        io.emit('stateUpdate', camerasState);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
