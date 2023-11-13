class Persona {
    constructor(nombre, peso, altura) {
        this.nombre = nombre;
        this.peso = peso;
        this.altura = altura;
    }

    calcularIMC() {
        return this.peso / (this.altura * this.altura);
    }
}

let personas = [];

function validarNumero(entrada, mensaje, promptMensaje) {
    let numero = parseFloat(entrada);

    do {
        if (isNaN(numero)) {
            alert(mensaje);
            entrada = prompt(promptMensaje);
            numero = parseFloat(entrada);
        }
    } while (isNaN(numero));

    return numero;
}

function validarAltura(alturaEntrada) {
    while (isNaN(alturaEntrada) || alturaEntrada.indexOf('.') === -1) {
        alert("La altura debe ser un número con un punto decimal. Por favor, inténtelo de nuevo.");
        alturaEntrada = prompt("Ingrese la altura en metros (por ejemplo, 1.75):");
    }

    return parseFloat(alturaEntrada);
}

function validarNombre(nombre) {
    return /^[a-zA-Z]+$/.test(nombre);
}

function agregarPersona() {
    do {
        let nombre = prompt("Ingrese el nombre:");

        while (!validarNombre(nombre)) {
            alert("El nombre debe contener solo letras. Por favor, inténtelo de nuevo.");
            nombre = prompt("Ingrese el nombre:");
        }

        let pesoEntrada = prompt("Ingrese el peso en kilogramos (por ejemplo, 68.5):");
        let peso = validarNumero(pesoEntrada, "El peso debe ser un número. Por favor, inténtelo de nuevo.", "Ingrese el peso en kilogramos (por ejemplo, 68.5):");

        while (isNaN(peso)) {
            pesoEntrada = prompt("Por favor, ingrese el peso en kilogramos como un número válido:");
            peso = validarNumero(pesoEntrada, "El peso debe ser un número. Por favor, inténtelo de nuevo.", "Ingrese el peso en kilogramos (por ejemplo, 68.5):");
        }

        let alturaEntrada = prompt("Ingrese la altura en metros (por ejemplo, 1.75):");
        let altura = validarAltura(alturaEntrada);

        let nuevaPersona = new Persona(nombre, peso, altura);
        personas.push(nuevaPersona);

        alert(`Nombre: ${nuevaPersona.nombre}\nAltura: ${nuevaPersona.altura} metros\nPeso: ${nuevaPersona.peso} kilogramos\nIMC: ${nuevaPersona.calcularIMC().toFixed(2)}`);

        var respuesta;
        do {
            respuesta = prompt("¿Deseas agregar otra persona? (si/no)").toLowerCase();
            if (respuesta !== "si" && respuesta !== "no" && respuesta !== "sí") {
                alert("Solo está permitido ingresar 'si' o 'no'. Por favor, inténtelo de nuevo.");
            }
        } while (respuesta !== "si" && respuesta !== "no" && respuesta !== "sí");
        

    } while (respuesta === "si" && personas.length < 3);

    
    let deseaCalcularCalorias;
    do {
        deseaCalcularCalorias = prompt("¿Deseas saber cuántas calorías deberías comer por día? (si/no)").toLowerCase();
        if (deseaCalcularCalorias !== "si" && deseaCalcularCalorias !== "no") {
            alert("Solo está permitido ingresar 'si' o 'no'. Por favor, inténtelo de nuevo.");
        }
    } while (deseaCalcularCalorias !== "si" && deseaCalcularCalorias !== "no");
    
    if (deseaCalcularCalorias === "si") {
        calcularCalorias();
    }
}

function mostrarBienvenida() {
    alert("¡Bienvenido al Calculador de Índice de Masa Corporal!");
}

function solicitarDatosAdicionales() {
    alert("Ahora te vamos a pedir unos datos para poder calcular el Índice de Masa Corporal.");
}

function obtenerEdadValida() {
    let edad;
    do {
        edad = prompt("Ingrese su edad:");
        if (!/^\d+$/.test(edad)) {
            alert("Solo está permitido ingresar números. Por favor, inténtelo de nuevo.");
        }
    } while (!/^\d+$/.test(edad));
    return parseInt(edad);
}

function obtenerGeneroValido() {
    let genero;
    do {
        genero = prompt("Ingrese su género (hombre/mujer):").toLowerCase();
        if (genero !== "hombre" && genero !== "mujer") {
            alert("Solo puedes ingresar 'hombre' o 'mujer'. Por favor, inténtelo de nuevo.");
        }
    } while (genero !== "hombre" && genero !== "mujer"); 
    return genero;
}

function calcularCalorias() {
    do {
        let edad = obtenerEdadValida();
        let genero = obtenerGeneroValido();

        let formulaCalorias;

        if (edad >= 11 && edad <= 18) {
            formulaCalorias = (genero === "mujer") ? (13.384 * personas[0].peso) : (genero === "hombre") ? (17.686 * personas[0].peso) + 658.2 : null;
        } else if (edad >= 19 && edad <= 30) {
            formulaCalorias = (genero === "mujer") ? (14.818 * personas[0].peso) : (genero === "hombre") ? (15.057 * personas[0].peso) + 692.2 : null;
        } else if (edad >= 31 && edad <= 60) {
            formulaCalorias = (genero === "mujer") ? (8.126 * personas[0].peso) : (genero === "hombre") ? (11.472 * personas[0].peso) + 873.1 : null;
        } else if (edad >= 60) {
            formulaCalorias = (genero === "mujer") ? (9.082 * personas[0].peso) : (genero === "hombre") ? (11.711 * personas[0].peso) + 587.7 : null;
        } else {
            alert("La edad ingresada no es válida para este cálculo.");
            return;
        }

        if (formulaCalorias !== null) {
            alert(`De acuerdo a su edad y género, debería consumir aproximadamente ${formulaCalorias.toFixed(2)} calorías por día.`);
        }

        var deseaCalcularCalorias;
        do {
            deseaCalcularCalorias = prompt("¿Deseas saber cuántas calorías deberías comer por día? (si/no)").toLowerCase();
            if (deseaCalcularCalorias !== "si" && deseaCalcularCalorias !== "no") {
                alert("Solo está permitido ingresar 'si' o 'no'. Por favor, inténtelo de nuevo.");
            }
        } while (deseaCalcularCalorias !== "si" && deseaCalcularCalorias !== "no");

    } while (deseaCalcularCalorias === "si");
}

mostrarBienvenida();
solicitarDatosAdicionales();
agregarPersona();

