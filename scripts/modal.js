import { players } from './script.js';

// Get the modal
const myModal = document.getElementById("myModal");

// Get the buttons that opens the modal
const modalButton1 = document.getElementById("modalButton1");
const modalButton2 = document.getElementById("modalButton2");

// Get the <button> element that closes the modal and <button> element that saves the name
const cancelButton = document.getElementById("cancelButton");
const saveButton = document.querySelector('.save-button');

let currentPlayerEditing = null;

// Add event listener to save button
saveButton.addEventListener('click', function(e) {
  e.preventDefault();
  savePlayerName();
});

// Add event listener for Enter key in modal input
document.getElementById('modalInput').onkeydown = function(e){
  if (e.keyCode == 13){
    e.preventDefault();
    savePlayerName();
  }
}

// Function to save player name
function savePlayerName() {
  const playerName = document.getElementById("modalInput").value;
  if (!modalInput.checkValidity()) {
    modalInput.reportValidity();
    return;
  }
  if (playerName !== '') {
    if (currentPlayerEditing === 1) {
      players[0].name = playerName;
      document.querySelector('.player-name.player-one').innerText = playerName;
    } else if (currentPlayerEditing === 2) {
      players[1].name = playerName;
      document.querySelector('.player-name.player-two').innerText = playerName;
    }
    myModal.style.display = "none";
  }
}

// When the user clicks on either button, open the modal
modalButton1.onclick = function() {
  currentPlayerEditing = 1;
  document.getElementById("modalInput").value = ""; // Clear input
  myModal.style.display = "block";
}
modalButton2.onclick = function() {
  currentPlayerEditing = 2;
  document.getElementById("modalInput").value = ""; // Clear input
  myModal.style.display = "block";
}

// When the user clicks on <button> (Cancel), close the modal
cancelButton.onclick = function() {
  document.getElementById("modalInput").value = ""; // Clear input
  myModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
}