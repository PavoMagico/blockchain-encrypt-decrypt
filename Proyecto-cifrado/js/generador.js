/**
 * ============================================================================
 * GENERADOR DE CLAVES RSA
 * ============================================================================
 * 
 * Este script genera un par de claves RSA (pública y privada) utilizando
 * la biblioteca JSEncrypt.
 * 
 * @author [Santiago de Pablo de Castro]
 * @date [Noviembre 2025]
 * @version 1.0.0
 */

'use strict';

/**
 * Genera un par de claves RSA de 2048 bits
 * 
 * Proceso:
 * 1. Crea una instancia de JSEncrypt con tamaño de clave especificado
 * 2. Extrae la clave privada y pública generadas
 * 3. Crea un objeto con metadatos (fecha de creación)
 * 4. Muestra las claves en la interfaz
 * 
 * @returns {void}
 */
function generarClaves() {
    try {
        // PASO 1: Verificar que JSEncrypt esté disponible
        if (typeof JSEncrypt === 'undefined') {
            mostrarError('Error: La biblioteca JSEncrypt no está disponible. Verifica tu conexión a internet.');
            return;
        }

        // PASO 2: Mostrar indicador de carga
        mostrarCargando();

        // PASO 3: Generar claves (proceso puede tardar 1-2 segundos)
        setTimeout(() => {
            // Crear instancia de JSEncrypt con tamaño de clave de 2048 bits
            // Nota: 2048 bits es el estándar actual de seguridad
            const crypt = new JSEncrypt({ default_key_size: 2048 });

            // PASO 4: Extraer las claves generadas en formato PEM
            const clavePrivada = crypt.getPrivateKey();
            const clavePublica = crypt.getPublicKey();

            // PASO 5: Verificar que las claves se generaron correctamente
            if (!clavePrivada || !clavePublica) {
                throw new Error('No se pudieron generar las claves correctamente');
            }

            // PASO 6: Crear objeto con metadatos
            const claves = {
                privada: clavePrivada,
                publica: clavePublica,
                fechaCreacion: new Date().toISOString(),
                tamano: '2048 bits',
                algoritmo: 'RSA'
            };

            // PASO 7: Mostrar las claves en la interfaz
            mostrarClaves(claves);

            // PASO 8: Log para depuración (solo en desarrollo)
            console.log('✅ Par de claves generado exitosamente');
            console.log('📅 Fecha:', claves.fechaCreacion);
            console.log('🔐 Tamaño:', claves.tamano);

        }, 100); // Pequeño delay para permitir que se muestre el indicador de carga

    } catch (error) {
        // Manejo de errores
        console.error('❌ Error al generar claves:', error);
        mostrarError(`Error al generar claves: ${error.message}`);
    }
}

/**
 * Muestra las claves generadas en la interfaz
 * 
 * @param {Object} claves - Objeto con las claves y metadatos
 * @param {string} claves.publica - Clave pública en formato PEM
 * @param {string} claves.privada - Clave privada en formato PEM
 * @param {string} claves.fechaCreacion - Fecha ISO de creación
 * @param {string} claves.tamano - Tamaño de la clave
 * @param {string} claves.algoritmo - Algoritmo utilizado
 * @returns {void}
 */
function mostrarClaves(claves) {
    const resultado = document.getElementById('resultado');

    // Formatear fecha para mostrar
    const fecha = new Date(claves.fechaCreacion);
    const fechaLegible = fecha.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Construir HTML con las claves
    resultado.innerHTML = `
        <h3>✅ Claves Generadas con Éxito</h3>
        
        <div class="info-box">
            <strong>Información del par de claves:</strong>
            <div style="margin-top: 8px;">
                📅 <strong>Fecha de creación:</strong> ${fechaLegible}<br>
                🔐 <strong>Algoritmo:</strong> ${claves.algoritmo}<br>
                📏 <strong>Tamaño:</strong> ${claves.tamano}
            </div>
        </div>

        <div class="output-box">
            <span class="output-label">🔓 CLAVE PÚBLICA (Compartible)</span>
            <p style="font-size: 0.9rem; color: #666; margin: 5px 0;">
                Esta clave puede compartirse libremente. Se usa para descifrar mensajes.
            </p>
            <textarea 
                readonly 
                id="clavePublicaOutput" 
                class="large"
                onclick="seleccionarTexto('clavePublicaOutput')"
            >${claves.publica}</textarea>
            <button 
                onclick="copiarTexto('clavePublicaOutput')" 
                class="generador"
                style="margin-top: 10px; width: auto; padding: 8px 16px; font-size: 14px;"
            >
                📋 Copiar Clave Pública
            </button>
        </div>

        <div class="divider"></div>

        <div class="output-box">
            <span class="output-label">🔒 CLAVE PRIVADA (¡MANTENER SECRETA!)</span>
            <div class="warning">
                <strong>⚠️ IMPORTANTE:</strong>
                Esta clave debe mantenerse en secreto. Cualquiera que tenga acceso a ella 
                podrá firmar mensajes en tu nombre. No la compartas con nadie.
            </div>
            <textarea 
                readonly 
                id="clavePrivadaOutput" 
                class="large"
                onclick="seleccionarTexto('clavePrivadaOutput')"
            >${claves.privada}</textarea>
            <button 
                onclick="copiarTexto('clavePrivadaOutput')" 
                class="generador"
                style="margin-top: 10px; width: auto; padding: 8px 16px; font-size: 14px;"
            >
                📋 Copiar Clave Privada
            </button>
        </div>

        <div class="info-box" style="margin-top: 20px;">
            <strong>📝 Próximos pasos:</strong>
            <ol style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li>Copia ambas claves y guárdalas en un lugar seguro</li>
                <li>Usa la <strong>clave privada</strong> en el <em>Codificador</em></li>
                <li>Usa la <strong>clave pública</strong> en el <em>Decodificador</em></li>
            </ol>
        </div>
    `;

    // Mostrar el resultado con animación
    resultado.className = 'resultado success';
    resultado.style.display = 'block';

    // Scroll suave hacia el resultado
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Muestra indicador de carga mientras se generan las claves
 * 
 * @returns {void}
 */
function mostrarCargando() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="text-center">
            <div class="loading" style="display: inline-block; margin: 20px auto;"></div>
            <p style="color: #666;">Generando par de claves RSA de 2048 bits...</p>
            <p style="color: #999; font-size: 0.9rem;">Esto puede tardar unos segundos</p>
        </div>
    `;
    resultado.className = 'resultado info';
    resultado.style.display = 'block';
}

/**
 * Muestra un mensaje de error en la interfaz
 * 
 * @param {string} mensaje - Mensaje de error a mostrar
 * @returns {void}
 */
function mostrarError(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h3>❌ Error</h3>
        <p>${mensaje}</p>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
            Por favor, recarga la página e intenta nuevamente.
        </p>
    `;
    resultado.className = 'resultado error';
    resultado.style.display = 'block';
}

/**
 * Selecciona todo el texto de un textarea para facilitar la copia
 * 
 * @param {string} elementId - ID del elemento textarea
 * @returns {void}
 */
function seleccionarTexto(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.select();
    }
}

/**
 * Copia el contenido de un textarea al portapapeles
 * 
 * @param {string} elementId - ID del elemento textarea
 * @returns {void}
 */
function copiarTexto(elementId) {
    const elemento = document.getElementById(elementId);
    
    if (!elemento) {
        console.error('Elemento no encontrado:', elementId);
        return;
    }

    try {
        // Seleccionar el texto
        elemento.select();
        elemento.setSelectionRange(0, 99999); // Para dispositivos móviles

        // Copiar al portapapeles
        document.execCommand('copy');

        // Feedback visual
        const tipoTexto = elementId.includes('Publica') ? 'pública' : 'privada';
        mostrarNotificacion(`✅ Clave ${tipoTexto} copiada al portapapeles`);

    } catch (error) {
        console.error('Error al copiar:', error);
        mostrarNotificacion('❌ Error al copiar. Selecciona y copia manualmente.', 'error');
    }
}

/**
 * Muestra una notificación temporal
 * 
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación ('success' o 'error')
 * @returns {void}
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${tipo === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

    // Agregar al DOM
    document.body.appendChild(notificacion);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Generador de Claves RSA inicializado');
    console.log('📚 JSEncrypt versión:', typeof JSEncrypt !== 'undefined' ? 'Cargada' : 'No disponible');
});

// Animaciones CSS adicionales (inyectadas via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);