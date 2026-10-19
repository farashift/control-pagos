# Control de Pagos — MVP (Sprint 1)

Sistema web para que un negocio controle sus **gastos variables** (servicios, proveedores, impuestos SUNAT y préstamos) y deje de pagar moras.
Proyecto del curso **Agile Development — UPAO**, trabajado con Scrum.

## Usuarios de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Asistente (registra y paga) | `asistente` | `asistente123` |
| Gerente (supervisa) | `gerente` | `gerente123` |

La primera vez que se abre, el sistema carga pagos de ejemplo del mes actual y del anterior.
Se pueden volver a cargar con el enlace **"Reiniciar datos de demostración"** al pie de la página.

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

Cada historia tiene su propio commit en el historial de Git.

## Estructura

```
index.html   → las pantallas y ventanas (login, resumen, lista, formularios)
styles.css   → el diseño (colores, tarjetas, versión celular)
app.js       → la lógica (validaciones, estados, totales, guardar datos)
```

No necesita servidor ni base de datos: los datos se guardan en el navegador (`localStorage`).

## Cómo abrirlo en tu computadora

Abre `index.html` con doble clic, o en VS Code usa la extensión **Live Server** → *Open with Live Server*.

## Limitación conocida del MVP

Los datos se guardan **en el navegador donde se usa**. El gerente y la asistente ven la misma información
si usan la misma computadora (por ejemplo, cada uno en su pestaña). Para usarlo desde dispositivos distintos
hace falta una base de datos en la nube, que está planificada para el Sprint 2 (ver `COSTO_Y_DURACION.md`).

## Documentos

- [`COSTO_Y_DURACION.md`](COSTO_Y_DURACION.md) — lo que se presenta al cliente: cuánto cuesta y cuánto demora.
- [`GUIA_PRESENTACION.md`](GUIA_PRESENTACION.md) — guion de la demo y explicación del código.
