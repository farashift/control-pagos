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
}

// ================== ARRANQUE ==================

$('#form-login').addEventListener('submit', iniciarSesion);
$('#btn-salir').addEventListener('click', cerrarSesion);

mostrarPantalla();
