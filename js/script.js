let configData = {};
let filmeId = '';
let serieId = '';

fetch('../config.json')
  .then(response => response.json())
  .then(data => {
    configData = data;
    console.log(`O cara abre o Inspecionar da pagina e se acha "O PROGRAMADOR" KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK`);
  })
  .catch(error => {
    console.error('Erro ao carregar o JSON:', error);
  });

function searchMovies() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();


  // PARTE DO FILME

  if (searchValue.length > 0) {
    fetch(`https://imdb8.p.rapidapi.com/title/auto-complete?q=${searchValue}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": configData.rapidapikey,
        "x-rapidapi-host": "imdb8.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(data => {
        const list = data.d;

        document.querySelector('.movies').innerHTML = '';
        document.querySelector('.series').innerHTML = '';

        // Cria o elemento <li> contendo a imagem e o título
        list.map((item) => {
          if (item.qid === "movie") {
            const name = item.l;
            const poster = item.i.imageUrl;
            const movie = `<li><img src="${poster}" class="filme" data-id="${item.id}"> <h2 data-id="${item.id}">${name}</h2></li>`;
            document.querySelector('.movies').innerHTML += movie;
          }
          if (item.qid === "tvSeries") {
            const name = item.l;
            const poster = item.i.imageUrl;
            const serie = `<li><img src="${poster}" class="serie" data-id="${item.id}"> <h2 data-id="${item.id}">${name}</h2></li>`;
            document.querySelector('.series').innerHTML += serie;
          }
        });
        document.querySelectorAll('.filme').forEach(item => {
          item.addEventListener('click', function () {
            filmeId = this.getAttribute('data-id');
            openPopup(filmeId);
          });
        });

        document.querySelectorAll('.serie').forEach(item => {
          item.addEventListener('click', function () {
            serieId = this.getAttribute('data-id');
            openPopup2(serieId);
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    document.querySelector('.movies').innerHTML = '';
  }
}

function backToHome() {
  document.getElementById('searchInput').value = '';
  searchMovies();
  searchAnime();
  document.getElementsByClassName("div-reverse1")[0].style.display = "none";
  document.getElementsByClassName("div-reverse2")[0].style.display = "none";
  document.getElementsByClassName("div-reverse3")[0].style.display = "none";
  // Popup
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.querySelector('.series').innerHTML = '';
}

document.getElementById('searchButton').addEventListener('click', function () {
  searchMovies();
  searchAnime();
  document.getElementsByClassName("div-reverse1")[0].style.display = "block";
  document.getElementsByClassName("div-reverse2")[0].style.display = "block";
  document.getElementsByClassName("div-reverse3")[0].style.display = "block";

});

document.querySelector('.logo').addEventListener('click', backToHome);

document.getElementById('searchInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchMovies();
    searchAnime();
    document.getElementsByClassName("div-reverse1")[0].style.display = "block";
    document.getElementsByClassName("div-reverse2")[0].style.display = "block";
    document.getElementsByClassName("div-reverse3")[0].style.display = "block";

  }
});