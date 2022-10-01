const boton = document.querySelector('.searchBtn');
const lista = document.querySelector('.imgList');
const clearBtn = document.querySelector('.clear');
let ima = [];

boton.addEventListener('click', function (e) {
  e.preventDefault();
  const imgs = [];
  const fecha = document.querySelector('input').value;
  const mesDia = fecha.split('-').slice(1).join('-');
  const year = new Date().getFullYear();
  lista.innerHTML = '';

  for (let f = 1995; f <= year; f++) {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=SbevutgF6LLMeUgl7sZo4XaPLdxsltwAp68fARON&date=${f}-${mesDia}`
    )
      .then(res => res.json())
      .then(data => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        li.classList.add('newLi');
        img.classList.add('bdImg');
        img.src = data.hdurl;
        li.appendChild(img);
        lista.appendChild(li);
        img.addEventListener('click', () => {
          console.log('hello');
        });
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }
});

console.log(ima);
clearBtn.addEventListener('click', () => {
  lista.innerHTML = '';
});
