document.addEventListener('DOMContentLoaded', () => {
    const encriptarBtn = document.getElementById('encriptarBtn');
    const desencriptarBtn = document.getElementById('desencriptarBtn');
    const copiarBtn = document.getElementById('copiarBtn');
    const tema = document.getElementsByClassName('elegirTema');

    actualizarFooter();

    encriptarBtn.addEventListener('click', funcionEncriptar);
    desencriptarBtn.addEventListener('click', funcionDesencriptar);
    copiarBtn.addEventListener('click', copiarTexto);
    Object.entries(tema).forEach(([key, value]) => {
        value.addEventListener('click', () => {
            cambiarTema(value.getAttribute('class'))
        });
    });
});


var funcionEncriptar = function () {
    limpiarCampo('resultado');
    //revisar el texto
    if (!revisarTexto()) {
        deshabiliaBtn('copiarBtn')
        mostrarToast('warning', 'El texto debe contener solo letras minúsculas sin acentos ni caracteres especiales.');
        return false;
    }

    let texto = document.getElementById('textoIngresado').value.trim();
    //encripta las vocales 
    let textoEncriptado = texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    document.getElementById('resultado').value = textoEncriptado;
    // Limpiar el textarea
    limpiarCampo('textoIngresado')
    //Habilitar boton
    habiliaBtn('copiarBtn');
    mostrarToast('success', 'Mensaje encriptado con éxito.');
}

var funcionDesencriptar = function () {
    limpiarCampo('resultado');
    //revisar el texto
    if (!revisarTexto()) {
        deshabiliaBtn('copiarBtn')
        mostrarToast('warning', 'El texto debe contener solo letras minúsculas sin acentos ni caracteres especiales.');
        return false;
    }

    let texto = document.getElementById('textoIngresado').value.trim();
    //desencripta las vocales 
    let textoDesencriptado = texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    document.getElementById('resultado').value = textoDesencriptado;
    limpiarCampo('textoIngresado');
    habiliaBtn('copiarBtn');
    mostrarToast('success', 'Desencriptado con éxito.');
}

var copiarTexto = function () {
    let resultadoTexto = document.getElementById('resultado');

    // Seleccionar el texto a copiar
    resultadoTexto.select();
    //resultadoTexto.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el texto al portapapeles
    let textoCopiado = document.execCommand('copy');
    if (textoCopiado) {
        console.log(unixTime(), 'texto copiado', textoCopiado);
        mostrarToast('success', 'Texto copiado exitosamente.');
    }

    resultadoTexto.setSelectionRange(resultadoTexto.value.length, resultadoTexto.value.length); // Mueve el cursor al final para deseleccionar
}

var revisarTexto = function () {
    let texto = document.getElementById('textoIngresado').value.trim();

    // Verificar que el texto esté en minúsculas, sin acentos, sin caracteres especiales y permitir espacios
    const regex = /^[a-zñ0-9\s!¡?¿]+$/;
    if (regex.test(texto)) {
        console.log(unixTime(), 'El texto es válido.');
        return true;
    } else {
        console.log(unixTime(), 'El texto debe contener solo letras minúsculas sin acentos y caracteres especiales.');
        return false;
    }
}

var limpiarCampo = function (parametroId) {
    // Limpiar el campo con el id
    document.getElementById(parametroId).value = '';
    console.log(unixTime(), `Campo ${parametroId} limpiado.`);
}

var habiliaBtn = function (parametroId) {
    // Habilitar el botón por id
    document.getElementById(parametroId).disabled = false;
}

var deshabiliaBtn = function (parametroId) {
    // Deshabilitar el botón por id
    document.getElementById(parametroId).disabled = true;
}

var unixTime = function () {
    const timestampSegundos = Math.floor(new Date().getTime() / 1000);
    return timestampSegundos;
}

var actualizarFooter = function () {
    // Funcion para actualizar el footer con el año actual
    const anioActual = new Date().getFullYear();
    const footer = document.getElementById('footer');
    footer.textContent = `© ${anioActual} Alura Latam - Desarrollado por David Bernal`;
}

var mostrarToast = function (toastType, mensaje) {
    const toast = document.getElementById(`toast-${toastType}`);
    toast.textContent = mensaje;
    toast.classList.add('show'); // Mostrar el toast
    toast.style.display = 'block';

    // Ocultar el toast despues de 5 segundos
    setTimeout(() => {
        toast.classList.remove('show'); // Ocultar el toast
        toast.style.display = 'none';
        display 
    }, 5000);
}

var cambiarTema = function (currentTheme) {
    // Seleccionar el tema actual para despues cambiar icono
    const actualTema = document.getElementById('actualTema');
    // Seleccionar la etiqueta <html>
    const htmlElement = document.querySelector('html');
    let current = currentTheme.includes('dark')
    console.log(unixTime(), current);
    if (current === true) {
        current = 'dark';
        actualTema.setAttribute('class', 'fas fa-moon');
    } else {
        current = 'light';
        actualTema.setAttribute('class', 'fa-regular fa-sun');
    }

    // Cambiar el atributo del tema global
    htmlElement.setAttribute('data-theme', current);
}
