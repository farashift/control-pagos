# Verificación de criterios de aceptación — Sprint 1

Sistema: https://santiag0507.github.io/prestamos/
Usuarios: `asistente / asistente123` · `gerente / gerente123`

Cada criterio del documento de historias de usuario, cómo mostrarlo en la demo y su estado.
Todos se probaron en el sistema publicado el 19/10/2026.

## HU-01 · Iniciar sesión

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Existen solo dos usuarios: Gerente y Asistente | Entrar con cada uno; arriba dice *Sesión: Gerente / Asistente* | ✅ |
| 2 | Con datos correctos entra a la pantalla principal | `asistente / asistente123` → Ingresar | ✅ |
| 3 | Con datos incorrectos muestra "Usuario o contraseña incorrectos" y no deja entrar | Escribir una contraseña mala | ✅ |
| 4 | Sin iniciar sesión no se puede ver ninguna pantalla | Cerrar sesión: solo queda el login | ✅ |
| 5 | Botón "Cerrar sesión" visible en todas las pantallas | Barra superior fija, también en celular | ✅ |

## HU-02 · Registrar un pago pendiente

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Pide beneficiario, concepto, tipo, monto y fecha de vencimiento | **+ Registrar pago** | ✅ |
| 2 | Tipo de pago de una lista: Servicio, Proveedor, Impuesto o Préstamo | Desplegable *Tipo de pago* | ✅ |
| 3 | Monto positivo, mayor que 0, máximo 2 decimales, en soles | Probar `0`, `-5`, `12.345` → rechazados; `150.50` → aceptado | ✅ |
| 4 | Si falta un campo o el monto es inválido, no guarda y dice qué corregir | Guardar vacío → mensaje rojo debajo de cada campo | ✅ |
| 5 | Al guardar queda "Pendiente" y aparece en el mes de su vencimiento | Registrar con fecha del próximo mes → la pantalla salta a ese mes | ✅ |
| 6 | Registrar no toma más de 1 pantalla | Todo en una sola ventana | ✅ |

## HU-03 · Ver los pagos del mes

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Al entrar se muestran los pagos del mes actual | Al iniciar sesión siempre abre en el mes actual, sin filtros | ✅ |
| 2 | Cada pago muestra beneficiario, concepto, tipo, monto, vencimiento y estado | Columnas de la tabla | ✅ |
| 3 | Estados Pendiente, Pagado y Vencido, cada uno con color distinto | Amarillo, verde y rojo | ✅ |
| 4 | Un pendiente con fecha pasada cambia solo a "Vencido" | Hidrandina vencía el 12 → aparece *Vencido* sin que nadie lo cambie | ✅ |
| 5 | Ordenada por vencimiento, lo más próximo primero | Fechas de arriba hacia abajo | ✅ |
| 6 | Se puede filtrar por estado | Selector *Estado* (o clic en una tarjeta del resumen) | ✅ |

## HU-04 · Marcar un pago como pagado con su voucher

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Cada pago pendiente o vencido tiene el botón "Marcar como pagado" | Botón verde en cada fila (sesión de la asistente, que es quien paga) | ✅ |
| 2 | Pide fecha de pago, medio (Agente, App del banco, Efectivo o Tarjeta) y voucher (imagen o PDF) | Ventana *Marcar como pagado* | ✅ |
| 3 | No se puede marcar como pagado sin voucher | Confirmar sin archivo → "Adjunta el voucher" | ✅ |
| 4 | Al confirmar cambia a "Pagado" y guarda la fecha de pago | La fila dice *Pagado el dd/mm/aaaa · medio* | ✅ |
| 5 | Desde el pago se puede abrir y ver el voucher | **Ver voucher** (foto o PDF, con opción de descargar) | ✅ |

## HU-05 · Ver el resumen del mes

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Total a pagar, total pagado, pendiente y vencido, en soles | Las 4 tarjetas de arriba | ✅ |
| 2 | Cuántos pagos hay en cada estado | Debajo de cada monto: *N pagos* | ✅ |
| 3 | Aviso destacado con la cantidad si hay vencidos | Franja roja: *Hay 1 pago vencido por S/ …* | ✅ |
| 4 | Los totales se actualizan en cuanto la asistente registra o marca un pago | Pestaña del gerente abierta al lado: cambia sola al instante | ✅ |
| 5 | Los totales coinciden con la suma de la lista del mes | Sumar la columna Monto = *Total a pagar en el mes* | ✅ |

## HU-06 · Corregir un pago mal registrado

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Un pago pendiente se puede editar (monto, fecha, beneficiario, concepto, tipo) o eliminar | Enlaces **Editar** y **Eliminar** | ✅ |
| 2 | Antes de eliminar pide confirmación | Ventana *¿Eliminar este pago?* | ✅ |
| 3 | En un pagado se puede reemplazar el voucher | **Cambiar voucher** | ✅ |
| 4 | Un pagado por error vuelve a "Pendiente", con confirmación | **Volver a pendiente** → confirmar | ✅ |
| 5 | Las ediciones siguen las validaciones de la HU-02 | Editar con monto `0` → mismo mensaje de error | ✅ |

## HU-07 · Consultar meses anteriores

| # | Criterio | Cómo se muestra | Estado |
|---|----------|-----------------|--------|
| 1 | Botones para ir al mes anterior y al siguiente | **◀ Anterior** y **Siguiente ▶** | ✅ |
| 2 | Al cambiar de mes, lista y resumen muestran solo ese mes | Septiembre tiene sus propios pagos y totales | ✅ |
| 3 | Mes sin pagos: "No hay pagos registrados en este mes" | Ir a diciembre | ✅ |
| 4 | Siempre se ve el mes y año consultado (ej. Octubre 2026) | Título central | ✅ |

**Resultado: 36 de 36 criterios cumplidos.**
