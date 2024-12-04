// Función para cargar contenido dinámicamente
async function loadSection(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
    } catch (error) {
        console.error(`Error cargando ${elementId}:`, error);
        document.getElementById(elementId).innerHTML = `<p>Error al cargar ${elementId}.</p>`;
    }
}

// Función para inicializar Chart.js
function initInvestmentChart() {
    const chartElement = document.getElementById('investmentChart');
    if (!chartElement) return;

    const ctx = chartElement.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Criptomonedas',
                    data: [120, 150, 170, 160, 180, 200, 220, 210, 230, 250, 240, 260],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    fill: true,
                },
                {
                    label: 'Bolsa',
                    data: [100, 130, 150, 140, 160, 180, 200, 190, 210, 230, 220, 240],
                    borderColor: '#2980b9',
                    backgroundColor: 'rgba(41, 128, 185, 0.2)',
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Tendencias de Inversiones 2024'
                }
            }
        },
    });
}

// Función para manejar el menú móvil
function handleMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (!mobileMenuButton || !navbarMenu) return;

    // Evento de clic en el botón del menú móvil
    mobileMenuButton.addEventListener('click', () => {
        const isActive = mobileMenuButton.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        mobileMenuButton.setAttribute('aria-expanded', isActive);

        if (isActive) {
            // Bloquear el desplazamiento del cuerpo cuando el menú está abierto
            document.body.style.overflow = 'hidden';
            // Enfocar el primer enlace del menú
            const firstLink = navbarMenu.querySelector('.navbar-link');
            if (firstLink) firstLink.focus();
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    const navbarLinks = document.querySelectorAll('.navbar-link');

    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
}

// Función para manejar el Mini Quiz
function handleMiniQuiz() {
    const startQuizButton = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');

    if (!startQuizButton || !quizContainer || !quizForm || !quizResult || !resultText) return;

    // Evento de clic para iniciar el quiz
    startQuizButton.addEventListener('click', () => {
        const isHidden = quizContainer.classList.toggle('hidden');
        const isExpanded = !isHidden;
        startQuizButton.setAttribute('aria-expanded', isExpanded);

        if (isExpanded) {
            // Enfocar el primer elemento del quiz
            quizContainer.querySelector('input, button').focus();
        }
    });

    // Evento de envío del formulario del quiz
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const q1 = document.querySelector('input[name="q1"]:checked')?.value;
        const q2 = document.querySelector('input[name="q2"]:checked')?.value;

        if (!q1 || !q2) {
            alert('Por favor, responde todas las preguntas antes de enviar.');
            return;
        }

        let result = '';

        if (q1 === 'corto' && q2 === 'alta') {
            result = 'Eres un inversionista agresivo de corto plazo.';
        } else if (q1 === 'medio' && q2 === 'media') {
            result = 'Eres un inversionista balanceado de medio plazo.';
        } else if (q1 === 'largo' && q2 === 'baja') {
            result = 'Eres un inversionista conservador de largo plazo.';
        } else {
            result = 'Eres un inversionista versátil con un enfoque personalizado.';
        }

        resultText.textContent = result;
        quizResult.classList.remove('hidden');
        quizResult.focus(); // Enfocar el resultado para accesibilidad
    });
}

// Función para inicializar todas las funcionalidades
function init() {
    // Cargar Header y Footer
    loadSection('sections/header.html', 'header');
    loadSection('sections/footer.html', 'footer');

    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 120,
            delay: 100,
        });
    } else {
        console.warn('AOS no está disponible');
    }

    // Inicializar Gráfico de Inversiones
    initInvestmentChart();

    // Manejo del Menú Móvil
    handleMobileMenu();

    // Manejo del Mini Quiz
    handleMiniQuiz();
}

// Llamar a la función de inicialización
document.addEventListener('DOMContentLoaded', init);
