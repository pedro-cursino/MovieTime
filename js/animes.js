// POSTER


let globalAnimeName = '';
function searchAnime() {
  const searchQuery = document.getElementById('searchInput').value;
  const apiURL = `https://animesdigital.org/chave/site/search/?keyword=${encodeURIComponent(searchQuery)}&type=undefined&nonce=f122ca405d`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const resultsUl = document.getElementById('animes');
      resultsUl.innerHTML = '';

      Object.keys(data).forEach(key => {
        const anime = data[key];
        const poster = anime.img;
        const name = anime.title;

        if (
          poster && name && 
          poster !== "https://animesdigital.org/wp-includes/images/media/default.svg" &&
          key !== "error"
        ) {
          const li = document.createElement('li');
          li.innerHTML = `<img src="${poster}" data-id="${key}">
                              <h2 data-id="${key}">${name}</h2>`;
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
    .replace('shippuden-dublado', 'shippuuden-dublado') // Naruto Shippuden
    .replace('kaisen-0', 'kaisen-filme-0') // Jujutsu Kaisen 0
    .replace('na-wa.', 'na-wa-filme') // Kimi no na wa
    .replace('100-iii', '100-3') // Mob Psycho
    .replace('zero-3rd-season', '-zero-3') // Re-Zero 3
    .replace('fumetsu-no-anata-e-2', 'fumetsu-no-anata-2') // To Your Eternity
    .replace('fumetsu-no-anata-2nd-season-dublado', 'fumetsu-no-anata-2-dublado') // To Your Eternity Dublado
    .replace('kyoto-fujououhen-(ao-no-exorcist-2)', '2') // Blue Exorcist
    .replace('yuki-no-hate-hen', '4') // Blue Exorcist
    .replace('ª-temporada', '') // Apenas Um Show
    .replace('½-(2024)', '1-2-2024') // Ranma
    .replace('!!', '') // Haikyu!!
    .replace('top-2nd-season', 'top-2') // Haikyu!!
    .replace('vs.', 'vs') // Haikyu!!
    .replace('forca-alienigena', 'força-alienigena') // Ben 10
    .replace('rezero-kara-hajimeru-isekai-seikatsu', 're-zero') // Re-Zero
    .replace('kara-hajimeru-isekai-seikatsu-2nd-season', '2') // Re-Zero 2
    .replace(',', '')
    .replace(',', '')
    .replace('.', '')
    .replace(/:/g, '');

  currentEpisode = parseInt(document.getElementById('episodeInput').value);
  const formattedEpisode = String(currentEpisode).padStart(2, '0');
  const urlAnime = `https://api.anivideo.fun/videohls.php?d=https://cdn-s01.mywallpaper-4k-image.net/stream/${animeName.charAt(0)}/${animeName}/${formattedEpisode}.mp4/index.m3u8`;

  document.getElementById('EmbedderContainer').src = urlAnime
    .replace('s01.mywallpaper-4k-image.net/stream/n/nige-jouzu', '01.cdn-will-wallpaper-4k.online/stream/n/nige-jouzu'); // nige jouzu no wakagimi

  console.log(document.getElementById('EmbedderContainer').src);
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