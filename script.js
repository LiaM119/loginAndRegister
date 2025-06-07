const submitFunction = (event) => {
    if(!validarFormulario()){
        event.preventDefault();
    }else{
        event.preventDefault();
        alert(
            'Los datos enviados fueron: \n' + 
            'Nombre: ' + document.getElementById('nombre').value + '\n' + 
            'Apellido: ' + document.getElementById('apellido').value + '\n' + 
            'Documento: ' + document.getElementById('documento').value + '\n' + 
            'Email: ' + document.getElementById('email').value + '\n' + 
            'Edad: ' + document.getElementById('edad').value + '\n' + 
            'Trabajo: ' + document.getElementById('trabajo').value + '\n' + 
            'Nivel De Estudio: ' + document.getElementById('nivelEstudio').value + '\n'
        )
    }
}

document.getElementById('formulario').addEventListener('submit', submitFunction) // Escucha el envío del form

function validarFormulario(){

    // Esto valida los campos de texto 
    const camposTexto = document.querySelectorAll('input[type="text"]')
    let validacionCorrecta = true; 

    camposTexto.forEach(campo => {
        let errorCampo = document.getElementById('error'+ campo.id.charAt(0).toUpperCase() + campo.id.slice(1)) // error + id con la primera en mayúscula 
        if (campo.value.trim() === '') {
            mostrarError(errorCampo, '¡Este campo es requerido!')
            validacionCorrecta = false
        } else if(campo.value.length > 0 && campo.value.length < 3){
            mostrarError(errorCampo, '¡Este campo debe tener al menos 3 caracteres!')
            validacionCorrecta = false
        }else{
            ocultarError(errorCampo)
        }
    })

    // Esto valida el campo email 
    const email = document.getElementById('email');
    let errorEmail = document.getElementById('errorEmail'); 

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ // Este regex valida que el formato del email sea válido
        ocultarError(errorEmail)
    }else{
        mostrarError(errorEmail, '¡Ingrese un correro electrónico válido!')
        validacionCorrecta = false;
    }

    // Esto valida el campo edad 
    const edad = document.getElementById('edad');
    const errorEdad = document.getElementById('errorEdad');

    if(edad.value < 18){
        mostrarError(errorEdad, '¡Debes ser mayor a 18 años para registrarte!')
        validacionCorrecta = false
    }else{
        ocultarError(errorEdad)
    }

    // Valdiación de la actividad
    
    const actividad = document.getElementById('trabajo');
    const errorActividad = document.getElementById('errorTrabajo');

    if(actividad.value == '' || Number(edad.value) < 18){
        mostrarError(errorActividad, 'Por favor seleccione un trabajo')
        validacionCorrecta = false; 
    }else{
        ocultarError(errorActividad)
    }

    // Validación del nivel de estudio 
    const nivelEstudio = document.getElementById('nivelEstudio')
    const errorNivelEstudio = document.getElementById('errorNivelEstudio')

    if(nivelEstudio.value == ''){
        mostrarError(errorNivelEstudio, 'Por favor seleccione un nivel de estudio')
        validacionCorrecta = false; 
    }else{
        ocultarError(errorNivelEstudio)
    }

    // Validar los términos y condiciones 
    const aceptoTerminos = document.getElementById('aceptoTerminos')
    const errorAceptoTerminos = document.getElementById('errorTerminos')

    if(!aceptoTerminos.checked){
        mostrarError(errorAceptoTerminos, '¡Debes aceptar los términos y condiciones!')
        validacionCorrecta = false
    }else{
        ocultarError(errorAceptoTerminos)
    }

    return validacionCorrecta; // Esto retorna si el formulario completo es válido o no 


}

const mostrarError = (elemento, mensaje) => {
    elemento.textContent = mensaje; 
    elemento.style.display = "block"; 
}

const ocultarError = (elemento) => {
    elemento.textContent = ''; 
    elemento.style.display = "none"; 
}