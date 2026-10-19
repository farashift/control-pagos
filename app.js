/*
 * Control de Pagos — MVP (Sprint 1)
 * Todo corre en el navegador. Los datos se guardan en localStorage,
 * así que no hace falta servidor ni base de datos para la demo.
 */

// ================== DATOS Y ALMACENAMIENTO ==================

// HU-01: solo existen dos usuarios, uno por rol
const USUARIOS = [
  { usuario: 'gerente',   clave: 'gerente123',   nombre: 'Gerente',   rol: 'gerente' },
  { usuario: 'asistente', clave: 'asistente123', nombre: 'Asistente', rol: 'asistente' },
];

const CLAVE_PAGOS = 'cp_pagos';
const CLAVE_SESION = 'cp_sesion';

function leerPagos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PAGOS)) || [];
  } catch {
    return [];
  }
}

function guardarPagos(pagos) {
  try {
    localStorage.setItem(CLAVE_PAGOS, JSON.stringify(pagos));
    return true;
  } catch {
    alert('No hay espacio para guardar. Prueba con un voucher más liviano.');
    return false;
  }
}

// ================== UTILIDADES ==================

const $ = (selector) => document.querySelector(selector);

const hoy = new Date();

// Mes que se está mirando en pantalla (por defecto, el actual) y filtro de estado
const vista = { anio: hoy.getFullYear(), mes: hoy.getMonth(), filtro: 'todos' };

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// 1850.5 -> "S/ 1,850.50"
function soles(monto) {
  return 'S/ ' + monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Fecha de hoy como texto "2026-10-19" (mismo formato que los <input type="date">)
function hoyISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// "2026-10-19" -> "19/10/2026"
function fechaCorta(iso) {
  const [anio, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${anio}`;
}

// Evita que un texto escrito por el usuario se interprete como HTML
function seguro(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function buscarPago(id) {
  return leerPagos().find((p) => p.id === id);
}

function nuevoId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Muestra el mensaje de error debajo de cada campo y marca el campo en rojo
function mostrarErrores(form, errores) {
  form.querySelectorAll('.campo-error').forEach((el) => {
    el.textContent = errores[el.dataset.para] || '';
  });
  form.querySelectorAll('[name]').forEach((campo) => {
    campo.classList.toggle('invalido', !!errores[campo.name]);
  });
  const primero = Object.keys(errores)[0];
  if (primero) form.elements[primero].focus();
}

function aviso(mensaje) {
  const caja = $('#aviso');
  caja.textContent = mensaje;
  caja.hidden = false;
  clearTimeout(aviso.temporizador);
  aviso.temporizador = setTimeout(() => (caja.hidden = true), 2500);
}

// ================== HU-01: INICIAR SESIÓN ==================

function usuarioActual() {
  const usuario = sessionStorage.getItem(CLAVE_SESION);
  return USUARIOS.find((u) => u.usuario === usuario) || null;
}

function iniciarSesion(evento) {
  evento.preventDefault();
  const usuario = $('#login-usuario').value.trim().toLowerCase();
  const clave = $('#login-clave').value;
  const encontrado = USUARIOS.find((u) => u.usuario === usuario && u.clave === clave);

  if (!encontrado) {
    $('#login-error').hidden = false;
    return;
  }
  sessionStorage.setItem(CLAVE_SESION, encontrado.usuario);
  $('#form-login').reset();
  $('#login-error').hidden = true;
  mostrarPantalla();
}

function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
  document.querySelectorAll('dialog[open]').forEach((d) => d.close());
  mostrarPantalla();
}

// Decide qué se ve: sin sesión, solo el login; con sesión, el sistema
function mostrarPantalla() {
  const usuario = usuarioActual();
  $('#vista-login').hidden = !!usuario;
  $('#vista-app').hidden = !usuario;
  if (!usuario) return;

  document.body.dataset.rol = usuario.rol;
  $('#usuario-actual').textContent = usuario.nombre;
  render();
}

// Vuelve a dibujar la pantalla principal con los datos actuales
function render() {
  $('#mes-titulo').textContent = `${MESES[vista.mes]} ${vista.anio}`;
  $('#filtro-estado').value = vista.filtro;
  renderResumen();
  renderLista();
}

// ================== HU-02: REGISTRAR UN PAGO PENDIENTE ==================

const TIPOS = ['Servicio', 'Proveedor', 'Impuesto', 'Préstamo'];

// Sin "pago" abre el formulario vacío; con "pago" lo abre lleno para corregirlo (HU-06)
function abrirFormularioPago(pago) {
  const form = $('#form-pago');
  form.reset();
  mostrarErrores(form, {});
  form.dataset.id = pago ? pago.id : '';
  $('#pago-titulo').textContent = pago ? 'Corregir pago' : 'Registrar pago';
  if (pago) {
    for (const campo of ['beneficiario', 'concepto', 'tipo', 'vencimiento']) {
      form.elements[campo].value = pago[campo];
    }
    form.elements.monto.value = pago.monto.toFixed(2);
  }
  $('#dlg-pago').showModal();
  form.elements.beneficiario.focus();
}

// Revisa los datos del formulario. Devuelve los datos limpios y los errores encontrados.
function validarPago(form) {
  const campos = form.elements;
  const datos = {
    beneficiario: campos.beneficiario.value.trim(),
    concepto: campos.concepto.value.trim(),
    tipo: campos.tipo.value,
    monto: campos.monto.value.trim().replace(',', '.'),
    vencimiento: campos.vencimiento.value,
  };
  const errores = {};

  if (!datos.beneficiario) errores.beneficiario = 'Indica a quién se le paga.';
  if (!datos.concepto) errores.concepto = 'Indica el concepto del pago.';
  if (!TIPOS.includes(datos.tipo)) errores.tipo = 'Elige el tipo de pago.';

  // Monto: número positivo, mayor que 0, con máximo 2 decimales (ej. 150.50)
  if (!datos.monto) {
    errores.monto = 'Ingresa el monto.';
  } else if (!/^\d+(\.\d{1,2})?$/.test(datos.monto) || Number(datos.monto) <= 0) {
    errores.monto = 'El monto debe ser mayor que 0 y con máximo 2 decimales (ej. 150.50).';
  }

  if (!datos.vencimiento) errores.vencimiento = 'Elige la fecha de vencimiento.';

  datos.monto = Number(datos.monto);
  return { datos, errores };
}

function guardarPago(evento) {
  evento.preventDefault();
  const form = evento.target;
  const { datos, errores } = validarPago(form);
  mostrarErrores(form, errores);
  if (Object.keys(errores).length) return; // no se guarda si hay algo que corregir

  const pagos = leerPagos();
  const editando = form.dataset.id;
  if (editando) {
    Object.assign(pagos.find((p) => p.id === editando), datos); // HU-06: corrige el mismo pago
  } else {
    pagos.push({ id: nuevoId(), ...datos, pagado: false }); // nace como "Pendiente"
  }
  if (!guardarPagos(pagos)) return;

  // Se muestra el mes de su fecha de vencimiento, para que se vea en la lista
  const [anio, mes] = datos.vencimiento.split('-').map(Number);
  vista.anio = anio;
  vista.mes = mes - 1;

  $('#dlg-pago').close();
  render();
  aviso(editando ? 'Pago corregido' : 'Pago registrado como Pendiente');
}

// ================== HU-03: VER LOS PAGOS DEL MES ==================

// El estado se calcula cada vez: si no está pagado y la fecha ya pasó, es "Vencido"
function estadoDe(pago) {
  if (pago.pagado) return 'Pagado';
  return pago.vencimiento < hoyISO() ? 'Vencido' : 'Pendiente';
}

// Pagos cuyo vencimiento cae en el mes que se está viendo, del más próximo al más lejano
function pagosDelMes() {
  const prefijo = `${vista.anio}-${String(vista.mes + 1).padStart(2, '0')}`;
  return leerPagos()
    .filter((p) => p.vencimiento.startsWith(prefijo))
    .sort((a, b) => a.vencimiento.localeCompare(b.vencimiento));
}

function renderLista() {
  const delMes = pagosDelMes();
  const visibles = vista.filtro === 'todos'
    ? delMes
    : delMes.filter((p) => estadoDe(p) === vista.filtro);

  $('#tabla-pagos tbody').innerHTML = visibles.map(filaPago).join('');
  $('#tabla-pagos').hidden = visibles.length === 0;

  const vacio = $('#lista-vacia');
  vacio.hidden = visibles.length > 0;
  vacio.textContent = delMes.length
    ? `No hay pagos en estado "${vista.filtro}" en este mes`
    : 'No hay pagos registrados en este mes';
}

function filaPago(pago) {
  const estado = estadoDe(pago);
  const detalle = pago.pagado
    ? `<small class="detalle">Pagado el ${fechaCorta(pago.fechaPago)} · ${seguro(pago.medio)}</small>`
    : '';
  return `
    <tr>
      <td data-etiqueta="Beneficiario"><strong>${seguro(pago.beneficiario)}</strong></td>
      <td data-etiqueta="Concepto">${seguro(pago.concepto)}</td>
      <td data-etiqueta="Tipo">${seguro(pago.tipo)}</td>
      <td data-etiqueta="Monto" class="num">${soles(pago.monto)}</td>
      <td data-etiqueta="Vencimiento">${fechaCorta(pago.vencimiento)}</td>
      <td data-etiqueta="Estado"><div><span class="estado ${estado.toLowerCase()}">${estado}</span>${detalle}</div></td>
      <td class="acciones">${accionesDe(pago, estado)}</td>
    </tr>`;
}

// Botones de cada fila según el estado y el rol de quien mira
function accionesDe(pago, estado) {
  const esAsistente = usuarioActual().rol === 'asistente';
  const botones = [];

  if (estado === 'Pagado') {
    botones.push(boton('ver', pago.id, 'Ver voucher'));
    if (esAsistente) {
      botones.push(boton('cambiarVoucher', pago.id, 'Cambiar voucher', 'enlace'));
      botones.push(boton('revertir', pago.id, 'Volver a pendiente', 'enlace rojo'));
    }
  } else if (esAsistente) {
    botones.push(boton('pagar', pago.id, 'Marcar como pagado', 'ok'));
    botones.push(boton('editar', pago.id, 'Editar', 'enlace'));
    botones.push(boton('eliminar', pago.id, 'Eliminar', 'enlace rojo'));
  }
  return botones.join('');
}

function boton(accion, id, texto, estilo = '') {
  return `<button class="btn chico ${estilo}" data-accion="${accion}" data-id="${id}">${texto}</button>`;
}

// Un solo "escuchador" para todos los botones de la tabla
function clickEnTabla(evento) {
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) return;
  const { accion, id } = boton.dataset;
  if (ACCIONES[accion]) ACCIONES[accion](id);
}

// ================== HU-04: MARCAR COMO PAGADO CON VOUCHER ==================

// La misma ventana sirve para "marcar como pagado" y, en HU-06, para "reemplazar voucher"
function abrirVentanaVoucher(id, modo) {
  const pago = buscarPago(id);
  const form = $('#form-voucher');
  form.reset();
  mostrarErrores(form, {});
  form.dataset.id = id;
  form.dataset.modo = modo;

  const marcando = modo === 'pagar';
  $('#voucher-titulo').textContent = marcando ? 'Marcar como pagado' : 'Reemplazar voucher';
  $('#voucher-confirmar').textContent = marcando ? 'Confirmar pago' : 'Guardar nuevo voucher';
  $('#campos-pago').hidden = !marcando;
  $('#voucher-detalle').textContent = `${pago.beneficiario} · ${pago.concepto} · ${soles(pago.monto)}`;
  form.elements.fechaPago.value = hoyISO();
  form.elements.fechaPago.max = hoyISO();

  $('#dlg-voucher').showModal();
}

async function confirmarVoucher(evento) {
  evento.preventDefault();
  const form = evento.target;
  const campos = form.elements;
  const marcando = form.dataset.modo === 'pagar';
  const archivo = campos.archivo.files[0];
  const errores = {};

  if (marcando) {
    if (!campos.fechaPago.value) errores.fechaPago = 'Indica la fecha de pago.';
    else if (campos.fechaPago.value > hoyISO()) errores.fechaPago = 'La fecha de pago no puede ser futura.';
    if (!campos.medio.value) errores.medio = 'Elige el medio de pago.';
  }
  // Sin voucher no se puede marcar como pagado
  if (!archivo) errores.archivo = 'Adjunta el voucher (foto o PDF).';
  else if (!archivo.type.startsWith('image/') && archivo.type !== 'application/pdf') {
    errores.archivo = 'El voucher debe ser una imagen o un PDF.';
  }

  mostrarErrores(form, errores);
  if (Object.keys(errores).length) return;

  let voucher;
  try {
    voucher = await leerVoucher(archivo);
  } catch (error) {
    mostrarErrores(form, { archivo: error.message });
    return;
  }

  const pagos = leerPagos();
  const pago = pagos.find((p) => p.id === form.dataset.id);
  if (marcando) {
    pago.pagado = true;
    pago.fechaPago = campos.fechaPago.value;
    pago.medio = campos.medio.value;
  }
  pago.voucher = voucher;
  if (!guardarPagos(pagos)) return;

  $('#dlg-voucher').close();
  render();
  aviso(marcando ? 'Pago marcado como Pagado' : 'Voucher reemplazado');
}

// Convierte el archivo en texto (data URL) para poder guardarlo.
// Las fotos se achican para que no llenen la memoria del navegador.
async function leerVoucher(archivo) {
  if (archivo.type === 'application/pdf') {
    if (archivo.size > 1.5 * 1024 * 1024) {
      throw new Error('El PDF pesa más de 1.5 MB. Sube una foto del voucher o un PDF más liviano.');
    }
    return { nombre: archivo.name, tipo: archivo.type, datos: await leerComoDataURL(archivo) };
  }

  const imagen = await cargarImagen(await leerComoDataURL(archivo));
  const escala = Math.min(1, 1400 / Math.max(imagen.width, imagen.height));
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.round(imagen.width * escala);
  lienzo.height = Math.round(imagen.height * escala);
  const ctx = lienzo.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, lienzo.width, lienzo.height);
  ctx.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
  return { nombre: archivo.name, tipo: 'image/jpeg', datos: lienzo.toDataURL('image/jpeg', 0.75) };
}

function leerComoDataURL(archivo) {
  return new Promise((resolver, fallar) => {
    const lector = new FileReader();
    lector.onload = () => resolver(lector.result);
    lector.onerror = () => fallar(new Error('No se pudo leer el archivo.'));
    lector.readAsDataURL(archivo);
  });
}

function cargarImagen(src) {
  return new Promise((resolver, fallar) => {
    const imagen = new Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = () => fallar(new Error('No se pudo abrir la imagen. Prueba con JPG, PNG o PDF.'));
    imagen.src = src;
  });
}

let urlTemporal = null;

async function verVoucher(id) {
  const pago = buscarPago(id);
  if (!pago || !pago.voucher) return;

  $('#ver-titulo').textContent = `Voucher — ${pago.beneficiario}`;
  $('#ver-detalle').textContent =
    `${pago.concepto} · ${soles(pago.monto)} · Pagado el ${fechaCorta(pago.fechaPago)} por ${pago.medio}`;
  $('#ver-descargar').href = pago.voucher.datos;
  $('#ver-descargar').download = pago.voucher.nombre;

  const contenido = $('#ver-contenido');
  if (pago.voucher.tipo === 'application/pdf') {
    const archivo = await (await fetch(pago.voucher.datos)).blob();
    urlTemporal = URL.createObjectURL(archivo);
    contenido.innerHTML = `<iframe src="${urlTemporal}" title="Voucher en PDF"></iframe>`;
  } else {
    contenido.innerHTML = `<img src="${pago.voucher.datos}" alt="Voucher del pago">`;
  }
  $('#dlg-ver').showModal();
}

function cerrarVoucher() {
  $('#ver-contenido').innerHTML = '';
  if (urlTemporal) URL.revokeObjectURL(urlTemporal);
  urlTemporal = null;
}

// ================== HU-06: CORREGIR UN PAGO MAL REGISTRADO ==================

// Ventana de confirmación. Devuelve true si la persona elige el botón rojo.
function confirmar(titulo, mensaje, textoBoton) {
  const dialogo = $('#dlg-confirmar');
  $('#confirmar-titulo').textContent = titulo;
  $('#confirmar-mensaje').textContent = mensaje;
  $('#confirmar-si').textContent = textoBoton;
  dialogo.returnValue = '';
  dialogo.showModal();
  return new Promise((resolver) => {
    dialogo.addEventListener('close', () => resolver(dialogo.returnValue === 'si'), { once: true });
  });
}

async function eliminarPago(id) {
  const pago = buscarPago(id);
  const ok = await confirmar(
    '¿Eliminar este pago?',
    `${pago.beneficiario} · ${pago.concepto} · ${soles(pago.monto)}. Esta acción no se puede deshacer.`,
    'Sí, eliminar',
  );
  if (!ok) return;
  guardarPagos(leerPagos().filter((p) => p.id !== id));
  render();
  aviso('Pago eliminado');
}

async function volverAPendiente(id) {
  const pago = buscarPago(id);
  const ok = await confirmar(
    '¿Volver este pago a Pendiente?',
    `${pago.beneficiario} · ${soles(pago.monto)}. Se quitará la fecha de pago, el medio y el voucher adjunto.`,
    'Sí, volver a pendiente',
  );
  if (!ok) return;
  const pagos = leerPagos();
  const elegido = pagos.find((p) => p.id === id);
  elegido.pagado = false;
  delete elegido.fechaPago;
  delete elegido.medio;
  delete elegido.voucher;
  guardarPagos(pagos);
  render();
  aviso('El pago volvió a Pendiente');
}

// Qué hace cada botón de la tabla
const ACCIONES = {
  pagar: (id) => abrirVentanaVoucher(id, 'pagar'),
  ver: verVoucher,
  editar: (id) => abrirFormularioPago(buscarPago(id)),
  eliminar: eliminarPago,
  cambiarVoucher: (id) => abrirVentanaVoucher(id, 'reemplazar'),
  revertir: volverAPendiente,
};

function cambiarFiltro(evento) {
  vista.filtro = evento.target.value;
  render();
}

// ================== HU-05: VER EL RESUMEN DEL MES ==================

// Suma los mismos pagos que muestra la lista del mes, así los totales siempre coinciden
function renderResumen() {
  const totales = {
    todos:     { centimos: 0, cantidad: 0 },
    Pagado:    { centimos: 0, cantidad: 0 },
    Pendiente: { centimos: 0, cantidad: 0 },
    Vencido:   { centimos: 0, cantidad: 0 },
  };
  pagosDelMes().forEach((pago) => {
    const centimos = Math.round(pago.monto * 100); // en céntimos para no perder decimales
    for (const grupo of ['todos', estadoDe(pago)]) {
      totales[grupo].centimos += centimos;
      totales[grupo].cantidad += 1;
    }
  });

  const tarjetas = [
    ['todos', 'Total a pagar en el mes', 'total'],
    ['Pagado', 'Pagado', 'pagado'],
    ['Pendiente', 'Pendiente', 'pendiente'],
    ['Vencido', 'Vencido', 'vencido'],
  ];
  $('#resumen-tarjetas').innerHTML = tarjetas.map(([grupo, titulo, clase]) => {
    const { centimos, cantidad } = totales[grupo];
    const activo = vista.filtro === grupo ? 'activo' : '';
    return `
      <button class="kpi ${clase} ${activo}" data-filtro="${grupo}" title="Ver solo estos pagos">
        <span>${titulo}</span>
        <strong>${soles(centimos / 100)}</strong>
        <small>${cantidad} ${cantidad === 1 ? 'pago' : 'pagos'}</small>
      </button>`;
  }).join('');

  // Aviso destacado si hay pagos vencidos
  const vencidos = totales.Vencido;
  const alerta = $('#alerta-vencidos');
  alerta.hidden = vencidos.cantidad === 0;
  alerta.textContent = vencidos.cantidad === 1
    ? `⚠ Hay 1 pago vencido por ${soles(vencidos.centimos / 100)}. Págalo cuanto antes para evitar moras.`
    : `⚠ Hay ${vencidos.cantidad} pagos vencidos por ${soles(vencidos.centimos / 100)}. Págalos cuanto antes para evitar moras.`;
}

// Al tocar una tarjeta del resumen, la lista se filtra por ese estado
function clickEnResumen(evento) {
  const tarjeta = evento.target.closest('[data-filtro]');
  if (!tarjeta) return;
  vista.filtro = tarjeta.dataset.filtro;
  render();
}

// ================== ARRANQUE ==================

$('#form-login').addEventListener('submit', iniciarSesion);
$('#btn-salir').addEventListener('click', cerrarSesion);
$('#btn-nuevo').addEventListener('click', () => abrirFormularioPago());
$('#form-pago').addEventListener('submit', guardarPago);
$('#filtro-estado').addEventListener('change', cambiarFiltro);
$('#tabla-pagos').addEventListener('click', clickEnTabla);
$('#form-voucher').addEventListener('submit', confirmarVoucher);
$('#dlg-ver').addEventListener('close', cerrarVoucher);
$('#resumen-tarjetas').addEventListener('click', clickEnResumen);

// Si la asistente registra algo en otra pestaña, esta pantalla se actualiza sola
// (la sesión se guarda por pestaña, así se puede tener al gerente y a la asistente abiertos a la vez)
window.addEventListener('storage', () => {
  if (usuarioActual()) render();
});

// Botones "Cancelar" de cualquier ventana
document.querySelectorAll('[data-cerrar]').forEach((boton) => {
  boton.addEventListener('click', () => boton.closest('dialog').close());
});

mostrarPantalla();
