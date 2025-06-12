document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
    document.getElementById('loginPanel').classList.add('loginAnimation');
    }, 50);

    setTimeout(() => {
    document.getElementById('container-register').classList.add('registerFormAnimation');
    }, 50);

        setTimeout(() => {
        document.body.classList.remove('preload');
    }, 50);
  
    // ------------ REGISTER ------------

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

    // TEXT
    function validarFormulario() {
    const camposTexto = document.querySelectorAll('input[type="text"]');
    let validacionCorrecta = true;

    camposTexto.forEach(campo => {
        let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
        if (campo.value.trim() === '') {
            mostrarError(errorCampo, '¡Este campo es requerido!');
            validacionCorrecta = false;
        } else if (['nombre', 'apellido'].includes(campo.id) && campo.value.length < 3){
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

    if (edad.value.trim() == '') {
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

    // WORK
    const actividad = document.getElementById('trabajo');
    const errorActividad = document.getElementById('errorTrabajo');

    if (actividad.value == '') {
        mostrarError(errorActividad, 'Por favor seleccione un trabajo');
        validacionCorrecta = false;
    } else {
        ocultarError(errorActividad);
    }

    // STUDY LEVEL
    const nivelEstudio = document.getElementById('nivelEstudio');
    const errorNivelEstudio = document.getElementById('errorNivelEstudio');

    if (nivelEstudio.value == '') {
        mostrarError(errorNivelEstudio, 'Por favor seleccione un nivel de estudio');
        validacionCorrecta = false;
    } else {
        ocultarError(errorNivelEstudio);
    }

    // CONDITIONS
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

    // HELPER FUNCTIONS 
    const mostrarError = (elemento, mensaje) => {
        elemento.textContent = mensaje;
        elemento.style.display = "block";
    };

    const ocultarError = (elemento) => {
        elemento.textContent = '';
        elemento.style.display = "none";
    };

    // ------------ LOGIN ------------

    // LOGIN FORM SETUP
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const confirmPasswordInput = document.getElementById('loginConfirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // EVENT LISTENERS
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

    // VALIDATE FORM
    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {
            saveToLocalStorage();
            alert('Has ingresado con éxito');
        }
    }

    // VALIDATE EMAIL
    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim();

        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un email válido');
            return false;
        }
        return true;
    }

    // VALIDATE PASSWORD 
    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingresa una contraseña de al menos 6 caracteres');
            return false;
        }
        return true;
    }

    // VALIDATE PASSWORD MATCH 
    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    // ERROR DISPLAY UTILITIES 
    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    // LOCAL STORAGE 
    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    // BODY JSON BUILDER
    function bodyBuilderJSON() {
        return {
            email: emailInput.value,
            password: passwordInput.value
        };
    }

    const btnRegister = document.getElementById("btnRegister");
    const btnLogin = document.getElementById("btnLogin");

    const registerPanel = document.getElementById("registerPanel");
    const loginPanel = document.getElementById("loginPanel");

    const registerFormm = document.getElementById("container-register");
    const loginFormm = document.getElementById("container-login");

    function limpiarTodo() {
    // Remueve clases de movimiento
    loginFormm.classList.remove("move-left-login", "move-right-login");
    registerFormm.classList.remove("move-left-register", "move-right-register");
    loginPanel.classList.remove("move-left-loginPanel", "move-right-loginPanel");
    registerPanel.classList.remove("move-left-registerPanel", "move-right-registerPanel");

    // Remueve clases de visibilidad
    [registerPanel, loginPanel, registerFormm, loginFormm].forEach(el => {
    el.classList.remove("activo", "inactivo");
    });

    // Forzar reflow
    void loginFormm.offsetWidth;
    void registerFormm.offsetWidth;
    }

    btnLogin.addEventListener("click", () => {
        limpiarTodo();
    // Oculta panel de bienvenida de login y muestra el formulario
    loginPanel.classList.add("inactivo");
    loginFormm.classList.remove("inactivo");
    loginFormm.classList.add("activo");

    // Movimiento
    loginFormm.classList.add("move-left-login");
    loginPanel.classList.remove("move-left-loginPanel");

    // Mostrar panel de bienvenida de registro
    registerPanel.classList.remove("inactivo"); // <--- faltaba esto
    registerPanel.classList.add("activo");      // opcional, si manejas clase 'activo'

    // Asegura que el formulario de registro esté oculto
    registerFormm.classList.add("inactivo");
    registerFormm.classList.remove("activo");

    // Movimiento
    registerPanel.classList.remove("move-right-registerPanel"); // <--- clave
    registerPanel.classList.add("move-left-registerPanel");     // <--- nuevo movimiento de entrada
    registerFormm.classList.remove("move-right-register");
    });

    btnRegister.addEventListener("click", () => {
        limpiarTodo();
    // Oculta panel de bienvenida de registro y muestra el formulario
    registerPanel.classList.add("inactivo");
    registerPanel.classList.remove("activo"); // <--- FALTA ESTO
    registerFormm.classList.remove("inactivo");
    registerFormm.classList.add("activo");

    // Movimiento
    registerFormm.classList.add("move-left-register");
    registerPanel.classList.remove("move-left-registerPanel");

    // Mostrar panel de bienvenida de login
    loginPanel.classList.remove("inactivo");
    loginPanel.classList.add("activo");

    // Asegura que el formulario de login esté oculto
    loginFormm.classList.add("inactivo");
    loginFormm.classList.remove("activo");

    // Movimiento
    loginPanel.classList.remove("move-right-loginPanel");
    loginPanel.classList.add("move-left-loginPanel");
    loginFormm.classList.remove("move-right-login");
    });
    
});
