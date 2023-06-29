const esEmailValido = (email) => {
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  return emailRegex.test(email)
}

const validarNombre = () => {
  const nombreInput = document.getElementById('nombre');
  if (nombreInput.value.trim() == "") {
    // error de required
    document.getElementById('error-nombre').innerHTML = "El nombre es requerido";
    nombreInput.classList.add('is-invalid');
  } else if (nombreInput.value.trim().length < 5) {
    // error de minLength
    document.getElementById('error-nombre').innerHTML = "El nombre debe tener al menos 5 caracteres";
    nombreInput.classList.add('is-invalid');
  } else {
    document.getElementById('error-nombre').innerHTML = "";
    nombreInput.classList.remove('is-invalid');
  }
}


const nuevoMedico = () => {
  let formularioCorrecto = true;
  let nuevoCodigo = 0;
  // Nuevo arreglo vacío
  let aMedicos = [];
  // Convierto un json a un array
  // Realizo un push de cada iteración al nuevo arreglo con atributo codigo
  if (data.length > 0) {
    data.forEach((item) => {
      aMedicos.push(item.codigo);
    });
    console.log(aMedicos);
    // Obtengo el máximo del array para luego sumarle 1
    nuevoCodigo = Math.max(...aMedicos) + 1;
  } else {
    nuevoCodigo += 1;
  }
  console.log(nuevoCodigo);
  const nombreMedico = document.getElementById('nombre').value;
  const nombreEspecialidad = document.getElementById('especialidad').value;
  const diasDeAtencion = document.getElementById('atencion').value;
  const direccionDeEmail = document.getElementById('email').value;

  if (nombreMedico.trim() == "") {
    //error de required
    document.getElementById('error-nombre').innerHTML = "El nombre es requerido";
    formularioCorrecto = false;
  } else if (nombreMedico.trim().length < 5) {
    // error de minLength
    document.getElementById('error-nombre').innerHTML = "El nombre debe tener al menos 5 caracteres";
    formularioCorrecto = false;
  } else {
    document.getElementById('error-nombre').innerHTML = "";
  }

  if (nombreEspecialidad.trim() == "") {
    //error de required
    document.getElementById('error-especialidad').innerHTML = "La especialidad es requerida";
    formularioCorrecto = false;
  } else {
    document.getElementById('error-especialidad').innerHTML = "";
  }

  if (diasDeAtencion.trim() == "") {
    //error de required
    document.getElementById('error-atencion').innerHTML = "Ingrese días y horario de atención";
    formularioCorrecto = false;
  } else {
    document.getElementById('error-atencion').innerHTML = "";
  }

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

  if (formularioCorrecto) {

    const nuevoMedico = {
      codigo: nuevoCodigo,
      nombre: nombreMedico,
      especialidad: nombreEspecialidad,
      descripcion: diasDeAtencion,
      contacto: direccionDeEmail
    };
    data.push(nuevoMedico);
    console.log(data);
    dibujarTabla();
  } else {
    console.log("Formulario incorrecto");
  }
}
//*********** Funcion Eliminar Medico **********************//
const eliminaMedico = (identificador) => {
  //if (data.length > 0) {
    data.splice(identificador, 1);
    console.log(data);
    dibujarTabla();
  //}
}


const dibujarTabla = () => {
  //if (document.getElementById("idtabla")) {
  // la tabla tiene un encabezado fijo
  cad = `
    <table class="table">
        <thead class="table-light">
            <h2>Médicos - Especialistas</h2>
            <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Atención</th>
                <th scope="col">Contacto</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
    `
  // y ademas tiene un contenido que varia segun data
  for (var i = 0; i < data.length; i++) {
    cad += `     
        <tr>
            <th scope="row">${data[i].codigo}</th>
            <td>${data[i].nombre}</td>
            <td>${data[i].especialidad}</td>
            <td>${data[i].descripcion}</td>
            <td>${data[i].contacto}</td>
            <td><button onclick="eliminaMedico(${i})" type="button" class="btn btn-outline-success">Eliminar</button></td>
        </tr>
        `
  }
  // le agrego el cierre de la etiqueta table 
  cad += `
            </tbody>
        </table>
    `
  console.log(cad); // veo por consola si arme bien table
  // modifico el contenido de la etiqueta HTML que tiene
  // id="idtabla", con el contenido de la variable cad
  document.getElementById("idtabla").innerHTML = cad;
  //}
}

const inicializarJs = () => {
  dibujarTabla();
}

window.addEventListener('load', inicializarJs);
