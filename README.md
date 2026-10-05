# ASSET — Sitio oficial

Landing estática de ASSET, con HTML, CSS y JavaScript sin dependencias de ejecución ni paso de compilación. Conserva el dominio, la configuración de Vercel, la verificación de Google, los iconos, el manifiesto y el acceso a la aplicación.

## Desarrollo local

Desde esta carpeta, con Python disponible:

```powershell
python -m http.server 5174 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:5174/`. El recurso `/_vercel/insights/script.js` es provisto por Vercel en producción; un servidor estático local puede responder 404 a ese recurso de analítica.

## Contenido

- Presentación de la plataforma y demo ilustrativa interactiva.
- 24 módulos agrupados, planes Pymes / Empresarial / Corporativo y sus alcances originales.
- Diez servicios tecnológicos complementarios.
- Preguntas frecuentes, formulario de solicitud de contacto y acceso a la aplicación.

Los datos de la demo son ficticios y no se conectan con la aplicación ni con clientes. Búsquedas y tareas funcionan localmente. Cerrar la demo ampliada restablece sus datos.

## Contacto

El formulario conserva el destinatario original de FormSubmit y el honeypot. Los botones que antes abrían WhatsApp llevan a una solicitud de contacto. El visitante deja nombre y WhatsApp con código de país, y autoriza que ASSET lo contacte; empresa, correo, plan y consulta son opcionales. Al entrar desde un plan, este se selecciona automáticamente. La solicitud enviada por correo incluye los datos, el origen y un enlace para que el equipo inicie la conversación con el visitante. JavaScript utiliza el endpoint AJAX documentado para confirmar el resultado del servicio. Solo muestra éxito si la respuesta HTTP y `success` lo confirman; ante errores conserva los datos y permite reintentar. Sin JavaScript mantiene el POST nativo. No se abre ni se envía un mensaje por WhatsApp al enviar la solicitud. No se capturan datos automáticamente desde WhatsApp ni se guardan datos personales en el navegador. El enlace de acceso a la aplicación se conserva.

Documentación del proveedor: https://formsubmit.co/documentation

Las verificaciones del rediseño simulan las respuestas de FormSubmit: no envían correos de prueba. La recepción real depende de la configuración y activación existentes del servicio.

## Archivos

- `index.html`: contenido, formulario, metadatos y datos estructurados.
- `assets/landing-*.css` y `assets/landing-*.js`: diseño e interacciones. El nombre incluye una huella del contenido porque Vercel conserva `/assets/` en caché durante un año.
- `assets/asset-logo-horizontal-color.svg` y `assets/asset-isotipo-color.svg`: vectores originales de la marca.
- `404.html`: página de error alineada con el diseño.
- `vercel.json`: configuración original de alojamiento.

Al modificar CSS o JavaScript, generar un nuevo nombre con su huella y actualizar la referencia en `index.html` para evitar que los visitantes conserven una versión anterior en caché.

## Verificaciones realizadas

Vista y comportamiento a 320, 390, 768, 1024 y 1440 píxeles; navegación móvil; pestañas con teclado; búsqueda; tareas y restablecimiento de demo; detalles de planes; formulario obligatorio y estados de envío; enlaces internos y datos estructurados. El contenido y el formulario siguen disponibles con JavaScript desactivado.
