let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentSlide += direction;

    // Aseguramos que el índice no se salga de los límites
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    // Calculamos el desplazamiento en porcentaje
    const newTransformValue = -currentSlide * 100;

    // Aplicamos la transformación al contenedor de las diapositivas
    document.querySelector('.slides').style.transform = `translateX(${newTransformValue}%)`;
}

// Configuración para cambiar las diapositivas automáticamente cada 3 segundos
const autoSlideInterval = setInterval(() => {
    moveSlide(1); // Mueve al siguiente slide automáticamente
}, 3000); // 3000 ms = 3 segundos

// Botones de control
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
