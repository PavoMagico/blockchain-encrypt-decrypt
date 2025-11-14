/**
 * ============================================================================
 * DECODIFICADOR - Sistema de Descifrado RSA
 * ============================================================================
 * 
 * Este script descifra mensajes cifrados con RSA utilizando la clave pública.
 * Complementa el proceso iniciado en el Codificador.
 * 
 * @author [Santiago de Pablo de Castro]
 * @date [Noviembre 2025]
 * @version 1.0.0
 */

'use strict';

/**
 * Descifra un mensaje cifrado usando la clave pública RSA
 * 
 * Flujo del proceso:
 * 1. Validar que todos los campos estén completos
 * 2. Verificar que JSEncrypt esté disponible
 * 3. Cargar la clave pública
 * 4. Descifrar el mensaje
 * 5. Mostrar el resultado
 * 
 * @returns {void}
 */
function descifrar() {
    try {
        // PASO 1: Obtener valores de los campos
        const clavePublica = document.getElementById('clavePublica').value.trim();
        const textoCifrado = document.getElementById('textoCifrado').value.trim();
        const resultado = document.getElementById('resultado');

        // PASO 2: Validar clave pública
        if (!clavePublica) {
            mostrarError('Debes ingresar la clave pública');
            return;
        }

        // Verificar formato básico de la clave pública
        if (!clavePublica.includes('BEGIN PUBLIC KEY')) {
            mostrarError('La clave pública no tiene un formato válido. Debe comenzar con "-----BEGIN PUBLIC KEY-----"');
            return;
        }

        // PASO 3: Validar texto cifrado
        if (!textoCifrado) {
            mostrarError('Debes ingresar el texto cifrado');
            return;
        }

        // Verificar que el texto cifrado parece ser Base64 válido
        if (!/^[A-Za-z0-9+/=\s]+$/.test(textoCifrado)) {
            mostrarError('El texto cifrado no parece tener un formato Base64 válido');
            return;
        }

        // PASO 4: Verificar que JSEncrypt esté disponible
        if (typeof JSEncrypt === 'undefined') {
            mostrarError('La biblioteca JSEncrypt no está disponible. Verifica tu conexión a internet.');
            return;
        }

        // PASO 5: Mostrar indicador de procesamiento
        mostrarProcesando();

        // PASO 6: Ejecutar descifrado (con pequeño delay para mostrar indicador)
        setTimeout(() => {
            ejecutarDescifrado(clavePublica, textoCifrado);
        }, 100);

    } catch (error) {
        console.error('❌ Error en función descifrar():', error);
        mostrarError(`Error inesperado: ${error.message}`);
    }
}

/**
 * Ejecuta el proceso de descifrado RSA
 * 
 * @param {string} clavePublica - Clave pública en formato PEM
 * @param {string} textoCifrado - Texto cifrado en Base64
 * @returns {void}
 */
function ejecutarDescifrado(clavePublica, textoCifrado) {
    try {
        // PASO 1: Crear instancia de JSEncrypt
        const crypt = new JSEncrypt();

        // PASO 2: Cargar la clave PÚBLICA
        // Nota: Descifrar con la clave pública completa el proceso de firma digital
        crypt.setPublicKey(clavePublica);

        // PASO 3: DESCIFRAR el texto con la clave pública
        const textoDescifrado = crypt.decrypt(textoCifrado);

        // PASO 4: Verificar que el descifrado fue exitoso
        if (!textoDescifrado) {
            throw new Error('No se pudo descifrar el texto. Verifica que la clave pública sea la correcta y que corresponda a la clave privada usada para cifrar.');
        }

        // PASO 5: Calcular estadísticas
        const stats = {
            longitudCifrada: textoCifrado.length,
            longitudDescifrada: textoDescifrado.length,
            reduccion: ((1 - textoDescifrado.length / textoCifrado.length) * 100).toFixed(2)
        };

        // PASO 6: Mostrar resultado exitoso
        mostrarExito(textoDescifrado, stats);

        // Log para depuración
        console.log('✅ Descifrado exitoso');
        console.log('📏 Longitud cifrada:', stats.longitudCifrada, 'caracteres');
        console.log('📏 Longitud descifrada:', stats.longitudDescifrada, 'caracteres');
        console.log('📊 Reducción:', stats.reduccion + '%');

    } catch (error) {
        console.error('❌ Error al descifrar:', error);
        mostrarErrorDescifrado(error.message);
    }
}

/**
 * Muestra el resultado exitoso del descifrado
 * 
 * @param {string} textoDescifrado - Texto descifrado (mensaje original)
 * @param {Object} stats - Estadísticas del descifrado
 * @returns {void}
 */
function mostrarExito(textoDescifrado, stats) {
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = `
        <h3>✅ Texto Descifrado Exitosamente</h3>

        <div class="info-box">
            <strong>📊 Estadísticas del descifrado:</strong>
            <div style="margin-top: 8px; line-height: 1.8;">
                🔐 <strong>Longitud cifrada:</strong> ${stats.longitudCifrada} caracteres<br>
                📝 <strong>Longitud descifrada:</strong> ${stats.longitudDescifrada} caracteres<br>
                📉 <strong>Reducción:</strong> ${stats.reduccion}%
            </div>
        </div>

        <div class="divider"></div>

        <div class="output-box" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9;">
            <span class="output-label" style="color: #0369a1; font-size: 1.1rem;">
                ✨ MENSAJE ORIGINAL RECUPERADO:
            </span>
            <div style="
                margin-top: 15px;
                padding: 20px;
                background: white;
                border-radius: 8px;
                border: 2px dashed #0ea5e9;
                font-size: 1.2rem;
                font-weight: 500;
                color: #0c4a6e;
                line-height: 1.8;
                word-wrap: break-word;
                box-shadow: inset 0 2px 8px rgba(14, 165, 233, 0.1);
            ">
                ${escaparHTML(textoDescifrado)}
            </div>
        </div>

        <div class="info-box" style="margin-top: 20px; background: #dcfce7; border-color: #22c55e;">
            <strong style="color: #166534;">🎉 ¡Descifrado completado con éxito!</strong>
            <p style="margin: 10px 0 0 0; color: #166534; line-height: 1.8;">
                El mensaje ha sido recuperado correctamente. Este proceso demuestra cómo funciona 
                la criptografía asimétrica: lo que se cifra con la <strong>clave privada</strong> 
                solo puede descifrarse con la <strong>clave pública</strong> correspondiente.
            </p>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button 
                onclick="copiarMensajeDescifrado('${escaparHTML(textoDescifrado)}')" 
                class="decodificador"
                style="flex: 1;"
            >
                📋 Copiar Mensaje
            </button>
            <button 
                onclick="limpiarFormulario()" 
                class="decodificador"
                style="flex: 1; background: #6c757d;"
            >
                🔄 Descifrar Otro
            </button>
        </div>
    `;

    resultado.className = 'resultado success';
    resultado.style.display = 'block';

    // Scroll suave hacia el resultado
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Muestra un mensaje de error genérico
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
                <li>Verifica que hayas copiado la clave pública completa (incluyendo las líneas BEGIN y END)</li>
                <li>Asegúrate de que el texto cifrado sea correcto</li>
                <li>Confirma que estás usando el par de claves correcto</li>
            </ul>
        </div>
    `;
    resultado.className = 'resultado error';
    resultado.style.display = 'block';
}

/**
 * Muestra un mensaje de error específico para descifrado
 * 
 * @param {string} mensaje - Mensaje de error técnico
 * @returns {void}
 */
function mostrarErrorDescifrado(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h3>❌ No se pudo descifrar el mensaje</h3>
        <p style="font-size: 1.1rem; margin: 15px 0;">
            El descifrado ha fallado. Esto puede ocurrir por varias razones:
        </p>

        <div class="warning">
            <strong>⚠️ Posibles causas:</strong>
            <ul style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li><strong>Claves no correspondientes:</strong> La clave pública no coincide con la clave privada usada para cifrar</li>
                <li><strong>Texto cifrado incorrecto:</strong> El texto cifrado está incompleto o fue modificado</li>
                <li><strong>Formato inválido:</strong> La clave pública o el texto cifrado tienen un formato incorrecto</li>
            </ul>
        </div>

        <div class="info-box" style="margin-top: 20px;">
            <strong>🔧 Soluciones:</strong>
            <ol style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li>Verifica que estés usando la <strong>misma clave pública</strong> que corresponde a la clave privada del cifrado</li>
                <li>Asegúrate de haber copiado el <strong>texto cifrado completo</strong></li>
                <li>Genera un nuevo par de claves y vuelve a intentar el proceso completo</li>
            </ol>
        </div>

        <details style="margin-top: 15px; font-size: 0.9rem; color: #666;">
            <summary style="cursor: pointer; font-weight: 600;">📋 Detalles técnicos del error</summary>
            <pre style="margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px; overflow-x: auto;">${mensaje}</pre>
        </details>
    `;
    resultado.className = 'resultado error';
    resultado.style.display = 'block';
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
            <p style="color: #666;">Descifrando mensaje con RSA...</p>
        </div>
    `;
    resultado.className = 'resultado info';
    resultado.style.display = 'block';
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * 
 * @param {string} texto - Texto a escapar
 * @returns {string} - Texto escapado
 */
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

/**
 * Copia el mensaje descifrado al portapapeles
 * 
 * @param {string} mensaje - Mensaje a copiar
 * @returns {void}
 */
function copiarMensajeDescifrado(mensaje) {
    try {
        // Crear elemento temporal
        const temp = document.createElement('textarea');
        temp.value = mensaje;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);

        // Seleccionar y copiar
        temp.select();
        document.execCommand('copy');

        // Limpiar
        document.body.removeChild(temp);

        mostrarNotificacion('✅ Mensaje descifrado copiado al portapapeles');
    } catch (error) {
        console.error('Error al copiar:', error);
        mostrarNotificacion('❌ Error al copiar', 'error');
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
        background: ${tipo === 'success' ? '#f5576c' : '#f44336'};
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
 * Limpia el formulario para descifrar otro mensaje
 * 
 * @returns {void}
 */
function limpiarFormulario() {
    document.getElementById('textoCifrado').value = '';
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('textoCifrado').focus();
    
    mostrarNotificacion('✅ Formulario limpiado. Puedes descifrar otro mensaje.');
}

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔓 Decodificador RSA inicializado');
    
    // Event listener para Ctrl/Cmd + Enter
    const textoCifrado = document.getElementById('textoCifrado');
    if (textoCifrado) {
        textoCifrado.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                descifrar();
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