const searchBtn = document.querySelector('.searchBtn');
const loading = document.querySelector('.loading-message');
const photosGrid = document.querySelector('.imgList');
const clearBtn = document.querySelector('.clearBtn');
const dialog = document.querySelector('dialog');
const dialogCloseBtn = document.querySelector('.dialogCloseBtn');
const imagenes = document.querySelector('.imagenes');
let dataObj = [];

const getPicture = function (year, mesDia) {
  return new Promise(function (resolve, reject) {
    const ok = fetch(
      `https://api.nasa.gov/planetary/apod?api_key=SbevutgF6LLMeUgl7sZo4XaPLdxsltwAp68fARON&date=${year}-${mesDia}`
    );
    setTimeout(() => {
      if (ok) resolve(ok);
      else reject(new Error('Problem with NASA API'));
    }, 5000);
  });
};

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const date = document.querySelector('input').value;
  const mesDia = date.split('-').slice(1).join('-');
  const year = new Date().getFullYear();
  photosGrid.innerHTML = '';
  loading.style.opacity = 1;
  loading.innerHTML = 'Loading';

  for (let f = 1995; f <= year; f++) {
    getPicture(f, mesDia)
      .then(res => res.json())
      .then(data => {
        dataObj.push({
          date: data.date,
          title: data.title,
          desc: data.explanation,
          img: data.media_type === 'image' ? data.hdurl : data.url,
        });
        const html = `<li class="newLi">
        ${
          data.media_type === 'image'
            ? `<img class="bdImg" src="${data.hdurl}"> </img>`
            : `<iframe class="bdImg" src="${data.url}"></iframe>`
        }
          </li>`;
        photosGrid.insertAdjacentHTML('beforeend', html);
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }
  setTimeout(() => {
    loading.classList.add('done');
    loading.innerHTML = 'Done!';
    setTimeout(() => {
      loading.style.opacity = 0;
      loading.classList.remove('done');
    }, 2000);
  }, 1000);
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
