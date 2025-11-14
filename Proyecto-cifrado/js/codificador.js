/**
 * ============================================================================
 * CODIFICADOR - Sistema de Cifrado RSA
 * ============================================================================
 * 
 * Este script cifra mensajes de texto utilizando una clave privada RSA.
 * El texto cifrado resultante puede ser descifrado usando la clave pública
 * correspondiente.
 * 
 * @author [Santiago de Pablo de Castro]
 * @date [Noviembre 2025]
 * @version 1.0.0
 */

'use strict';

/**
 * Cifra un mensaje de texto usando la clave privada RSA
 * 
 * Flujo del proceso:
 * 1. Validar que todos los campos estén completos
 * 2. Verificar que JSEncrypt esté disponible
 * 3. Cargar la clave privada
 * 4. Cifrar el mensaje
 * 5. Mostrar el resultado
 * 
 * @returns {void}
 */
function cifrar() {
    try {
        // PASO 1: Obtener valores de los campos
        const clavePrivada = document.getElementById('clavePrivada').value.trim();
        const textoOriginal = document.getElementById('textoOriginal').value.trim();
        const resultado = document.getElementById('resultado');

        // PASO 2: Validar clave privada
        if (!clavePrivada) {
            mostrarError('Debes ingresar la clave privada');
            return;
        }

        // Verificar formato básico de la clave privada
        if (!clavePrivada.includes('BEGIN RSA PRIVATE KEY') && 
            !clavePrivada.includes('BEGIN PRIVATE KEY')) {
            mostrarError('La clave privada no tiene un formato válido. Debe comenzar con "-----BEGIN RSA PRIVATE KEY-----"');
            return;
        }

        // PASO 3: Validar texto a cifrar
        if (!textoOriginal) {
            mostrarError('Debes ingresar un texto para cifrar');
            return;
        }

        // Verificar longitud del mensaje (RSA tiene límites)
        if (textoOriginal.length > 200) {
            mostrarAdvertencia('El mensaje es muy largo. Para mensajes extensos, considera dividirlo en partes más pequeñas.');
        }

        // PASO 4: Verificar que JSEncrypt esté disponible
        if (typeof JSEncrypt === 'undefined') {
            mostrarError('La biblioteca JSEncrypt no está disponible. Verifica tu conexión a internet.');
            return;
        }

        // PASO 5: Mostrar indicador de procesamiento
        mostrarProcesando();

        // PASO 6: Ejecutar cifrado (con pequeño delay para mostrar indicador)
        setTimeout(() => {
            ejecutarCifrado(clavePrivada, textoOriginal);
        }, 100);

    } catch (error) {
        console.error('❌ Error en función cifrar():', error);
        mostrarError(`Error inesperado: ${error.message}`);
    }
}

/**
 * Ejecuta el proceso de cifrado RSA
 * 
 * @param {string} clavePrivada - Clave privada en formato PEM
 * @param {string} textoOriginal - Texto plano a cifrar
 * @returns {void}
 */
function ejecutarCifrado(clavePrivada, textoOriginal) {
    try {
        // PASO 1: Crear instancia de JSEncrypt
        const crypt = new JSEncrypt();

        // PASO 2: Cargar la clave PRIVADA
        // Nota: Aunque usualmente se cifra con la pública y descifra con la privada,
        // para simular una firma digital se cifra con la privada y descifra con la pública
        crypt.setPrivateKey(clavePrivada);

        // PASO 3: CIFRAR el texto con la clave privada
        const textoCifrado = crypt.encrypt(textoOriginal);

        // PASO 4: Verificar que el cifrado fue exitoso
        if (!textoCifrado) {
            throw new Error('No se pudo cifrar el texto. Verifica que la clave sea válida y corresponda a una clave privada RSA.');
        }

        // PASO 5: Calcular estadísticas
        const stats = {
            longitudOriginal: textoOriginal.length,
            longitudCifrada: textoCifrado.length,
            expansion: ((textoCifrado.length / textoOriginal.length) * 100).toFixed(2)
        };

        // PASO 6: Mostrar resultado exitoso
        mostrarExito(textoOriginal, textoCifrado, stats);

        // Log para depuración
        console.log('✅ Cifrado exitoso');
        console.log('📏 Longitud original:', stats.longitudOriginal, 'caracteres');
        console.log('📏 Longitud cifrada:', stats.longitudCifrada, 'caracteres');
        console.log('📊 Expansión:', stats.expansion + '%');

    } catch (error) {
        console.error('❌ Error al cifrar:', error);
        mostrarError(`Error al cifrar: ${error.message}`);
    }
}

/**
 * Muestra el resultado exitoso del cifrado
 * 
 * @param {string} textoOriginal - Texto original
 * @param {string} textoCifrado - Texto cifrado
 * @param {Object} stats - Estadísticas del cifrado
 * @returns {void}
 */
function mostrarExito(textoOriginal, textoCifrado, stats) {
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = `
        <h3>✅ Texto Cifrado Exitosamente</h3>

        <div class="info-box">
            <strong>📊 Estadísticas del cifrado:</strong>
            <div style="margin-top: 8px; line-height: 1.8;">
                📝 <strong>Longitud original:</strong> ${stats.longitudOriginal} caracteres<br>
                🔐 <strong>Longitud cifrada:</strong> ${stats.longitudCifrada} caracteres<br>
                📈 <strong>Expansión:</strong> ${stats.expansion}%
            </div>
        </div>

        <div class="output-box">
            <span class="output-label">📝 TEXTO ORIGINAL:</span>
            <textarea readonly class="large">${textoOriginal}</textarea>
        </div>

        <div class="divider"></div>

        <div class="output-box">
            <span class="output-label">🔒 TEXTO CIFRADO (Base64):</span>
            <p style="font-size: 0.9rem; color: #666; margin: 5px 0;">
                Este es el texto cifrado. Cópialo y úsalo en el Decodificador junto con la clave pública.
            </p>
            <textarea 
                readonly 
                id="textoCifradoOutput" 
                class="large"
                onclick="seleccionarTexto('textoCifradoOutput')"
            >${textoCifrado}</textarea>
            <button 
                onclick="copiarTexto('textoCifradoOutput')" 
                class="codificador"
                style="margin-top: 10px; width: auto; padding: 8px 16px; font-size: 14px;"
            >
                📋 Copiar Texto Cifrado
            </button>
        </div>

        <div class="info-box" style="margin-top: 20px;">
            <strong>📝 Próximos pasos:</strong>
            <ol style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li>Copia el texto cifrado usando el botón de arriba</li>
                <li>Abre el programa <strong>Decodificador</strong></li>
                <li>Pega la <strong>clave pública</strong> correspondiente</li>
                <li>Pega el <strong>texto cifrado</strong> para recuperar el mensaje original</li>
            </ol>
        </div>

        <button 
            onclick="limpiarFormulario()" 
            class="codificador"
            style="margin-top: 20px; background: #6c757d;"
        >
            🔄 Cifrar Otro Mensaje
        </button>
    `;

    resultado.className = 'resultado success';
    resultado.style.display = 'block';

    // Scroll suave hacia el resultado
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Muestra un mensaje de error
 * 
 * @param {string} mensaje - Mensaje de error
 * @returns {void}
 */
function mostrarError(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h3>❌ Error</h3>
        <p style="font-size: 1.1rem; margin: 15px 0;">${mensaje}</p>
        <div class="info-box" style="margin-top: 20px;">
            <strong>💡 Sugerencias:</strong>
            <ul style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li>Verifica que hayas copiado la clave privada completa (incluyendo las líneas BEGIN y END)</li>
                <li>Asegúrate de que el texto no esté vacío</li>
                <li>Si el problema persiste, genera un nuevo par de claves</li>
            </ul>
        </div>
    `;
    resultado.className = 'resultado error';
    resultado.style.display = 'block';
}

/**
 * Muestra una advertencia
 * 
 * @param {string} mensaje - Mensaje de advertencia
 * @returns {void}
 */
function mostrarAdvertencia(mensaje) {
    const advertencia = document.createElement('div');
    advertencia.className = 'warning';
    advertencia.innerHTML = `<strong>⚠️ Advertencia:</strong> ${mensaje}`;
    
    const container = document.querySelector('.container');
    const resultado = document.getElementById('resultado');
    container.insertBefore(advertencia, resultado);

    // Eliminar después de 5 segundos
    setTimeout(() => {
        advertencia.remove();
    }, 5000);
}

/**
 * Muestra indicador de procesamiento
 * 
 * @returns {void}
 */
function mostrarProcesando() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="text-center">
            <div class="loading" style="display: inline-block; margin: 20px auto;"></div>
            <p style="color: #666;">Cifrando mensaje con RSA...</p>
        </div>
    `;
    resultado.className = 'resultado info';
    resultado.style.display = 'block';
}

/**
 * Selecciona todo el texto de un elemento
 * 
 * @param {string} elementId - ID del elemento
 * @returns {void}
 */
function seleccionarTexto(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.select();
    }
}

/**
 * Copia texto al portapapeles
 * 
 * @param {string} elementId - ID del elemento a copiar
 * @returns {void}
 */
function copiarTexto(elementId) {
    const elemento = document.getElementById(elementId);
    
    if (!elemento) {
        console.error('Elemento no encontrado:', elementId);
        return;
    }

    try {
        elemento.select();
        elemento.setSelectionRange(0, 99999);
        document.execCommand('copy');
        
        mostrarNotificacion('✅ Texto cifrado copiado al portapapeles');
    } catch (error) {
        console.error('Error al copiar:', error);
        mostrarNotificacion('❌ Error al copiar. Selecciona y copia manualmente.', 'error');
    }
}

/**
 * Muestra una notificación temporal
 * 
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación
 * @returns {void}
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${tipo === 'success' ? '#667eea' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

/**
 * Limpia el formulario para cifrar otro mensaje
 * 
 * @returns {void}
 */
function limpiarFormulario() {
    document.getElementById('textoOriginal').value = '';
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('textoOriginal').focus();
    
    mostrarNotificacion('✅ Formulario limpiado. Puedes cifrar otro mensaje.');
}

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Codificador RSA inicializado');
    
    // Añadir event listener para Enter en el textarea
    const textoOriginal = document.getElementById('textoOriginal');
    if (textoOriginal) {
        textoOriginal.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + Enter para cifrar
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                cifrar();
            }
        });
    }
});

// Estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);