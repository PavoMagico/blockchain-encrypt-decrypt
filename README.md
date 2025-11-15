[README.md](https://github.com/user-attachments/files/23557655/README.md)
# Sistema de Cifrado RSA

Sistema web completo de criptografía asimétrica RSA con tres módulos independientes: generador de claves, codificador y decodificador de mensajes.

![RSA Encryption](https://img.shields.io/badge/Encryption-RSA%202048-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![License](https://img.shields.io/badge/License-Educational-green)

## Descripción

Este proyecto implementa un sistema completo de cifrado asimétrico RSA que permite:

- **Generar** pares de claves criptográficas (pública y privada)
- **Cifrar** mensajes usando la clave pública
- **Descifrar** mensajes usando la clave privada correspondiente

El sistema demuestra los principios fundamentales de la criptografía asimétrica utilizada en blockchain, comunicaciones seguras y firmas digitales.

## Inicio Rápido

### Requisitos Previos

- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar la biblioteca JSEncrypt desde CDN)

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone [(https://github.com/PavoMagico/blockchain-encrypt-decrypt)]
   ```

2. **Estructura del proyecto:**
   ```
   Proyecto-cifrado/
   ├── generador/
   │   └── index.html          # Generador de claves
   ├── codificador/
   │   └── index.html          # Cifrador de mensajes
   ├── decodificador/
   │   └── index.html          # Descifrador de mensajes
   ├── css/
   │   └── styles.css          # Estilos globales
   ├── js/
   │   ├── generador.js        # Lógica del generador
   │   ├── codificador.js      # Lógica del codificador
   │   └── decodificador.js    # Lógica del decodificador
   └── README.md
   ```

3. **Ejecuta el proyecto:**
   
   Simplemente abre cualquiera de los archivos HTML en tu navegador:
   - `generador/index.html` - Para generar claves
   - `codificador/index.html` - Para cifrar mensajes
   - `decodificador/index.html` - Para descifrar mensajes

   > **Nota:** No necesitas servidor web. Los archivos funcionan directamente desde el sistema de archivos local.

## 📖 Guía de Uso

### Paso 1: Generar Claves

1. Abre `generador/index.html`
2. Haz clic en **"Generar Par de Claves"**
3. Espera unos segundos mientras se generan las claves RSA de 2048 bits
4. **Guarda ambas claves** en un lugar seguro:
   - **Clave Pública**: Puedes compartirla libremente
   - **Clave Privada**:  MANTENER SECRETA 

### Paso 2: Cifrar un Mensaje

1. Abre `codificador/index.html`
2. Pega tu **clave pública** en el primer campo
3. Escribe el mensaje que deseas cifrar (máximo 200 caracteres)
4. Haz clic en **"CIFRAR MENSAJE"** o presiona `Ctrl + Enter`
5. Copia el **texto cifrado** resultante

### Paso 3: Descifrar el Mensaje

1. Abre `decodificador/index.html`
2. Pega tu **clave privada** en el primer campo
3. Pega el **texto cifrado** en el segundo campo
4. Haz clic en **"DESCIFRAR MENSAJE"** o presiona `Ctrl + Enter`
5. ¡Verás el mensaje original recuperado!

## Características

### Seguridad
- Cifrado RSA de **2048 bits** (estándar de seguridad actual)
- Generación de claves **100% local** (no se envía nada a servidores)
- Validación de formato de claves
- Manejo seguro de errores

### Interfaz de Usuario
- Diseño moderno y responsive
- Colores diferenciados por módulo
- Atajos de teclado (`Ctrl + Enter`)
- Función de copiado con un clic
- Animaciones suaves y feedback visual

### Funcionalidad
- Estadísticas de cifrado (longitud, expansión)
- Navegación fácil entre módulos
- Sección de ayuda integrada
- Compatible con dispositivos móviles

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript (ES6+)** - Lógica de la aplicación
- **[JSEncrypt](https://github.com/travist/jsencrypt)** - Biblioteca de cifrado RSA

## Conceptos de Criptografía

### ¿Qué es RSA?

RSA (Rivest-Shamir-Adleman) es un algoritmo de criptografía asimétrica que utiliza dos claves relacionadas matemáticamente:

- **Clave Pública**: Se usa para cifrar. Puede compartirse libremente.
- **Clave Privada**: Se usa para descifrar. Debe mantenerse secreta.

### Principio Fundamental

```
Texto Original → [Cifrar con Clave Pública] → Texto Cifrado
Texto Cifrado → [Descifrar con Clave Privada] → Texto Original
```

Lo que se cifra con una clave **solo** puede descifrarse con su pareja correspondiente.

### Aplicaciones Reales

- **HTTPS/SSL**: Comunicación segura en internet
- **Email cifrado**: PGP, S/MIME
- **Blockchain**: Firmas digitales en transacciones
- **Banca digital**: Autenticación y transacciones seguras

## Advertencias de Seguridad

> **IMPORTANTE**: Este proyecto es con fines **educativos** únicamente.

**NO usar en producción** para datos sensibles reales.

## Contexto Académico

**Caso Práctico 1 - Cifrado**  
Módulo: Blockchain - UD1  
Curso: 2º CESUR Málaga  
Autor: Santiago de Pablo de Castro

Este proyecto forma parte del material didáctico para comprender:
- Criptografía asimétrica
- Fundamentos de blockchain
- Seguridad en comunicaciones digitales

## Contribuciones

Este es un proyecto educativo. Si encuentras errores o mejoras:

1. Haz un Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## Licencia

Este proyecto es de uso educativo y libre. Siéntete libre de usarlo para aprender y enseñar conceptos de criptografía.

## Soporte

Si tienes preguntas o problemas:

1. Revisa la sección de **"¿Necesitas ayuda?"** en cada módulo
2. Verifica que tu navegador permita JavaScript
3. Asegúrate de tener conexión a internet (para cargar JSEncrypt)

## 🔗 Enlaces Útiles

- [JSEncrypt GitHub](https://github.com/travist/jsencrypt)
- [RFC 8017 - RSA Cryptography Specifications](https://datatracker.ietf.org/doc/html/rfc8017)
- [Wikipedia - RSA](https://es.wikipedia.org/wiki/RSA)

---
