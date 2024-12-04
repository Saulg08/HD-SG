// universidad.js

// Función para manejar las pestañas
function openTab(evt, tabName) {
    // Ocultar todas las pestañas
    const tabcontents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove("active");
    }

    // Remover la clase "active" de todos los botones de pestaña
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostrar la pestaña actual y añadir la clase "active" al botón que abrió la pestaña
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Función para mostrar contenido de problema específico
function mostrarProblema(problemaId) {
    // Ocultar todos los contenidos de problemas
    const problemas = document.getElementsByClassName("problema-content");
    for (let i = 0; i < problemas.length; i++) {
        problemas[i].classList.add("hidden");
    }

    // Mostrar el problema seleccionado
    document.getElementById(problemaId).classList.remove("hidden");
}

// Funciones para las funcionalidades integradas

// 1. Cálculo de Precio de Computadoras
function calcularPrecio() {
    const modelo = document.getElementById("modelo_p1").value;
    let precio = parseFloat(document.getElementById("precio_p1").value);

    if (modelo === "desktop") {
        precio -= precio * 0.10; // Descuento del 10%
    }

    if (isNaN(precio) || precio < 0) {
        alert("Por favor, ingresa un precio válido.");
        document.getElementById("precio-resultado_p1").textContent = "Error en el cálculo.";
        return;
    }

    document.getElementById("precio-resultado_p1").textContent =
        `El precio final para la ${modelo} es: $${precio.toFixed(2)}`;
}

// 2. Promedio de Calificaciones
function calcularPromedios() {
    const estudiantes = [];
    for (let i = 0; i < 5; i++) {
        const nombre = prompt(`Ingrese el nombre del estudiante ${i + 1}:`);
        if (!nombre) {
            alert("El nombre no puede estar vacío.");
            i--;
            continue;
        }
        const notas = [];
        for (let j = 0; j < 3; j++) {
            let nota;
            do {
                nota = parseFloat(prompt(`Ingrese la nota ${j + 1} de ${nombre}:`));
                if (isNaN(nota) || nota < 0 || nota > 100) {
                    alert("Por favor, ingrese una nota válida entre 0 y 100.");
                }
            } while (isNaN(nota) || nota < 0 || nota > 100);
            notas.push(nota);
        }
        const promedio = notas.reduce((acc, cur) => acc + cur, 0) / 3;
        let letra = '';
        if (promedio >= 91) letra = 'A';
        else if (promedio >= 81) letra = 'B';
        else if (promedio >= 71) letra = 'C';
        else if (promedio >= 61) letra = 'D';
        else letra = 'F';
        const estado = promedio >= 61 ? 'Aprobó' : 'Reprobó';
        estudiantes.push({ nombre, promedio: promedio.toFixed(2), letra, estado });
    }

    let salida = '';
    estudiantes.forEach(e => {
        salida += `<p>${e.nombre} tiene un promedio de ${e.promedio} (${e.letra}) y ${e.estado}.</p>`;
    });

    document.getElementById("promedios-resultado_p1").innerHTML = salida;
}

// 3. Cálculo de Comisión y Salario
function calcularSalario() {
    const salarioBase = parseFloat(document.getElementById("salarioBase_p2").value);
    const ventas = parseFloat(document.getElementById("ventas_p2").value);
    let comision = 0;

    if (ventas >= 1500 && ventas <= 4000) {
        comision = ventas * 0.05;
    } else if (ventas > 4000) {
        comision = ventas * 0.07;
    }

    const salarioNeto = salarioBase + comision;
    const tieneComision = comision > 0 ? "tiene" : "no tiene";

    document.getElementById("salario-resultado_p2").textContent =
        `El empleado ${tieneComision} comisión, la comisión es de $${comision.toFixed(2)}, y su salario neto es de $${salarioNeto.toFixed(2)}`;
}

// 4. Suma de Números Pares
function sumarPares() {
    let suma = 0;
    let i = 0;

    while (i <= 31) {
        if (i % 2 === 0) suma += i;
        i++;
    }

    document.getElementById("suma-pares-resultado_p2").textContent =
        `La suma de los números pares es: ${suma}`;
}

// 5. Conversión de Nota Numérica a Letra
function convertirNota() {
    const nota = parseInt(document.getElementById("nota_p3").value);
    let letra = '';

    if (nota >= 91 && nota <= 100) {
        letra = 'A';
    } else if (nota >= 81 && nota <= 90) {
        letra = 'B';
    } else if (nota >= 71 && nota <= 80) {
        letra = 'C';
    } else if (nota >= 61 && nota <= 70) {
        letra = 'D';
    } else if (nota < 61) {
        letra = 'F';
    } else {
        letra = 'Nota inválida';
    }

    document.getElementById("nota-resultado_p3").textContent =
        `La nota en letra es: ${letra}`;
}

// 6. Suma de Números Impares
function sumarImpares() {
    let suma = 0;
    let i = 0;

    do {
        if (i % 2 !== 0) suma += i;
        i++;
    } while (i <= 31);

    document.getElementById("suma-impares-resultado_p3").textContent =
        `La suma de los números impares es: ${suma}`;
}

// 7. Operaciones Matemáticas
function realizarOperacion() {
    const num1 = parseFloat(prompt("Ingrese el primer número:"));
    const num2 = parseFloat(prompt("Ingrese el segundo número:"));
    const operacion = prompt("Seleccione la operación (suma, resta, multiplicación):").toLowerCase();

    let resultado;

    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, ingrese números válidos.");
        return;
    }

    switch (operacion) {
        case 'suma':
            resultado = num1 + num2;
            break;
        case 'resta':
            resultado = num1 - num2;
            break;
        case 'multiplicación':
            resultado = num1 * num2;
            break;
        default:
            resultado = 'Operación no válida';
    }

    document.getElementById("operacion-resultado_p4").textContent =
        `El resultado es: ${resultado}`;
}

// 8. Suma Dinámica
function sumarNumeros() {
    let suma = 0;
    let contador = 0;

    while (suma < 50) {
        let numero = parseFloat(prompt("Ingrese un número positivo:"));
        if (isNaN(numero)) {
            alert("Entrada inválida. Por favor, ingrese un número.");
            continue;
        }
        if (numero > 0) {
            suma += numero;
            contador++;
        } else {
            alert("Por favor ingrese un número positivo.");
        }
    }

    document.getElementById("suma-dinamica-resultado_p5").textContent =
        `La suma total es: ${suma}. Se ingresaron ${contador} números.`;
}

// 9. Cálculo de Operaciones Básicas (Calculadora Básica)
function calcularSuma() {
    const num1 = parseFloat(document.getElementById("calc_num1").value);
    const num2 = parseFloat(document.getElementById("calc_num2").value);
    const resul = num1 + num2;
    document.getElementById("calc_resul").value = resul;
}

function calcularResta() {
    const num1 = parseFloat(document.getElementById("calc_num1").value);
    const num2 = parseFloat(document.getElementById("calc_num2").value);
    const resul = num1 - num2;
    document.getElementById("calc_resul").value = resul;
}

function calcularMultiplicacion() {
    const num1 = parseFloat(document.getElementById("calc_num1").value);
    const num2 = parseFloat(document.getElementById("calc_num2").value);
    const resul = num1 * num2;
    document.getElementById("calc_resul").value = resul;
}

function calcularDivision() {
    const num1 = parseFloat(document.getElementById("calc_num1").value);
    const num2 = parseFloat(document.getElementById("calc_num2").value);
    if (num2 === 0) {
        alert("No se puede dividir entre cero.");
        return;
    }
    const resul = num1 / num2;
    document.getElementById("calc_resul").value = resul;
}

// 10. Cálculo de Total de Compra en Farmacia
function calcularTotalFarmacia() {
    const cantidad = parseInt(document.getElementById("farm_cantidad").value);
    const precio = parseFloat(document.getElementById("farm_precio").value);
    const impuesto = parseFloat(document.getElementById("farm_impuesto").value);

    if (isNaN(cantidad) || isNaN(precio) || isNaN(impuesto)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    const subtotal = cantidad * precio;
    const totalImpuesto = subtotal * (impuesto / 100);
    const total = subtotal + totalImpuesto;

    document.getElementById("farm_subtotal").value = subtotal.toFixed(2);
    document.getElementById("farm_totalImpuesto").value = totalImpuesto.toFixed(2);
    document.getElementById("farm_total").value = total.toFixed(2);
}

// Funciones para la Pestaña "Ejemplo JavaScript"

// 1. Función para Sumar Dos Números (Ejemplo JavaScript)
function ej_fsuma() {
    const num1 = parseFloat(document.ejemplo_f1.num1.value);
    const num2 = parseFloat(document.ejemplo_f1.num2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, ingresa números válidos.");
        document.getElementById("ej_resul").value = "Error";
        return;
    }

    const res = num1 + num2;
    document.getElementById("ej_resul").value = res;
}

// 2. Función para Mostrar la Capital Basada en la Provincia Seleccionada (Ejemplo JavaScript)
function ej_mostrarCapital() {
    const provincia = document.ejemplo_pagina.caja.value;
    const texto = document.getElementById("ej_texto");

    const capitales = {
        "Chiriquí": "David",
        "Colón": "Colón",
        "Panamá": "Ciudad de Panamá",
        "Los Santos": "Las Tablas",
        "Coclé": "Penonomé"
    };

    if (capitales[provincia]) {
        texto.value = capitales[provincia];
    } else {
        texto.value = "";
    }
}

// 3. Función para Mostrar el Precio del Modelo de Auto Seleccionado (Ejemplo JavaScript)
function ej_mostrarPrecio() {
    const grupo = document.getElementsByName('grupo');
    let seleccionado = "";

    for (let i = 0; i < grupo.length; i++) {
        if (grupo[i].checked) {
            seleccionado = grupo[i].value;
            break;
        }
    }

    if (seleccionado === "") {
        alert("Por favor, selecciona un modelo de auto.");
        return;
    }

    let precio = "";

    switch (seleccionado) {
        case "MITSUBISHI":
            precio = "El precio es $10,500";
            break;
        case "TOYOTA":
            precio = "El precio es $9,995";
            break;
        case "HYUNDAI":
            precio = "El precio es $8,500";
            break;
        default:
            precio = "Modelo no reconocido.";
    }

    alert(precio);
}

// 4. Función para Cargar una Imagen al Hacer Clic en el Botón (Ejemplo JavaScript)
function ej_cargarImagen() {
    const container = document.getElementById('ej_imagenContainer');
    const img = document.createElement('img');
    img.src = 'images/p1.png';
    img.alt = 'Imagen Cargada';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    img.style.marginTop = '10px';
    container.innerHTML = ""; 
    container.appendChild(img);
}

// Inicializar AOS
window.addEventListener('load', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
    });
});

// Cargar Header y Footer después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Cargar Header
    fetch('sections/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Cargar Footer
    fetch('sections/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el footer:', error));
});
