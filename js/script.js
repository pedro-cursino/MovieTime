let configData = {};
let filmeId = '';

fetch('../config.json')
  .then(response => response.json())
  .then(data => {
    configData = data;
    console.log(configData);
  })
  .catch(error => {
    console.error('Erro ao carregar o JSON:', error);
  });

function searchMovies() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();

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

        list.map((item) => {
          if (item.qid === "movie") {
            const name = item.l;
            const poster = item.i.imageUrl;
            const movie = `<li><img src="${poster}" class="filme" data-id="${item.id}"> <h2 data-id="${item.id}">${name}</h2></li>`;
            document.querySelector('.movies').innerHTML += movie;
          }
        });

        document.querySelectorAll('.filme').forEach(item => {
          item.addEventListener('click', function () {
            filmeId = this.getAttribute('data-id');
            openPopup(filmeId);
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
}

document.getElementById('searchButton').addEventListener('click', searchMovies);

document.querySelector('.logo').addEventListener('click', backToHome);

document.getElementById('searchInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchMovies();
  }
});