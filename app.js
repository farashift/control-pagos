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
  const usuario = localStorage.getItem(CLAVE_SESION);
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
  localStorage.setItem(CLAVE_SESION, encontrado.usuario);
  $('#form-login').reset();
  $('#login-error').hidden = true;
  mostrarPantalla();
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
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
  renderLista();
}

// ================== HU-02: REGISTRAR UN PAGO PENDIENTE ==================

const TIPOS = ['Servicio', 'Proveedor', 'Impuesto', 'Préstamo'];

function abrirFormularioPago() {
  const form = $('#form-pago');
  form.reset();
  mostrarErrores(form, {});
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
  pagos.push({ id: nuevoId(), ...datos, pagado: false }); // nace como "Pendiente"
  if (!guardarPagos(pagos)) return;

  // Se muestra el mes de su fecha de vencimiento, para que se vea en la lista
  const [anio, mes] = datos.vencimiento.split('-').map(Number);
  vista.anio = anio;
  vista.mes = mes - 1;

  $('#dlg-pago').close();
  render();
  aviso('Pago registrado como Pendiente');
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

// Botones de cada fila (se van agregando en las siguientes historias)
function accionesDe(pago, estado) {
  return '';
}

function cambiarFiltro(evento) {
  vista.filtro = evento.target.value;
  renderLista();
}

// ================== ARRANQUE ==================

$('#form-login').addEventListener('submit', iniciarSesion);
$('#btn-salir').addEventListener('click', cerrarSesion);
$('#btn-nuevo').addEventListener('click', abrirFormularioPago);
$('#form-pago').addEventListener('submit', guardarPago);
$('#filtro-estado').addEventListener('change', cambiarFiltro);

// Botones "Cancelar" de cualquier ventana
document.querySelectorAll('[data-cerrar]').forEach((boton) => {
  boton.addEventListener('click', () => boton.closest('dialog').close());
});

mostrarPantalla();
