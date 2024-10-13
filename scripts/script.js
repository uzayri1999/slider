// ВХОДНЫЕ ДАННЫЕ
const nameList = [
  {
  name: 'Rostov-on-Don, LCD admiral',
  url_image: 'images/rostovOnDon_admiral.png',
  CITY: 
    ['Rostov-on-Don', 'LCD admiral'],
  APSRTMENT_AREA: '81 m2',
  REPAIR_TIME: '3.5 months',
  REPAIR_COST: 'Upon request'
},
{
  name: 'Sochi, Thieves',
  url_image: 'images/sochi_thieves.png',
  CITY: 
    ['Sochi', 'Thieves'],
  APSRTMENT_AREA: '105 m2',
  REPAIR_TIME: '4 months',
  REPAIR_COST: 'Upon request'
},
{
  name: 'Rostov-on-Don, Patriotic',
  url_image: 'images/rostovOnDon_patriotic.png',
  CITY: 
    ['Rostov-on-Don', 'Patriotic'],
  APSRTMENT_AREA: '93 m2',
  REPAIR_TIME: '3 months',
  REPAIR_COST: 'Upon request'
}];

const navLink = document.querySelectorAll ('.nav-top_link'); // NodeList
const btnRostovAdmiral = document.getElementById ('btn-rostovAdmiral');
const btnsochiThieves = document.getElementById ('btn-sochiThieves');
const btnRostovPatrioticl = document.getElementById ('btn-rostovPatriotic');

const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
const pointList = document.querySelectorAll('.point'); // NodeList

const urlPoint = 'images/point.svg';
const urlPointFill = 'images/point_fill.svg';

// ДОБАВЛЕНИЕ/УДАЛЕНИЕ КЛАССА
navLink.forEach (btn => {
  btn.addEventListener ('click', (e) => {
    navLink.forEach (btn => {
      btn.classList.remove ('link_active');
    });
    e.target.classList.add ('link_active');
  
    startSlider ();
    clearInterval (slidesAuto);
  });
});

// ПРОВЕРКА ТЕКУЩЕЙ СТРАНИЦЫ
function startSlider () {
  for (i = 0; i < navLink.length; i ++ ) {
    if (navLink[i].classList.contains ('link_active')) {
      addInfo (i);
    };
  };
};

// УСТАНОВКА ЗНАЧЕНИЙ
function addInfo (x) {
  const image = document.getElementById ('image');
  const cityList = document.querySelectorAll ('.info-block_city__text'); // NodeList
  const apartmentArea = document.getElementById ('apartment-area');
  const repairTime = document.getElementById ('repair-time');
  const repairCost = document.getElementById ('repair-cost');

  for (i = 0; i < cityList.length; i ++ ) {
    cityList[i].textContent = nameList[x].CITY[i];
  };
  apartmentArea.textContent = nameList[x].APSRTMENT_AREA;
  repairTime.textContent = nameList[x].REPAIR_TIME;
  repairCost.textContent = nameList[x].REPAIR_COST;

  // УСТАНОВКА ИЗОБРАЖЕНИЯ
  image.src = nameList[x].url_image;

  // ЗАЛИВКА ТОЧЕК ВНИЗУ
  for (i = 0; i < pointList.length; i ++ ) {
    const point = pointList[i].querySelector('img');
    const pointFill = pointList[x].querySelector('img');
    if (pointList[i].classList.contains('point_active')) {
      pointList[i].classList.remove('point_active');
    };
    point.src = urlPoint;
    pointList[x].classList.add('point_active');
    pointFill.src = urlPointFill;
  };
};

// ЗАЦИКЛИВАНИЕ СЛАДЕРА
let index = 0;
const pageCount = navLink.length;

function navigationArrow (operand) {
  for (i = 0; i < navLink.length; i ++ ) {
    if (navLink[i].classList.contains ('link_active')) {
      navLink[i].classList.remove ('link_active');
      index = i;
    };
  };
  if (operand === '+') {
    navLink[(index + 1) % pageCount].classList.add('link_active');
  } else {
    navLink[(index - 1 + pageCount) % pageCount].classList.add('link_active');
  };
  startSlider ();
}

// ОБРАБОТЧИКИ СТРЕЛОК
arrowRight.addEventListener('click', () => {
  navigationArrow ('+');
  clearInterval (slidesAuto);
});

arrowLeft.addEventListener('click', () => {
  navigationArrow ('-');
  clearInterval (slidesAuto);
});

// ОБРАБОТЧИК КЛИКА ТОЧЕК В НИЖНЕЙ НАВИГАЗИИ 
pointList.forEach ((point, index) => {
  point.addEventListener ('click', () => {
    addInfo (index);
    navLink.forEach (btn => {
      btn.classList.remove ('link_active');
    });
    navLink[index].classList.add ('link_active');
    clearInterval (slidesAuto);
  });
});

// АВТОЗАМЕНА СЛАЙДОВ
const slidesAuto = setInterval (() => {
  navigationArrow ('+');
}, 3000);

startSlider ();