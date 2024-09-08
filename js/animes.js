// POSTER


let globalAnimeName = '';
function searchAnime() {
  const searchQuery = document.getElementById('searchInput').value;
  const apiURL = `https://animesdigital.org/chave/site/search/?keyword=${encodeURIComponent(searchQuery)}&type=undefined&nonce=f122ca405d`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const resultsUl = document.getElementById('animes');
      resultsUl.innerHTML = ''; // Limpa resultados anteriores

      Object.keys(data).forEach(key => {
        const anime = data[key];
        const poster = anime.img;
        const name = anime.title;

        // Verifica se o poster não é o padrão default.svg e não é error
        if (poster !== "https://animesdigital.org/wp-includes/images/media/default.svg" && key !== "error") {
          // Cria o elemento <li> contendo a imagem e o título
          const li = document.createElement('li');
          li.innerHTML = `<img src="${poster}" data-id="${key}">
                              <h2 data-id="${key}">${name}</h2>`;

          // Adiciona o evento de clique para o player
          li.addEventListener('click', function () {
            globalAnimeName = name;
            loadEpisode(name);
          });

          resultsUl.appendChild(li);
        }
      });
    })
    .catch(error => {
      console.error('Erro ao buscar animes:', error);
    });
}



// PESQUISAR PLAYER


let currentEpisode = parseInt(document.getElementById('episodeInput').value);


function loadEpisode(name) {
  const animeName = name.trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '-')
    .replace(/:/g, '');

  currentEpisode = parseInt(document.getElementById('episodeInput').value);
  const formattedEpisode = String(currentEpisode).padStart(2, '0');
  document.getElementById('EmbedderContainer').src = `https://api.anivideo.fun/videohls.php?d=https://cdn-s01.mywallpaper-4k-image.net/stream/${animeName.charAt(0)}/${animeName}/${formattedEpisode}.mp4/index.m3u8`;

  // Popup
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  // Players
  document.querySelector('.button-container').style.display = 'none';
  // Episodes
  document.querySelector('.episode-controls').style.display = 'block';
}


// EPISÓDIO


document.getElementById('episodeInput').addEventListener('change', function () {
  currentEpisode = parseInt(this.value);
  episodio = currentEpisode;
  closePopup();
  loadEpisode(globalAnimeName);
});

document.getElementById('prevEpisode').addEventListener('click', function () {
  if (currentEpisode > 1) {
    currentEpisode--;
    document.getElementById('episodeInput').value = currentEpisode;

    closePopup();
    loadEpisode(globalAnimeName);
  }
});

document.getElementById('nextEpisode').addEventListener('click', function () {
  currentEpisode++;
  document.getElementById('episodeInput').value = currentEpisode;

  closePopup();
  loadEpisode(globalAnimeName);
});