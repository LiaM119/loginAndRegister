document.addEventListener('DOMContentLoaded', function() {

    // ------------ REGISTRO ------------

    document.getElementById('registerButton').addEventListener('click', function() {
        if (validarFormulario()) {
            alert(
                'Los datos enviados fueron: \n' +
                'Nombre: ' + document.getElementById('nombre').value + '\n' +
                'Apellido: ' + document.getElementById('apellido').value + '\n' +
                'Documento: ' + document.getElementById('documento').value + '\n' +
                'Email: ' + document.getElementById('email').value + '\n' +
                'Edad: ' + document.getElementById('edad').value + '\n' +
                'Trabajo: ' + document.getElementById('trabajo').value + '\n' +
                'Nivel De Estudio: ' + document.getElementById('nivelEstudio').value + '\n'
            );
        }
    });

    function validarFormulario() {
    const camposTexto = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="checkbox"] ');
    let validacionCorrecta = true;

    camposTexto.forEach(campo => {
        let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
        if (campo.value.trim() === '') {
            mostrarError(errorCampo, '¡Este campo es requerido!');
            validacionCorrecta = false;
        } else if (['nombre', 'apellido'] > 0 && campo.value.length < 3) {
            mostrarError(errorCampo, '¡Este campo debe tener al menos 3 caracteres!');
            validacionCorrecta = false;
        } else {
            ocultarError(errorCampo);
        }
    });

    // EMAIL
    const email = document.getElementById('email');
    const errorEmail = document.getElementById('errorEmail');

    if (email.value.trim() === '') {
        mostrarError(errorEmail, '¡El campo de email es obligatorio!');
        validacionCorrecta = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        mostrarError(errorEmail, '¡Ingrese un correo electrónico válido!');
        validacionCorrecta = false;
    } else {
        ocultarError(errorEmail);
    }

    // EDAD
    const edad = document.getElementById('edad');
    const errorEdad = document.getElementById('errorEdad');

    if (edad.value.trim() === '') {
        mostrarError(errorEdad, '¡El campo de edad es obligatorio!');
        validacionCorrecta = false;
    } else if (isNaN(Number(edad.value.trim()))) {
        mostrarError(errorEdad, '¡Ingrese una edad válida!');
        validacionCorrecta = false;
    } else if (Number(edad.value.trim()) < 18) {
        mostrarError(errorEdad, '¡Debes ser mayor a 18 años para registrarte!');
        validacionCorrecta = false;
    } else {
        ocultarError(errorEdad);
    }

    // TRABAJO
    const actividad = document.getElementById('trabajo');
    const errorActividad = document.getElementById('errorTrabajo');

    if (actividad.value == '') {
        mostrarError(errorActividad, 'Por favor seleccione un trabajo');
        validacionCorrecta = false;
    } else {
        ocultarError(errorActividad);
    }

    // NIVEL DE ESTUDIO
    const nivelEstudio = document.getElementById('nivelEstudio');
    const errorNivelEstudio = document.getElementById('errorNivelEstudio');

    if (nivelEstudio.value == '') {
        mostrarError(errorNivelEstudio, 'Por favor seleccione un nivel de estudio');
        validacionCorrecta = false;
    } else {
        ocultarError(errorNivelEstudio);
    }

    // TERMINOS Y CONDICIONES
    const aceptoTerminos = document.getElementById('aceptoTerminos');
    const errorAceptoTerminos = document.getElementById('errorTerminos');

    if (!aceptoTerminos.checked) {
        mostrarError(errorAceptoTerminos, '¡Debes aceptar los términos y condiciones!');
        validacionCorrecta = false;
    } else {
        ocultarError(errorAceptoTerminos);
    }

    return validacionCorrecta;
    }

    const mostrarError = (elemento, mensaje) => {
        elemento.textContent = mensaje;
        elemento.style.display = "block";
    };

    const ocultarError = (elemento) => {
        elemento.textContent = '';
        elemento.style.display = "none";
    };

    // ------------ LOGIN ------------

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const confirmPasswordInput = document.getElementById('loginConfirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    emailInput.addEventListener('change', function() {
        clearError(emailError);
    });

    passwordInput.addEventListener('change', function() {
        clearError(passwordError);
    });

    confirmPasswordInput.addEventListener('change', function() {
        clearError(confirmPasswordError);
    });

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {
            saveToLocalStorage();
            alert('Has ingresado con éxito');
        }
    }

    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim();

        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un email válido');
            return false;
        }
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingresa una contraseña de al menos 6 caracteres');
            return false;
        }
        return true;
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON() {
        return {
            email: emailInput.value,
            password: passwordInput.value
        };
    }

});
