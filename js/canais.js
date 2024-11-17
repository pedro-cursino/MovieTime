fetch('../canais.json')
  .then(response => response.json())
  .then(channels => {
    const container = document.getElementById('channel-logos');

    channels.forEach(channel => {
      if (channel.nome !== "undefined") {
        const img = document.createElement('img');
        img.src = `../src/${channel.src}.jpg`;
        img.className = 'logo';
        img.alt = channel.nome;

        img.addEventListener('click', () => {
          const iframe = document.getElementById("EmbedderContainer");
          iframe.src = `//%78%6E%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%2D%67%33%34%6C%33%66%6B%70%37%6D%73%68%31%63%6A%33%61%63%6F%62%6A%33%33%61%63%32%61%37%61%38%6C%75%66%6F%6D%6D%61%37%63%66%32%62%31%73%68%2E%78%6E%2D%2D%2D%31%6C%31%2D%2D%35%6F%34%64%78%62%2E%78%6E%2D%2D%2D%32%32%2D%2D%31%31%2D%2D%33%33%2D%2D%39%39%2D%2D%37%35%2D%2D%2D%2D%2D%2D%2D%2D%2D%62%32%35%7A%6A%66%33%6C%74%61%36%6D%77%66%36%61%34%37%64%7A%61%39%34%65%2E%78%6E%2D%2D%70%63%6B%2E%78%6E%2D%2D%7A%63%6B%2E%78%6E%2D%2D%30%63%6B%2E%78%6E%2D%2D%70%63%6B%2E%78%6E%2D%2D%79%63%6B%2E%78%6E%2D%2D%2D%2D%2D%30%62%34%61%73%6A%61%38%63%62%65%77%32%62%34%62%30%67%64%30%65%64%62%6A%6D%32%6A%70%61%31%62%31%65%39%7A%76%61%37%61%30%33%34%37%73%34%64%61%32%37%39%37%65%37%71%72%69%2E%78%6E%2D%2D%31%63%6B%32%65%31%62/player3/ch.php?canal=${channel.src}`;

          // Popup
          document.getElementById("popup").style.display = "block";
          document.getElementById("overlay").style.display = "block";
          // Players
          document.querySelector('.button-container').style.display = 'none';
          // Episodes
          document.querySelector('.episode-controls').style.display = 'none';
        });
        container.appendChild(img);
        document.getElementById("div-reverse").style.display = "block";
      }
    });
  });