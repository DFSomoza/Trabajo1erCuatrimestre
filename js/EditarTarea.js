// variable para identificar si es nuevo Medico y Modificado
var esNuevo = true;
// variable para actualizar datos
var indice = 0;

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

const limpiarFormulario = () => {
  let formulario = document.getElementById('formul');
  formulario.reset();
  document.getElementById('tituloMedico').innerHTML = "Nuevo Médico";
}



const nuevoMedico = (esNuevo, indice) => {
  console.log(esNuevo, indice);
  let formularioCorrecto = true;
  let nuevoCodigo = 0;
  if (esNuevo) {
    document.getElementById('tituloMedico').innerHTML = "Nuevo Médico";
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
  }
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
    formularioCorrecto = true;
  }

  if (nombreEspecialidad.trim() == "") {
    //error de required
    document.getElementById('error-especialidad').innerHTML = "La especialidad es requerida";
    formularioCorrecto = false;
  } else {
    document.getElementById('error-especialidad').innerHTML = "";
    formularioCorrecto = true;
  }

  if (diasDeAtencion.trim() == "") {
    //error de required
    document.getElementById('error-atencion').innerHTML = "Ingrese días y horario de atención";
    formularioCorrecto = false;
  } else {
    document.getElementById('error-atencion').innerHTML = "";
    formularioCorrecto = true;
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
    formularioCorrecto = true;
  }

  if (formularioCorrecto) {
    if (esNuevo) {
      const nuevoMedico = {
        codigo: nuevoCodigo,
        nombre: nombreMedico,
        especialidad: nombreEspecialidad,
        descripcion: diasDeAtencion,
        contacto: direccionDeEmail,
        activo: true
      };
      data.push(nuevoMedico);
    } else {

      const nuevoMedico = {
        nombre: nombreMedico,
        especialidad: nombreEspecialidad,
        descripcion: diasDeAtencion,
        contacto: direccionDeEmail
      };
      data[indice].nombre = nombreMedico;
      data[indice].especialidad = nombreEspecialidad;
      data[indice].descripcion = diasDeAtencion;
      data[indice].contacto = direccionDeEmail;
    }
    console.log(data);
    dibujarTabla();
    limpiarFormulario();
  } else {
    console.log("Formulario incorrecto");
  }
}
//*********** Funcion Eliminar Medico **********************//
const eliminaMedico = (identificador) => {
  data.splice(identificador, 1);
  console.log(data);
  dibujarTabla();
}

/*
const cambiaEstado = (estado, identificador) => {
  console.log(estado, identificador);
  var miChekBox = document.getElementById(String(identificador));
  console.log(miChekBox.checked);
  if (miChekBox.checked) {
    miChekBox.removeAttribute("checked")
    data[identificador].activo = false;
    //document.getElementById(String(identificador)).innerHTML = false;
  } else {
    miChekBox.setAttribute("checked", "true")
    data[identificador].activo = true;
    //document.getElementById(String(identificador)).innerHTML = true;
  }
  console.log(miChekBox);
  //dibujarTabla();
}
*/

const modificaMedico = (identificador) => {
  esNuevo = false;
  indice = identificador;
  const nuevoCodigo = data[identificador].codigo;
  document.getElementById('nombre').value = data[identificador].nombre;
  document.getElementById('especialidad').value = data[identificador].especialidad;
  document.getElementById('atencion').value = data[identificador].descripcion;
  document.getElementById('email').value = data[identificador].contacto;
  document.getElementById('tituloMedico').innerHTML = "Modifica Médico";
  //dibujarTabla();
}

const dibujarTabla = () => {
  //if (document.getElementById("idtabla")) {
  // la tabla tiene un encabezado fijo
  esNuevo = true;
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
                <th scope="col">Activo</th>
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
            <td><input type="checkbox" value="" name ="check${i}" id="${i}" checked ></td>
            <td><button onclick="modificaMedico(${i})" type="button" class="btn btn-outline-success">Modificar</button></td>
            <td><button onclick="eliminaMedico(${i})" type="button" class="btn btn-outline-danger">Eliminar</button></td>
        </tr>
        `
  }

  // <td><button onclick="cambiaEstado(${data[i].activo}, ${i})" type="button" class="btn btn-outline-primary">Estado</button></td>
  // le agrego el cierre de la etiqueta table 
  cad += `
            </tbody>
        </table>
    `
  //console.log(cad); // veo por consola si arme bien table
  // modifico el contenido de la etiqueta HTML que tiene
  // id="idtabla", con el contenido de la variable cad
  document.getElementById("idtabla").innerHTML = cad;
  //}
}


const dibujarFormulario = () => {
  //if (document.getElementById("formul")) {
  // la tabla tiene un encabezado fijo
  document.getElementById('tituloMedico').innerHTML = "Nuevo Médico";
  cad = `
    <div>
      <div class="d-flex flex-row align-items-center item-fomulario">
        <label class="form-label">Nombre:</label>
        <div class="flex-grow-1">
          <input id="nombre" class="form-control" type="text" />
          <small id="error-nombre" class="mensaje-error"></small>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center item-fomulario">
        <label class="form-label">Especialidad:</label>
        <div class="flex-grow-1">
          <input id="especialidad" class="form-control" type="text" />
          <small id="error-especialidad" class="mensaje-error"></small>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center item-fomulario">
        <label class="form-label">Atención:</label>
        <div class="flex-grow-1">
          <input id="atencion" class="form-control" type="text" />
          <small id="error-atencion" class="mensaje-error"></small>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center item-fomulario">
        <label class="form-label">Email:</label>
        <div class="flex-grow-1">
          <input id="email" class="form-control" type="email" />
          <small id="error-email" class="mensaje-error"></small>
        </div>
      </div>
    </div>
      <div class="d-flex flex-row justify-content-end botonera"></div>
        <button type="button" class="btn btn-success" onclick="nuevoMedico(esNuevo, indice)">Grabar</button>
        <a href="#" class="btn btn-info" onclick="windows.scrollTo(0,0)">Retornar</a>
        <!--a class="btn btn-info" href="EditarTarea.html" role="button">Retornar</a-->
    </div>
  `
  document.getElementById("formul").innerHTML = cad;
}



const inicializarJs = () => {
  dibujarTabla();
  dibujarFormulario();
}

window.addEventListener('load', inicializarJs);
