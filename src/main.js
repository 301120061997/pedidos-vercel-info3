// Interfaz del sitio. No necesitas modificar este archivo para las misiones,
// pero léelo: así se conecta la lógica (misiones.js) con la pantalla.
import { config } from './config.js'
import { pedidos as datosIniciales, ESTADOS } from './datos.js'
import { correrMisiones, mostrar } from './verificacion.js'
import * as m from './misiones.js'

const $ = (sel) => document.querySelector(sel)
const pedidos = structuredClone(datosIniciales)
const resultados = correrMisiones()
const lista = (n) => resultados.find((r) => r.numero === n).completa
const seguro = (fn, respaldo) => { try { return fn() } catch { return respaldo } }
const etiquetas = { registrado: 'Registrado', en_preparacion: 'En preparación', listo: 'Listo', entregado: 'Entregado' }
const colores = { registrado: 'bg-slate-200 text-slate-800', en_preparacion: 'bg-amber-100 text-amber-900', listo: 'bg-sky-100 text-sky-900', entregado: 'bg-emerald-100 text-emerald-900' }
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const dinero = (n) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

// Encabezado
$('#negocio').textContent = config.negocio
$('#autor').textContent = `${config.nombre} · @${config.usuarioGitHub} · ${config.equipo}`
$('#marcador').textContent = `${resultados.filter((r) => r.completa).length}/6`
$('#version').textContent = `Versión desplegada: ${new Date(__BUILD_TIME__).toLocaleString('es-MX')}`
document.title = `${config.negocio} · Pedidos`

// Panel de verificación
$('#panel').innerHTML = resultados.map((r) => {
  const ok = r.resultados.filter((x) => x.paso).length
  const falla = r.resultados.find((x) => !x.paso)
  return `<article class="min-w-0 rounded-lg border bg-white p-3 ${r.completa ? 'border-emerald-300' : 'border-rose-200'}">
    <div class="flex items-center justify-between gap-2">
      <h3 class="font-semibold">${r.completa ? '✅' : '❌'} Misión ${r.numero} · ${r.titulo}</h3>
      <span class="text-xs rounded-full px-2 py-0.5 ${r.completa ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${ok}/${r.resultados.length}</span>
    </div>
    <p class="text-xs text-slate-500">${r.requisito} · <code>${r.funcion}()</code></p>
    ${falla ? `<dl class="mt-2 text-xs grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 bg-rose-50 rounded p-2">
      <dt class="font-semibold">Caso</dt><dd class="min-w-0 break-all">${esc(falla.nombre)}</dd>
      <dt class="font-semibold">Esperado</dt><dd class="min-w-0 break-all"><code>${esc(mostrar(falla.esperado))}</code></dd>
      <dt class="font-semibold">Obtenido</dt><dd class="min-w-0 break-all"><code>${esc(falla.error ? 'Error: ' + falla.error : mostrar(falla.obtenido))}</code></dd>
    </dl>` : ''}
  </article>`
}).join('')

// Sistema en vivo
function render() {
  const texto = $('#buscar').value
  const visibles = lista(5) ? seguro(() => m.buscarPedidos(pedidos, texto), pedidos) : pedidos

  const resumen = lista(4) ? seguro(() => m.resumenPorEstado(pedidos), null) : null
  $('#resumen').innerHTML = ESTADOS.map((e) => `<div class="rounded-lg p-3 ${colores[e]}">
    <p class="text-xs">${etiquetas[e]}</p><p class="text-2xl font-bold">${resumen ? resumen[e] : '—'}</p></div>`).join('')

  $('#tabla').innerHTML = visibles.map((p) => {
    const idx = ESTADOS.indexOf(p.estado)
    const siguiente = ESTADOS[idx + 1]
    const total = lista(1) ? dinero(seguro(() => m.totalPedido(p), 0)) : '—'
    return `<tr class="border-t border-slate-100">
      <td class="p-2 text-slate-500">${p.id}</td>
      <td class="p-2">${esc(p.cliente)}</td>
      <td class="p-2"><span class="rounded-full px-2 py-0.5 text-xs ${colores[p.estado]}">${etiquetas[p.estado]}</span></td>
      <td class="p-2 text-right tabular-nums">${total}</td>
      <td class="p-2 text-right">${siguiente ? `<button data-id="${p.id}" data-a="${siguiente}" class="text-xs rounded border border-slate-300 px-2 py-0.5 hover:bg-slate-50">→ ${etiquetas[siguiente]}</button>` : ''}
        <button data-id="${p.id}" data-a="registrado" class="text-xs text-slate-400 underline ml-1" title="Prueba un cambio inválido">reiniciar</button></td>
    </tr>`
  }).join('') || '<tr><td colspan="5" class="p-4 text-center text-slate-500">Sin resultados</td></tr>'

  const top = lista(6) ? seguro(() => m.topClientes(pedidos, 3), []) : []
  $('#top').innerHTML = top.length
    ? top.map((c) => `<li>${esc(c.cliente)} — <b>${dinero(c.total)}</b></li>`).join('')
    : '<li class="list-none text-slate-500">Completa la Misión 6 para ver el ranking.</li>'
}

$('#buscar').addEventListener('input', render)
$('#tabla').addEventListener('click', (ev) => {
  const b = ev.target.closest('button'); if (!b) return
  const p = pedidos.find((x) => x.id === Number(b.dataset.id))
  const valido = seguro(() => m.puedeTransicionar(p.estado, b.dataset.a), false)
  if (valido) { p.estado = b.dataset.a; $('#aviso').textContent = '' }
  else $('#aviso').textContent = `Tu función rechazó ${p.estado} → ${b.dataset.a} en el pedido ${p.id}.`
  render()
})
$('#form-cliente').addEventListener('submit', (ev) => {
  ev.preventDefault()
  const datos = Object.fromEntries(new FormData(ev.target))
  const errores = lista(3) ? seguro(() => m.validarCliente(datos), ['error_en_funcion']) : ['completa_la_mision_3']
  $('#errores').innerHTML = errores.length
    ? errores.map((e) => `<li class="text-rose-700">• ${esc(e)}</li>`).join('')
    : '<li class="text-emerald-700">✓ Cliente válido</li>'
})
render()
