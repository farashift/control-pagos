# Historias de usuario y criterios de aceptación (actualizado)

**Sistema:** https://farashift.github.io/control-pagos/  
**Usuarios:** `asistente / asistente123` · `gerente / gerente123`

## Resultado: 77 de 78 criterios cumplidos · 1 parcial

| ID | Historia | Usuario | Prioridad | Puntos | Criterios | Estado |
|---|---|---|---|---|---|---|
| HU-01 | Iniciar sesión | Gerente y asistente | Alta | 2 | 5 | ✅ 5/5 |
| HU-02 | Registrar un pago pendiente | Asistente | Alta | 3 | 8 | ✅ 8/8 |
| HU-03 | Ver los pagos del mes | Gerente y asistente | Alta | 3 | 7 | ✅ 7/7 |
| HU-04 | Marcar un pago como pagado con su voucher | Asistente | Alta | 3 | 8 | ✅ 8/8 |
| HU-05 | Ver el resumen del mes | Gerente | Alta | 2 | 5 | ✅ 5/5 |
| HU-06 | Corregir un pago mal registrado | Asistente | Media | 2 | 6 | ✅ 6/6 |
| HU-07 | Consultar meses anteriores | Gerente | Media | 1 | 4 | ✅ 4/4 |
| HU-08 | Pagar con Mercado Pago | Asistente | Media | 5 | 5 | ◐ 4/5 |
| HU-09 | Gestionar préstamos | Asistente (registra) · Gerente (consulta) | Alta | 5 | 9 | ✅ 9/9 |
| HU-10 | Ver el calendario de pagos | Gerente y asistente | Media | 3 | 5 | ✅ 5/5 |
| HU-11 | Datos compartidos entre dispositivos | Gerente y asistente | Alta | 5 | 4 | ✅ 4/4 |
| HU-12 | Controlar el efectivo (caja chica) | Asistente (registra) · Gerente (consulta) | Media | 3 | 5 | ✅ 5/5 |
| HU-13 | Evitar errores y alteraciones en los pagos | Asistente · Gerente | Alta | 3 | 5 | ✅ 5/5 |
| HU-14 | Descargar el reporte del mes | Gerente y asistente | Baja | 1 | 2 | ✅ 2/2 |

## HU-01 · Iniciar sesión

*Como gerente o asistente, quiero entrar al sistema con mi usuario y contraseña, para que solo nosotros dos podamos ver y registrar los pagos.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Existen solo dos usuarios: uno con rol Gerente y otro con rol Asistente. | ✅ Cumple |  |
| 2 | Con usuario y contraseña correctos, el sistema entra a la pantalla principal. | ✅ Cumple |  |
| 3 | Con datos incorrectos muestra "Usuario o contraseña incorrectos" y no deja entrar. | ✅ Cumple |  |
| 4 | Sin iniciar sesión no se puede ver ninguna pantalla del sistema. | ✅ Cumple |  |
| 5 | Hay un botón "Cerrar sesión" visible en todas las pantallas. | ✅ Cumple |  |

## HU-02 · Registrar un pago pendiente

*Como asistente, quiero registrar un pago con el monto, la fecha de vencimiento y a quién se le paga, para no olvidarme de ningún pago.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | El formulario pide beneficiario, concepto, tipo, monto y fecha de vencimiento. | ✅ Cumple |  |
| 2 | El tipo se elige de una lista: Servicio, Proveedor o Impuesto. Los préstamos se registran en su propia sección (HU-09). | ✅ Cumple | Actualizado |
| 3 | Monto positivo, mayor que 0, máximo 2 decimales y hasta S/ 9,999,999.99. Acepta 1,850.50 · 150,50 · S/ 150. | ✅ Cumple |  |
| 4 | Beneficiario (mín. 2 letras) y concepto (mín. 3 caracteres) con texto real: no acepta solo espacios o símbolos. | ✅ Cumple | Nuevo |
| 5 | Vencimiento válido y dentro del rango de 2 años atrás a 5 años adelante; fechas inexistentes se rechazan. | ✅ Cumple | Nuevo |
| 6 | Si un campo falta o es inválido, no se guarda y se muestra qué campo corregir. | ✅ Cumple |  |
| 7 | Al guardar, el pago queda "Pendiente" y aparece en la lista del mes de su vencimiento. | ✅ Cumple |  |
| 8 | Registrar un pago no toma más de 1 pantalla. | ✅ Cumple |  |

## HU-03 · Ver los pagos del mes

*Como gerente o asistente, quiero ver la lista de pagos del mes actual con su estado, para saber qué falta pagar y qué ya se pagó.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Al entrar se muestran por defecto los pagos del mes actual. | ✅ Cumple |  |
| 2 | Cada pago muestra beneficiario, concepto, tipo, monto, vencimiento y estado. | ✅ Cumple |  |
| 3 | Estados Pendiente, Pagado y Vencido, cada uno con un color distinto. | ✅ Cumple |  |
| 4 | Un pago pendiente cuya fecha ya pasó cambia solo a "Vencido". | ✅ Cumple |  |
| 5 | Ordenada por vencimiento: lo más próximo primero. | ✅ Cumple |  |
| 6 | Se puede filtrar por estado. | ✅ Cumple |  |
| 7 | Debajo de cada pago sin pagar se indica cuándo vence: "Vence hoy", "Vence en 3 días", "Venció hace 2 días". | ✅ Cumple | Nuevo |

## HU-04 · Marcar un pago como pagado con su voucher

*Como asistente, quiero marcar un pago como pagado y adjuntar el voucher, para dejar evidencia de que ya se pagó.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Cada pago pendiente o vencido tiene el botón "Marcar como pagado". | ✅ Cumple |  |
| 2 | Se pide fecha de pago, medio (Agente, App del banco, Efectivo o Tarjeta) y el voucher. | ✅ Cumple |  |
| 3 | No se puede marcar como pagado sin voucher. | ✅ Cumple |  |
| 4 | La fecha de pago no puede ser futura ni anterior a 2 años; el medio de pago es obligatorio. | ✅ Cumple | Nuevo |
| 5 | Acepta fotos JPG, PNG, WEBP, AVIF, GIF o PDF; avisa con mensaje claro si el archivo está vacío, dañado, es HEIC, un PDF falso o pesa demasiado. | ✅ Cumple | Nuevo |
| 6 | Las fotos grandes del celular se comprimen solas (menos de 450 KB). | ✅ Cumple | Nuevo |
| 7 | Al confirmar, el estado cambia a "Pagado" y se guarda la fecha de pago. | ✅ Cumple |  |
| 8 | Desde el pago se puede abrir y descargar el voucher. | ✅ Cumple |  |

## HU-05 · Ver el resumen del mes

*Como gerente, quiero ver un resumen de los pagos del mes, para saber de un vistazo cuánto se debe y cuánto ya se pagó.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Muestra total del mes, pagado, pendiente y vencido, en soles. | ✅ Cumple |  |
| 2 | Muestra cuántos pagos hay en cada estado. | ✅ Cumple |  |
| 3 | Si hay vencidos aparece un aviso destacado con la cantidad. | ✅ Cumple |  |
| 4 | Los totales se actualizan en cuanto la asistente registra o marca un pago, también en otro dispositivo. | ✅ Cumple |  |
| 5 | Los totales coinciden con la suma de la lista del mes. | ✅ Cumple |  |

## HU-06 · Corregir un pago mal registrado

*Como asistente, quiero corregir un pago que registré mal, para que la información sea correcta sin tener que empezar de nuevo.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Un pago pendiente se puede editar o eliminar. | ✅ Cumple |  |
| 2 | Antes de eliminar, el sistema pide confirmación. | ✅ Cumple |  |
| 3 | En un pago pagado se puede reemplazar el voucher. | ✅ Cumple |  |
| 4 | Un pago pagado por error vuelve a "Pendiente", con confirmación. | ✅ Cumple |  |
| 5 | Un pago ya pagado se puede editar (monto, concepto) sin perder su voucher. | ✅ Cumple | Nuevo |
| 6 | Las ediciones siguen las mismas validaciones de la HU-02. | ✅ Cumple |  |

## HU-07 · Consultar meses anteriores

*Como gerente, quiero ver los pagos de meses anteriores, para revisar qué se pagó y qué quedó pendiente.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Hay botones para ir al mes anterior y al siguiente. | ✅ Cumple |  |
| 2 | Al cambiar de mes, la lista y el resumen muestran solo ese mes. | ✅ Cumple |  |
| 3 | Mes sin pagos: "No hay pagos registrados en este mes". | ✅ Cumple |  |
| 4 | Siempre se ve el mes y año consultado. | ✅ Cumple |  |

## HU-08 · Pagar con Mercado Pago

*Como asistente, quiero pagar desde el sistema con Mercado Pago, para no tener que ir al banco o a un agente.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Cada pago pendiente o vencido tiene el botón "Pagar con Mercado Pago" (solo la asistente). | ✅ Cumple |  |
| 2 | Antes de ir a pagar se ve a quién y cuánto. | ✅ Cumple |  |
| 3 | El botón lleva al checkout real de Mercado Pago (tarjeta, Yape o dinero en cuenta), con credenciales de producción guardadas en un servidor. | ✅ Cumple |  |
| 4 | Al volver, si Mercado Pago confirma el pago, queda "Pagado" con N° de operación y comprobante. | ◐ Parcial | Programado y probado con respuestas simuladas; falta que Mercado Pago apruebe el primer cobro real (rechazó la tarjeta y Yape de prueba). |
| 5 | Si se cancela o se rechaza, se explica el motivo y el pago sigue pendiente. | ✅ Cumple |  |

## HU-09 · Gestionar préstamos

*Como asistente, quiero registrar cada préstamo con sus condiciones, para que sus cuotas se programen solas y saber cuánto falta pagar.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Se registra entidad, N° de operación (opcional), destino, monto, TEA, N° de cuotas, fecha de desembolso y de la primera cuota. | ✅ Cumple |  |
| 2 | Antes de guardar se ve el cálculo: cuota mensual, total a pagar, intereses y fecha de la última cuota. | ✅ Cumple |  |
| 3 | Al guardar, las cuotas mensuales (sistema francés, cuota fija) se crean solas en los pagos de cada mes. | ✅ Cumple |  |
| 4 | Cada préstamo muestra monto, cuota, saldo pendiente, TEA y TEM, plazo, desembolso, primera y última cuota, día de pago, intereses, total, próxima cuota y avance. | ✅ Cumple |  |
| 5 | Cronograma con N°, vencimiento, cuota, interés, capital, saldo y estado de cada cuota, con totales. | ✅ Cumple |  |
| 6 | Al pagar una cuota desde la lista, el avance y el saldo del préstamo se actualizan. | ✅ Cumple |  |
| 7 | Validaciones: desembolso no futuro, primera cuota después del desembolso y dentro del año, TEA 0–200 %, de 1 a 120 cuotas. | ✅ Cumple |  |
| 8 | Eliminar un préstamo pide confirmación: borra las cuotas pendientes y conserva las pagadas. | ✅ Cumple |  |
| 9 | El gerente solo consulta: no puede registrar ni eliminar préstamos. | ✅ Cumple |  |

## HU-10 · Ver el calendario de pagos

*Como gerente o asistente, quiero ver los pagos en un calendario, para saber qué día vence cada uno.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | El mes se muestra en cuadrícula (lunes a domingo) con su nombre y año, y botones para cambiar de mes. | ✅ Cumple |  |
| 2 | Cada día muestra el total y sus pagos con el color de su estado (en celular, puntos de color). | ✅ Cumple |  |
| 3 | El día de hoy aparece resaltado. | ✅ Cumple |  |
| 4 | Al tocar un día se listan sus pagos con sus botones (pagar, marcar, editar). | ✅ Cumple |  |
| 5 | Lo que se paga desde el calendario cambia de color al instante. | ✅ Cumple |  |

## HU-11 · Datos compartidos entre dispositivos

*Como gerente, quiero ver desde mi celular lo que registra la asistente en la computadora, para estar al tanto sin estar en el negocio.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Lo que se registra, edita o borra en un dispositivo aparece en los demás en pocos segundos, sin recargar. | ✅ Cumple |  |
| 2 | Los datos se guardan en una base de datos en la nube (Upstash Redis vía API en Vercel). | ✅ Cumple |  |
| 3 | Arriba se ve el estado: "En línea" o "Sin conexión". | ✅ Cumple |  |
| 4 | Sin internet el sistema sigue funcionando y envía los cambios cuando vuelve la conexión. | ✅ Cumple |  |

## HU-12 · Controlar el efectivo (caja chica)

*Como asistente, quiero controlar el dinero en efectivo de la caja, para saber cuánto hay y que no se pierda.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | El saldo de caja se calcula solo: ingresos − gastos en efectivo − pagos hechos en "Efectivo". | ✅ Cumple |  |
| 2 | Se registran ingresos y gastos en efectivo con monto, fecha (no futura) y motivo. | ✅ Cumple |  |
| 3 | No deja gastar ni pagar en efectivo más de lo que hay en caja. | ✅ Cumple |  |
| 4 | Arqueo: compara el dinero contado con el sistema, muestra sobrante o faltante y exige el motivo si no cuadra. | ✅ Cumple |  |
| 5 | Movimientos del mes con saldo acumulado; el gerente solo consulta. | ✅ Cumple |  |

## HU-13 · Evitar errores y alteraciones en los pagos

*Como gerente, quiero que el sistema avise de pagos repetidos o montos inusuales y guarde quién cambió cada pago, para que nadie altere los pagos sin que lo note.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | Si se registra un pago igual a otro (mismo beneficiario, monto y vencimiento), pide confirmación. | ✅ Cumple |  |
| 2 | Si el monto se aleja 30% o más del promedio de los últimos 3 pagos al mismo beneficiario (ej. luz S/ 100 → S/ 150), pide confirmación. | ✅ Cumple |  |
| 3 | El pago confirmado queda con la etiqueta "⚠ +50% vs. promedio" visible para el gerente. | ✅ Cumple |  |
| 4 | Cada pago guarda su historial: quién, cuándo y qué cambió (registro, edición con valor anterior y nuevo, pago, voucher, reversión). | ✅ Cumple |  |
| 5 | El gerente puede ver el historial de cualquier pago. | ✅ Cumple |  |

## HU-14 · Descargar el reporte del mes

*Como gerente, quiero descargar los pagos del mes en Excel, para revisarlos o enviarlos al contador.*

| # | Criterio de aceptación | Estado | Nota |
|---|---|---|---|
| 1 | El botón "Descargar Excel" baja los pagos del mes con beneficiario, concepto, tipo, monto, vencimiento, estado, fecha y medio de pago. | ✅ Cumple |  |
| 2 | Incluye las observaciones de monto inusual y el total del mes. | ✅ Cumple |  |

## Product Backlog (sprints futuros)

| ID | Historia | Descripción |
|---|---|---|
| HU-15 | Pagos recurrentes automáticos | Como asistente, quiero que los pagos que se repiten cada mes (como el internet) se creen solos, para no registrarlos cada vez. |
| HU-16 | Avisos por correo o WhatsApp | Como gerente, quiero recibir un aviso cuando un pago esté por vencer o haya vencido, para actuar a tiempo. |
