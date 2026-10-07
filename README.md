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
- Recorrido visual de cuatro áreas del núcleo, con pestañas accesibles y funciones ampliables: activos, mantenimiento, compras y reportes.
- Complementos destacados con vistas ilustrativas: Panel en Vivo, Ama de Llaves y lecturas de Seguridad y Operaciones.
- Sección de API e integraciones con alcance de lectura, webhooks y conexiones a medida.
- Planes Esencial / Profesional / Empresarial; núcleo incluido y complementos separados.
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

## Contenido verificado — 2026-10-06

Fuente comercial: `docs/PAQUETES_COMERCIALES.md` de la aplicación (revisión 2026-09-22). Funciones contrastadas con documentos de módulos, especificaciones, bitácora, código y commits de main. La aplicación publicada identificó la revisión `095916e7854f86528fd1bfe277d04c7f382a6aec`, coincidente con main remoto.

Seguridad y Operaciones se ofrece con el alcance de lecturas manuales, activación por empresa y contratación independiente; este complemento todavía no está incorporado a la tabla del documento comercial. Panel en Vivo se presenta como complemento independiente. No se anuncian rondas, bitácoras operativas, la maqueta de asignaciones, un enlace automático de sensores a medidores de mantenimiento, una app de tienda ni una integración contable lista para usar. Las cifras de la demo siguen siendo ilustrativas.

Se corrigieron también los metadatos, preguntas frecuentes, imagen al compartir y opciones del formulario. El formulario conserva la solicitud de contacto por WhatsApp y el destinatario existente.

## Refinamiento visual y comercial — 2026-10-06

Se retiraron las aclaraciones de pago en bolívares y de implantación del contenido público y de las preguntas frecuentes estructuradas. La política comercial de la landing se define por las instrucciones del propietario; no modifica la aplicación.

Las vistas de módulos y complementos son ilustrativas, con datos de ejemplo. Los cuatro módulos se muestran completos sin JavaScript; con JavaScript ofrecen selección mediante clic, flechas, Inicio/Fin y enlaces directos. Las funciones detalladas permanecen disponibles en desplegables.

La API de lectura y los webhooks están incluidos en los planes; conectores, configuración e integraciones específicas se cotizan por alcance. No se anuncian conectores de marcas no verificados. Cada complemento y la sección de integraciones preseleccionan el interés en el formulario, además de conservar el origen de la solicitud.

## Formulario de contacto — 2026-10-07

Nueva presentación con datos esenciales destacados, información opcional desplegable y contexto del contacto. Las solicitudes desde planes, complementos e integraciones conservan y muestran su selección. Validación en español junto a cada campo, navegación con teclado, estados de envío visibles y recuperación ante errores sin borrar lo escrito. Sin JavaScript, los campos opcionales se muestran abiertos y se conserva el envío nativo a FormSubmit.

Se realizó una única solicitud real con datos ficticios autorizada por el propietario: FormSubmit respondió correctamente y se confirmó la recepción en la bandeja de entrada, con teléfono y enlace de contacto. Los escenarios posteriores del rediseño se verifican con respuestas simuladas para no generar más correos. El sistema continúa enviando solicitudes por correo; no inicia mensajes de WhatsApp automáticamente.

## Navegación, planes y conexiones — 2026-10-07

Por indicación del propietario, ningún plan muestra precios, incluido Esencial. Tampoco se publican importes ni porcentajes de complementos o extras. Se conservan capacidades, diferencias entre planes y el alcance de los complementos.

Los enlaces internos desplazan al destino sin añadir fragmentos a la URL. Se preservan la ruta y los parámetros de consulta. Los enlaces antiguos con fragmento siguen llevando a su sección y después limpian la dirección. Las pestañas de módulos, el foco de teclado y las solicitudes de contacto siguen funcionando; sin JavaScript se conservan los enlaces nativos.

El mapa de integraciones muestra una fuente ASSET y tres destinos con flechas alineadas. En móvil se organiza verticalmente. Los destinos son posibilidades mediante conexiones a medida, no conectores ya incluidos.
