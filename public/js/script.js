const socket = io();

let camerasState = [false, false, false, false, false]; // Estado inicial de las cámaras

// Función para cambiar el estado de una cámara
function toggleCamera(camIndex) {
    socket.emit('toggleCamera', camIndex); // Notificar al servidor
}

// Actualizar la interfaz cuando recibimos el estado actualizado del servidor
socket.on('stateUpdate', (state) => {
    camerasState = state;
    updateButtons();
});

// Función para actualizar los botones en función del estado de las cámaras
function updateButtons() {
    for (let i = 0; i < camerasState.length; i++) {
        const button = document.getElementById(`cam${i + 1}`);
        button.style.backgroundColor = camerasState[i] ? 'red' : '#4CAF50'; // Cambiar color según estado
    }
}
