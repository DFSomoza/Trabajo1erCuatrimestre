const esEmailValido = (email) => {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return emailRegex.test(email)
}

const validarNombre = () => {
    const nombreConsulta = document.getElementById('nombre');
    if (nombreConsulta.value.trim() == "") {
        // error de required
        document.getElementById('error-nombre').innerHTML = "El nombre es requerido";
        nombreConsulta.classList.add('is-invalid');
    } else if (nombreConsulta.value.trim().length < 5) {
        // error de minLength
        document.getElementById('error-nombre').innerHTML = "El nombre debe tener al menos 5 caracteres";
        nombreConsulta.classList.add('is-invalid');
    } else {
        document.getElementById('error-nombre').innerHTML = "";
        nombreConsulta.classList.remove('is-invalid');
    }
}

const validarEmail = () => {
    const direccionDeEmail = document.getElementById('email').value;
    if (direccionDeEmail.trim() == "") {
        // error de required
        document.getElementById('error-email').innerHTML = "El email es requerido";
        formularioCorrecto = false;
    } else if (!esEmailValido(direccionDeEmail)) {
        // error de estructura de mail
        document.getElementById('error-email').innerHTML = "Direccion de email incorrecta";
        formularioCorrecto = false;
    } else {
        document.getElementById('error-email').innerHTML = "";
    }
}

const validarTextoArea = () => {
    const areaTexto = document.getElementById('areaTexto');
    console.log(areaTexto);
    if (areaTexto.value == "") {
        // error de required
        document.getElementById('error-texto').innerHTML = "Ingrese el mensaje";
        areaTexto.classList.add('is-invalid');
    } else {
        document.getElementById('error-nombre').innerHTML = "";
        areaTexto.classList.remove('is-invalid');
    }
}


const limpiarFormulario = () => {
    let formulario = document.getElementById('formul');
    formulario.reset();
    
}

const enviarFormulario = () => {
    let formularioCorrecto = true;
    const nombreConsulta = document.getElementById('nombre');
    const direccionDeEmail = document.getElementById('email');
    const areaTexto = document.getElementById('areaTexto');

    if (nombreConsulta.value.trim() == "") {
        // error de required
        document.getElementById('error-nombre').innerHTML = "El nombre es requerido";
        formularioCorrecto = false;
    } else if (nombreConsulta.value.trim().length < 5) {
        // error de minLength
        document.getElementById('error-nombre').innerHTML = "El nombre debe tener al menos 5 caracteres";
        formularioCorrecto = false;
    } else {
        document.getElementById('error-nombre').innerHTML = "";
        formularioCorrecto = true;
    }
    if (direccionDeEmail.value.trim() == "") {
        // error de required
        document.getElementById('error-email').innerHTML = "El email es requerido";
        formularioCorrecto = false;
    } else if (!esEmailValido(direccionDeEmail.value)) {
        // error de estructura de mail
        document.getElementById('error-email').innerHTML = "Direccion de email incorrecta";
        formularioCorrecto = false;
    } else {
        document.getElementById('error-email').innerHTML = "";
        formularioCorrecto = true;
    }
    if (areaTexto.value == "") {
        // error de required
        document.getElementById('error-texto').innerHTML = "Ingrese el mensaje";
        formularioCorrecto = false;
    } else {
        document.getElementById('error-texto').innerHTML = "";
        formularioCorrecto = true;
    }

    if (formularioCorrecto) {
        console.log("Nombre:", nombreConsulta.value);
        console.log("Email:", direccionDeEmail.value);
        console.log("Mensaje:", areaTexto.value);
    } else {
        console.log("Formulario incorrecto");
    }
    limpiarFormulario();
}


var modal = document.getElementById('detalleModal1');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById('detalleModal2');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById('detalleModal3');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


const inicializarJs = () => {
    const boton = document.getElementById("enviar-btn");
    boton.addEventListener('click', function (e) {
        enviarFormulario();
    });

    document.getElementById('nombre').addEventListener('blur', function (e) {
        validarNombre();
    })

    document.getElementById('email').addEventListener('blur', function (e) {
        validarEmail();
    })
    document.getElementById('areaTexto').addEventListener('blur', function (e) {
        validarTextoArea();
    })

}

window.addEventListener('load', inicializarJs);
