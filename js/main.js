const boton = document.querySelector('.searchBtn');
const lista = document.querySelector('.imgList');
const clearBtn = document.querySelector('.clear');
const dialog = document.querySelector('dialog');
let dataObj = [];

boton.addEventListener('click', function (e) {
  e.preventDefault();
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
        dataObj.push({
          date: data.date,
          title: data.title,
          desc: data.explanation,
          img: data.hdurl,
        });
        const li = document.createElement('li');
        const img = document.createElement('img');
        li.classList.add('newLi');
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
lista.addEventListener('click', function (e) {
  let img = e.target.closest('img');
  if (!img) return;
  // if (img.src === dataObj.img) console.log('same');
  const dialogImg = document.querySelector('dialog>img');
  dialogImg.src = img.src;
  dataObj.forEach(obj => {
    if (obj.img === img.src) {
      document.querySelector('.dialogTitle').textContent = obj.title;
      document.querySelector('.dialogDate').textContent = obj.date;
      document.querySelector('.dialogDesc').textContent = obj.desc;
    }
  });

  dialog.showModal();
});

clearBtn.addEventListener('click', () => {
  lista.innerHTML = '';
});
