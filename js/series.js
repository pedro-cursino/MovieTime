function openPopup2(serieId) {
  const iframe = document.getElementById("EmbedderContainer");
  iframe.src = `https://supercdn.org/tvshow/${serieId}`;

  // Popup
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  // Players
  document.querySelector('.button-container').style.display = 'none';
  // Episodes
  document.querySelector('.button-container').style.display = 'none';
}