# Revisión del cliente — Sistema de Control de Pagos

**Rol:** dueño del negocio (cliente), revisando el producto antes de comprarlo.
**Fecha:** 20/10/2026 · **Sistema:** https://farashift.github.io/control-pagos/
**Cómo se revisó:** recorrido completo como asistente y como gerente, en computadora (1366×768) y celular (375×812),
probando cada formulario con datos correctos e incorrectos.

## Veredicto del cliente

> **Lo compraría.** Resuelve mi problema (saber qué pagar, cuándo y cuánto, y tener la evidencia), es simple para la
> asistente y yo veo todo desde mi celular. Antes de comprar pedí 10 ajustes; todos quedaron resueltos y probados.

## Lo que más valoro

| Aspecto | Por qué me convence |
|---|---|
| Resumen del mes | En 5 segundos sé cuánto debo, cuánto pagué y si algo venció |
| Estado automático y "Vence en N días" | Ya no dependo de que alguien se acuerde |
| Voucher obligatorio | Cada pago tiene su evidencia, en foto o PDF |
| Datos en la nube | Lo que registra la asistente lo veo en mi celular al instante |
| Préstamos con cronograma | Sé cuánto debo al banco y cuándo termino de pagar |
| Caja chica con arqueo | Sé si falta plata en la caja y por qué |
| Validaciones | No deja montos, fechas o archivos absurdos |

## Ajustes que pedí y su estado

| # | Lo que encontré | Tipo | Estado |
|---|---|---|---|
| 1 | Si registran dos veces el mismo pago no me entero | Control | ✅ Ahora avisa "¿Registrar un pago repetido?" |
| 2 | Si la luz sale S/ 150 cuando siempre es S/ 100, nadie lo nota | Control | ✅ Avisa al registrar y deja la etiqueta "⚠ +50% vs. promedio" para que yo la revise |
| 3 | No sé quién cambió un monto ni cuándo | Control | ✅ Historial de cada pago (quién, cuándo, valor anterior → nuevo), visible también para mí |
| 4 | Quiero pasarle el mes a mi contador | Función | ✅ Botón "Descargar Excel" con el total del mes |
| 5 | Con el login vacío decía "usuario o contraseña incorrectos" | Mensaje | ✅ Ahora dice "Ingresa tu usuario y contraseña" |
| 6 | No podía ver lo que escribo en la contraseña | Uso | ✅ Botón "Ver / Ocultar" |
| 7 | En Préstamos, "Próxima cuota" salía en rojo aunque no esté vencida | Diseño | ✅ Rojo solo si está vencida |
| 8 | En el celular, la sección Efectivo se salía de la pantalla | Diseño | ✅ Corregido, sin desplazamiento lateral |
| 9 | En el celular, la pestaña "Efectivo" quedaba cortada | Diseño | ✅ Las 4 pestañas visibles |
| 10 | En el celular, los botones de caja ocupaban 3 líneas | Diseño | ✅ Botones a lo ancho, uno por línea |

## Revisión campo por campo

| Formulario | Campo | Regla |
|---|---|---|
| Login | Usuario / contraseña | Obligatorios; solo 2 usuarios; mensaje claro si faltan o son incorrectos |
| Registrar pago | Beneficiario | Obligatorio, mínimo 2 letras, no solo símbolos |
| | Concepto | Obligatorio, mínimo 3 caracteres |
| | Tipo | Servicio, Proveedor o Impuesto (préstamos van en su sección) |
| | Monto | > 0, máximo 2 decimales, hasta S/ 9,999,999.99; acepta 1,850.50 / 150,50 / S/ 150 |
| | Vencimiento | Fecha real, entre 2 años atrás y 5 adelante |
| | (al guardar) | Aviso de pago repetido y de monto inusual |
| Marcar pagado | Fecha de pago | Obligatoria, no futura, no anterior a 2 años |
| | Medio | Agente, App del banco, Efectivo o Tarjeta; en Efectivo, no más de lo que hay en caja |
| | Voucher | Obligatorio; JPG, PNG, WEBP, AVIF, GIF o PDF; rechaza vacío, dañado, HEIC, PDF falso o > 600 KB |
| Préstamo | Entidad / destino | Texto válido |
| | Monto / TEA / cuotas | > 0 · 0–200 % · 1 a 120 |
| | Desembolso / 1ª cuota | Desembolso no futuro; 1ª cuota después y dentro del año |
| Efectivo | Monto / fecha / motivo | > 0 · no futura · motivo obligatorio; un gasto no puede superar la caja |
| Arqueo | Dinero contado | ≥ 0; si no cuadra, la observación es obligatoria |

## Lo que dejaría para el siguiente sprint

- Pagos recurrentes que se creen solos (internet, luz).
- Avisos por WhatsApp o correo antes del vencimiento.
- Confirmar el primer cobro real con Mercado Pago (la integración ya está hecha).
