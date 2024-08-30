function changePlayer(url) {
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = url + filmeId;
}

function openPopup(filmeId) {
  const buttonPlayers = document.querySelector('.button-container');
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = `https://embedder.net/e/movie?imdb=${filmeId}`;

  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  buttonPlayers.style.display = 'block';
}

function closePopup() {
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = "";

  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}