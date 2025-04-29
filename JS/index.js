const boton = document.querySelector('.botonNav'); // Correcto: querySelector para UN elemento
const menu = document.querySelector('.menu');      // Correcto: querySelector para UN elemento

boton.addEventListener('click', () => {
    menu.classList.toggle('active'); // Activamos/desactivamos la clase
});

const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})