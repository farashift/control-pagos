# Control de Pagos — MVP (Sprint 1)

Sistema web para que un negocio controle sus **gastos variables** (servicios, proveedores, impuestos SUNAT y préstamos) y deje de pagar moras.
Proyecto del curso **Agile Development — UPAO**, trabajado con Scrum.

**Sistema publicado:** https://farashift.github.io/control-pagos/
**Repositorio:** https://github.com/farashift/control-pagos

## Usuarios de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Asistente (registra y paga) | `asistente` | `asistente123` |
| Gerente (supervisa) | `gerente` | `gerente123` |

La primera vez que se abre, el sistema carga pagos de ejemplo del mes actual y del anterior.
Para empezar desde cero, la asistente usa el botón **Borrar datos** (arriba a la derecha): pide confirmación y deja el sistema vacío.
Para volver a cargarlos, abre https://farashift.github.io/control-pagos/#reiniciar con la sesión de la asistente
(no hay botón en pantalla, para que nadie lo toque por accidente; con la sesión del gerente no hace nada).

## Historias de usuario cumplidas

| ID | Historia | Dónde está en el código |
|----|----------|-------------------------|
| HU-01 | Iniciar sesión | `app.js` → sección *HU-01* · `index.html` → `#vista-login` |
| HU-02 | Registrar un pago pendiente | `app.js` → `validarPago`, `guardarPago` · `index.html` → `#dlg-pago` |
| HU-03 | Ver los pagos del mes | `app.js` → `estadoDe`, `pagosDelMes`, `renderLista` |
| HU-04 | Marcar como pagado con voucher | `app.js` → `abrirVentanaVoucher`, `confirmarVoucher`, `verVoucher` |
| HU-05 | Ver el resumen del mes | `app.js` → `renderResumen` |
| HU-06 | Corregir un pago mal registrado | `app.js` → `eliminarPago`, `volverAPendiente`, edición en `guardarPago` |
| HU-07 | Consultar meses anteriores | `app.js` → `moverMes`, `irAlMesActual` |
| HU-08 | Pagar con Mercado Pago (pago real, Checkout Pro) | `app.js` → `abrirMercadoPago`, `irAMercadoPago`, `procesarRetornoMP` · API: [control-pagos-api](https://github.com/farashift/control-pagos-api) |

Cada historia tiene su propio commit en el historial de Git.

## Estructura

```
index.html   → las pantallas y ventanas (login, resumen, lista, formularios)
styles.css   → el diseño (colores, tarjetas, versión celular)
app.js       → la lógica (validaciones, estados, totales, guardar datos)
```

Los datos se guardan en la nube (Upstash Redis vía la API en Vercel) y una copia en el navegador.

## Cómo abrirlo en tu computadora

Abre `index.html` con doble clic, o en VS Code usa la extensión **Live Server** → *Open with Live Server*.

## Pago con Mercado Pago (HU-08)

El botón **Pagar con Mercado Pago** lleva al checkout real de Mercado Pago (tarjeta, Yape o dinero en cuenta).
Una API pequeña en Vercel ([control-pagos-api](https://github.com/farashift/control-pagos-api), `https://control-pagos-api.vercel.app`)
guarda en secreto el token de Mercado Pago: crea el checkout y, al volver, consulta el pago a Mercado Pago.
Solo si Mercado Pago lo confirma como aprobado y el monto coincide, el pago queda **Pagado** con su N° de operación y comprobante.

## Datos compartidos en la nube

Los pagos se guardan en una base de datos **Upstash Redis** a través de la API en Vercel (`/api/pagos`).
Lo que se registra en un celular aparece en todos los dispositivos en unos 3 segundos (indicador **● En línea** arriba).
Si no hay internet, el sistema sigue funcionando con los datos del navegador y envía los cambios cuando vuelve la conexión.

## Documentos

- [`COSTO_Y_DURACION.md`](COSTO_Y_DURACION.md) — lo que se presenta al cliente: cuánto cuesta y cuánto demora.
- [`GUIA_PRESENTACION.md`](GUIA_PRESENTACION.md) — guion de la demo y explicación del código.
- [`CHECKLIST_DE_PRUEBAS.md`](CHECKLIST_DE_PRUEBAS.md) — prueba de los 36 criterios en el sistema publicado, con capturas.
- [`REVISION_DEL_CLIENTE.md`](REVISION_DEL_CLIENTE.md) — revisión completa como cliente: ajustes pedidos y reglas de cada campo.
- [`jira/`](jira/) — CSV para importar el proyecto Scrum en Jira (épica, 10 historias, 24 subtareas, Sprint 1) y su guía.
