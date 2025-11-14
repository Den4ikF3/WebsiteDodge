// script.js

// === 1. ОНОВЛЕНІ ДАНІ ===
const slidesData = [
{
  id: 1,
  name: "Viper",
  slug: "viper-active", // <--- НОВЕ: Унікальний клас для CSS
  desc: "The legendary American supercar, built for raw power and pure performance.",
  color: "#DA291C", // Red
  imgUrl: "images/viper.jpg",
  topSpeed: "331 km/h",
  kph: "3.2 s",
  hp: "645 HP",
  torque: "813 Nm"
},
{
  id: 2,
  name: "Charger",
  slug: "charger-active", // <--- НОВЕ
  desc: "The only four-door muscle car. A fusion of family-friendly comfort and track-ready power.",
  color: "#00539B", // Blue
  imgUrl: "images/charger.jpg",
  topSpeed: "326 km/h",
  kph: "3.6 s",
  hp: "797 HP",
  torque: "959 Nm"
},
{
  id: 3,
  name: "Challenger",
  slug: "challenger-active", // <--- НОВЕ
  desc: "Retro style meets modern muscle. An icon of the American road with unmatched presence.",
  color: "#FF7F00", // Orange
  imgUrl: "images/challenger.jpg",
  topSpeed: "326 km/h",
  kph: "3.7 s",
  hp: "797 HP",
  torque: "959 Nm"
},
{
  id: 4,
  name: "Durango",
  slug: "durango-active", // <--- НОВЕ
  desc: "The three-row SUV with the heart of a muscle car. Power to tow, space to live.",
  color: "#556B2F", // Green
  imgUrl: "images/durango.jpg",
  topSpeed: "290 km/h",
  kph: "3.5 s",
  hp: "710 HP",
  torque: "875 Nm"
},
{
  id: 5,
  name: "RAM",
  slug: "ram-active", // <--- НОВЕ
  desc: "The apex predator of pickup trucks. The Ram 1500 TRX is built to dominate any terrain.",
  color: "#F0E68C", // Yellow
  imgUrl: "images/ram.jpg",
  topSpeed: "190 km/h",
  kph: "4.5 s",
  hp: "702 HP",
  torque: "881 Nm"
}];
// Зберігаємо всі класи в одному місці
const allSlideSlugs = slidesData.map(slide => slide.slug);


// === 2. ЗНАХОДИМО ЕЛЕМЕНТИ ===
const modelNameEl = document.querySelector("#slide-model-name");
const descEl = document.querySelector("#slide-desc");
const speedEl = document.querySelector("#stat-speed");
const kphEl = document.querySelector("#stat-kph");
const hpEl = document.querySelector("#stat-hp");
const torqueEl = document.querySelector("#stat-torque");

const navListEl = document.querySelector("#slider-nav-list");
const imageContainerEl = document.querySelector(".slide-image-container");


const navButtons = [];
const slideImages = [];

let currentSlideIndex = 0; 
let isWheeling = false; 

// === 3. ФУНКЦІЯ ІНІЦІАЛІЗАЦІЇ ===
function initializeSlider() {
    slidesData.forEach((slide, index) => {
        // ... (код створення картинок залишається без змін) ...
        const img = document.createElement("img");
        img.src = slide.imgUrl;
        img.className = "slide-image";
        img.dataset.index = index;
        imageContainerEl.appendChild(img);
        slideImages.push(img);

        // ... (код створення кнопок навігації залишається без змін) ...
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.className = "slider-nav-link";
        button.dataset.index = index;
        button.textContent = slide.name;
        button.style.color = slide.color;
        li.appendChild(button);
        navListEl.appendChild(li);
        navButtons.push(button);
    });

    navButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const newIndex = parseInt(event.target.dataset.index);
            goToSlide(newIndex);
        });
    });

    goToSlide(0); // Запускаємо перший слайд
}


// === 4. ГОЛОВНА ФУНКЦІЯ (Оновлено для Завдання 2) ===
function goToSlide(slideIndex) {
    // Захист від виходу за межі
    if (slideIndex < 0) slideIndex = slidesData.length - 1;
    if (slideIndex >= slidesData.length) slideIndex = 0;
    
    const slideData = slidesData[slideIndex];

    // 1. Оновлюємо текстовий контент
    modelNameEl.textContent = slideData.name;
    descEl.textContent = slideData.desc;
    speedEl.textContent = slideData.topSpeed;
    kphEl.textContent = slideData.kph;
    hpEl.textContent = slideData.hp;
    torqueEl.textContent = slideData.torque;

    // 2. Оновлюємо активні зображення
    slideImages.forEach(img => img.classList.remove('is-active'));
    slideImages[slideIndex].classList.add('is-active');

    // 3. Оновлюємо активні кнопки навігації
    navButtons.forEach(btn => btn.classList.remove('is-active'));
    navButtons[slideIndex].classList.add('is-active');

    // 4. Оновлюємо колір акценту
    modelNameEl.style.color = slideData.color;
    
    // 5. (НОВЕ!) Оновлюємо клас на <body>
    document.body.classList.remove(...allSlideSlugs); // Видаляємо всі старі класи
    document.body.classList.add(slideData.slug); // Додаємо 1 новий
    
    currentSlideIndex = slideIndex;
}

// === 5. СЛУХАЧІ ПОДІЙ (Прокрутка колесом миші) ===
document.body.addEventListener('wheel', (event) => {
    if (isWheeling) return;
    isWheeling = true;
    
    if (event.deltaY > 0) {
        goToSlide(currentSlideIndex + 1);
    } else {
        goToSlide(currentSlideIndex - 1);
    }
    
    setTimeout(() => {
        isWheeling = false;
    }, 1000); // 1 секунда
});

// === 6. ЗАПУСК ===
initializeSlider();