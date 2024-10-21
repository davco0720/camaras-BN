// Este código manejará el comportamiento de los botones y se comunicará con el servidor

const socket = io();

// Cargar el estado inicial desde el Local Storage
let camerasState = JSON.parse(localStorage.getItem('camerasState')) || [false, false, false, false, false];

// Actualizar los botones al cargar
updateButtons();

// Función para cambiar el estado de una cámara
function toggleCamera(camIndex) {
    // Cambia el estado localmente
    camerasState[camIndex] = !camerasState[camIndex];
    // Guarda el nuevo estado en el Local Storage
    localStorage.setItem('camerasState', JSON.stringify(camerasState));
    // Notificar al servidor que se cambió el estado de una cámara
    socket.emit('toggleCamera', camIndex);
}

// Actualizar la interfaz cuando recibimos el estado actualizado del servidor
socket.on('stateUpdate', (state) => {
    camerasState = state;
    // Actualiza el Local Storage con el nuevo estado
    localStorage.setItem('camerasState', JSON.stringify(camerasState));
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
