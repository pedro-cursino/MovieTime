function changePlayer(url) {
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = url + filmeId;
}

function openPopup(filmeId) {
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = `https://embedder.net/e/movie?imdb=${filmeId}`;

  // Popup
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  // Players
  document.querySelector('.button-container').style.display = 'none';
  // Episodes
  document.querySelector('.button-container').style.display = 'block';
}

function closePopup() {
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = "";

  // Popup
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  // Players
  document.querySelector('.button-container').style.display = 'none';
  // Episodes
  document.querySelector('.episode-controls').style.display = 'none';

}