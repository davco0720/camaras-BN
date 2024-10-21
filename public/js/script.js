//Este código manejará el comportamiento de los botones y se comunicará con el servidor

const socket = io();

let camerasState = [false, false, false, false, false]; // Estado inicial de las cámaras

// Función para cambiar el estado de una cámara
function toggleCamera(camIndex) {
    socket.emit('toggleCamera', camIndex); // Notificar al servidor que se cambió el estado de una cámara
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
        if (camerasState[i]) {
            button.style.backgroundColor = 'red'; // Activa
        } else {
            button.style.backgroundColor = '#4CAF50'; // Inactiva
        }
    }
}
