
document.addEventListener('DOMContentLoaded', () => {
    fetch('sections/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el header:', error));

    fetch('sections/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el footer:', error));
});

window.addEventListener('load', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
    });
});
