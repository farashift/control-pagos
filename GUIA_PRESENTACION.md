# Guía para presentar (Sprint Review)

## Antes de empezar (2 minutos antes)

1. Abre el link del sistema en Chrome.
2. Entra como asistente y haz clic en **"Reiniciar datos de demostración"** (al pie). Así arrancas con datos limpios.
3. Ten listo un voucher en el escritorio: una foto o captura de cualquier comprobante (JPG, PNG o PDF).
4. Abre **dos pestañas**: en una entra como `asistente`, en la otra como `gerente`.
   Cada pestaña mantiene su propia sesión, así puedes mostrar que el gerente ve los cambios al instante.

---

## Guion de la demo (historia por historia)

El profe tiene las historias en la mano. Recorre cada una diciendo el criterio y mostrándolo.

### HU-01 · Iniciar sesión
- Cierra sesión. Escribe una contraseña mala → aparece **"Usuario o contraseña incorrectos"** y no entra.
- Entra con `asistente / asistente123` → pantalla principal.
- Muestra que el botón **Cerrar sesión** está siempre arriba a la derecha.
- *"Sin sesión no se ve nada: al cerrar sesión solo queda el login."*

### HU-02 · Registrar un pago pendiente
- Clic en **+ Registrar pago**. Todo está en una sola ventana.
- Deja campos vacíos y pon un monto como `12.345` → **Guardar** → cada campo dice qué corregir y no se guarda.
- Llénalo bien: `Claro` · `Celular de la empresa` · `Servicio` · `59.90` · una fecha de este mes → **Guardar**.
- Aparece en la lista como **Pendiente** y el resumen sube.

### HU-03 · Ver los pagos del mes
- Al entrar se ve el mes actual. Cada fila tiene beneficiario, concepto, tipo, monto, vencimiento y estado.
- Colores: amarillo = Pendiente, verde = Pagado, rojo = Vencido.
- *"Hidrandina vencía el 12 y no se pagó: el sistema lo pasó solo a Vencido."*
- Está ordenado del vencimiento más cercano al más lejano.
- Usa el filtro **Estado** (o haz clic en una tarjeta del resumen) para ver solo los vencidos.

### HU-04 · Marcar como pagado con voucher
- En Hidrandina (vencido) → **Marcar como pagado**.
- Intenta confirmar sin voucher → **"Adjunta el voucher"**: no deja.
- Elige medio de pago (Agente, App del banco, Efectivo o Tarjeta), adjunta tu voucher → **Confirmar pago**.
- Pasa a **Pagado** con su fecha. Clic en **Ver voucher** para abrir la evidencia.

### HU-05 · Ver el resumen del mes (pestaña del gerente)
- Cambia a la pestaña del gerente: ya ve el pago marcado por la asistente.
- Tarjetas: total del mes, pagado, pendiente y vencido, en soles y con cantidad de pagos.
- Si hay vencidos aparece el **aviso rojo** con la cantidad.
- *"Los totales son la suma exacta de la lista del mes."*
- El gerente solo mira: no tiene botones para registrar ni editar.

### HU-06 · Corregir un pago mal registrado (pestaña de la asistente)
- **Editar** un pendiente: cambia el monto → se valida igual que al registrar.
- **Eliminar**: pide confirmación antes de borrar.
- En un pagado: **Cambiar voucher** (si se subió el equivocado) y **Volver a pendiente** (con confirmación).

### HU-07 · Consultar meses anteriores
- **◀ Anterior**: se ve el mes pasado con su propio resumen. Un pago quedó sin pagar ahí.
- **Siguiente ▶** hasta un mes sin pagos → **"No hay pagos registrados en este mes"**.
- Siempre se ve el nombre del mes y el año. **Volver al mes actual** regresa a hoy.

### Cierre: lo que viene
HU-08 (pagar con un botón), HU-09 (pagos que se repiten solos) y HU-10 (avisos) quedan en el Product Backlog.
Luego presenta `COSTO_Y_DURACION.md`: **MVP en 1 semana por S/ 2,400.**

---

## Cómo funciona el código (explicado simple)

El sistema son 3 archivos, como una casa:

| Archivo | Es como… | Qué tiene |
|---|---|---|
| `index.html` | los ladrillos | Las pantallas: login, resumen, lista y las ventanas (formularios). |
| `styles.css` | la pintura | Colores, tamaños, tarjetas y cómo se ve en el celular. |
| `app.js` | la electricidad | Lo que pasa al hacer clic: validar, guardar, calcular totales. |

### ¿Dónde se guardan los datos?
En el **localStorage** del navegador: una pequeña memoria que tiene cada navegador y que no se borra al cerrarlo.
Los pagos se guardan como una lista de texto (JSON). Las funciones `leerPagos()` y `guardarPagos()` son las únicas que tocan esa memoria.

Cada pago se ve así:
```js
{
  id: "lq3k9a1x",            // código único
  beneficiario: "Hidrandina",
  concepto: "Luz del local",
  tipo: "Servicio",
  monto: 245.60,
  vencimiento: "2026-10-12",
  pagado: true,
  fechaPago: "2026-10-19",   // solo si está pagado
  medio: "Agente",           // solo si está pagado
  voucher: { nombre, tipo, datos } // la imagen o PDF convertida en texto
}
```

### Las 5 ideas clave de `app.js`

1. **El estado no se guarda, se calcula** (`estadoDe`). Si está pagado → *Pagado*. Si no, y la fecha ya pasó → *Vencido*. Si no → *Pendiente*.
   Por eso un pago pasa a Vencido solo, sin que nadie haga nada.

2. **Todo se redibuja con `render()`.** Cada vez que algo cambia (registrar, pagar, cambiar de mes), se llama a `render()`,
   que vuelve a dibujar el resumen (`renderResumen`) y la lista (`renderLista`). Por eso los totales siempre coinciden con la lista.

3. **Validar antes de guardar** (`validarPago`). Revisa cada campo y arma una lista de errores.
   Si hay errores, los muestra debajo de cada campo y no guarda. El monto se revisa con una regla
   (`/^\d+(\.\d{1,2})?$/`) que significa: *solo números, y como máximo 2 decimales*.

4. **Los montos se suman en céntimos** (`Math.round(monto * 100)`). Las computadoras suman mal algunos decimales
   (0.1 + 0.2 = 0.30000000000000004), así que se suma en céntimos enteros y al final se divide entre 100.

5. **Los roles esconden botones.** Al iniciar sesión se marca la página con el rol (`data-rol="gerente"`).
   El CSS oculta todo lo que tiene la clase `solo-asistente` cuando el rol no es asistente,
   y `accionesDe()` solo pone los botones de pagar/editar si quien mira es la asistente.

### Preguntas que puede hacer el profe

- **¿Es seguro el login?** Para el MVP las cuentas están en el código, porque son solo 2 usuarios fijos.
  En el Sprint 2, con la base de datos en la nube, el login pasa al servidor con contraseñas cifradas.
- **¿Si el gerente lo abre en su celular ve lo mismo?** Todavía no: en el MVP los datos viven en el navegador donde se usa.
  Eso es justamente la Etapa 2 (base de datos en la nube).
- **¿Por qué no está el botón de pagar?** Porque necesita conectarse al banco y usted mismo dijo que complicaba el MVP. Está en el backlog como HU-08.
- **¿Qué pasa si suben un voucher muy pesado?** Las fotos se achican automáticamente antes de guardarse. Los PDF tienen un límite de 1.5 MB.
- **¿Cómo trabajaron con Scrum?** Un sprint de 1 semana, 7 historias priorizadas por el cliente; cada historia tiene su commit en GitHub.
