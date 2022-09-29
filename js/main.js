const boton = document.querySelector('.searchBtn');
const lista = document.querySelector('.imgList');
const clearBtn = document.querySelector('.clear');

boton.addEventListener('click', function (e) {
  e.preventDefault();
  const fecha = document.querySelector('input').value;
  const mesDia = fecha.split('-').slice(1).join('-');
  const year = new Date().getFullYear();

  for (let f = 1995; f <= year; f++) {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=SbevutgF6LLMeUgl7sZo4XaPLdxsltwAp68fARON&date=${f}-${mesDia}`
    )
      .then(res => res.json())
      .then(data => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.classList.add('bdImg');
        img.src = data.hdurl;
        li.appendChild(img);
        lista.appendChild(li);
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }
});

clearBtn.addEventListener('click', () => {});
