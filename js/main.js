const searchBtn = document.querySelector('.searchBtn');
const photosGrid = document.querySelector('.imgList');
const clearBtn = document.querySelector('.clearBtn');
const dialog = document.querySelector('dialog');
const dialogCloseBtn = document.querySelector('.dialogCloseBtn');
const imagenes = document.querySelector('.imagenes');
let dataObj = [];

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const date = document.querySelector('input').value;
  const mesDia = date.split('-').slice(1).join('-');
  const year = new Date().getFullYear();
  photosGrid.innerHTML = '';

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
        const html = `<li class="newLi">
            <img class="bdImg" src="${data.hdurl}">
          </li>`;
        photosGrid.insertAdjacentHTML('beforeend', html);
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }
});

photosGrid.addEventListener('click', function (e) {
  let img = e.target.closest('img');
  if (!img) return;
  dataObj.forEach(obj => {
    if (obj.img === img.src) {
      document.querySelector('.dialogTitle').textContent = obj.title;
      document.querySelector('.dialogDate').textContent = obj.date;
      document.querySelector('.dialogDesc').textContent = obj.desc;
      document.querySelector('dialog>img').src = obj.img;
    }
  });

  dialog.showModal();
});

dialogCloseBtn.addEventListener('click', () => {
  dialog.close();
});

clearBtn.addEventListener('click', () => {
  photosGrid.innerHTML = '';
});
