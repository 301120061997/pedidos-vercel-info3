// Casos de prueba de las misiones. No modifiques este archivo:
// cambiar la prueba para que pase no es arreglar el código.
import * as m from './misiones.js'
import { pedidos } from './datos.js'

const ids = (lista) => (Array.isArray(lista) ? lista.map((p) => p.id) : lista)

export const misiones = [
  {
    numero: 1, titulo: 'Total del pedido', requisito: 'RF3', funcion: 'totalPedido',
    casos: [
      { nombre: 'Un item, sin descuento', ejecutar: () => m.totalPedido(pedidos[0]), esperado: 300 },
      { nombre: 'Varios items con 10 % de descuento', ejecutar: () => m.totalPedido(pedidos[1]), esperado: 540 },
      { nombre: 'Pedido sin items', ejecutar: () => m.totalPedido(pedidos[8]), esperado: 0 },
      { nombre: 'Sin campo descuento', ejecutar: () => m.totalPedido({ items: [{ cantidad: 2, precioUnitario: 50 }] }), esperado: 100 },
      { nombre: 'Redondeo: 0.1 + 0.2', ejecutar: () => m.totalPedido({ descuento: 0, items: [{ cantidad: 1, precioUnitario: 0.1 }, { cantidad: 1, precioUnitario: 0.2 }] }), esperado: 0.3 },
      { nombre: 'Redondeo: 4 × 99.9', ejecutar: () => m.totalPedido(pedidos[6]), esperado: 399.6 },
    ],
  },
  {
    numero: 2, titulo: 'Cambio de estado válido', requisito: 'RF4', funcion: 'puedeTransicionar',
    casos: [
      { nombre: 'registrado → en_preparacion', ejecutar: () => m.puedeTransicionar('registrado', 'en_preparacion'), esperado: true },
      { nombre: 'listo → entregado', ejecutar: () => m.puedeTransicionar('listo', 'entregado'), esperado: true },
      { nombre: 'Saltar un paso: registrado → listo', ejecutar: () => m.puedeTransicionar('registrado', 'listo'), esperado: false },
      { nombre: 'Regresar: listo → en_preparacion', ejecutar: () => m.puedeTransicionar('listo', 'en_preparacion'), esperado: false },
      { nombre: 'Desde el final: entregado → registrado', ejecutar: () => m.puedeTransicionar('entregado', 'registrado'), esperado: false },
      { nombre: 'Quedarse igual: listo → listo', ejecutar: () => m.puedeTransicionar('listo', 'listo'), esperado: false },
      { nombre: 'Estado inexistente', ejecutar: () => m.puedeTransicionar('volando', 'registrado'), esperado: false },
    ],
  },
  {
    numero: 3, titulo: 'Validar cliente', requisito: 'RF1', funcion: 'validarCliente',
    casos: [
      { nombre: 'Cliente correcto', ejecutar: () => m.validarCliente({ nombre: 'Ana', telefono: '5512345678', email: 'ana@correo.com' }), esperado: [] },
      { nombre: 'Teléfono con espacios y guion', ejecutar: () => m.validarCliente({ nombre: 'Ana', telefono: '55 1234-5678', email: '' }), esperado: [] },
      { nombre: 'Email opcional ausente', ejecutar: () => m.validarCliente({ nombre: 'Ana', telefono: '5512345678' }), esperado: [] },
      { nombre: 'Nombre solo con espacios', ejecutar: () => m.validarCliente({ nombre: '   ', telefono: '5512345678' }), esperado: ['nombre_requerido'] },
      { nombre: 'Teléfono corto', ejecutar: () => m.validarCliente({ nombre: 'Ana', telefono: '5512' }), esperado: ['telefono_invalido'] },
      { nombre: 'Teléfono con letras', ejecutar: () => m.validarCliente({ nombre: 'Ana', telefono: '55ABCD5678' }), esperado: ['telefono_invalido'] },
      { nombre: 'Email incompleto', ejecutar: () => m.validarCliente({ nombre: 'Ana', telefono: '5512345678', email: 'ana@' }), esperado: ['email_invalido'] },
      { nombre: 'Tres errores a la vez, en orden', ejecutar: () => m.validarCliente({ nombre: '', telefono: '123', email: 'sin-arroba' }), esperado: ['nombre_requerido', 'telefono_invalido', 'email_invalido'] },
    ],
  },
  {
    numero: 4, titulo: 'Resumen por estado', requisito: 'RF5', funcion: 'resumenPorEstado',
    casos: [
      { nombre: 'Los 10 pedidos de ejemplo', ejecutar: () => m.resumenPorEstado(pedidos), esperado: { registrado: 3, en_preparacion: 3, listo: 2, entregado: 2 } },
      { nombre: 'Lista vacía: todos en 0', ejecutar: () => m.resumenPorEstado([]), esperado: { registrado: 0, en_preparacion: 0, listo: 0, entregado: 0 } },
      { nombre: 'Solo un estado presente', ejecutar: () => m.resumenPorEstado([pedidos[2], pedidos[8]]), esperado: { registrado: 0, en_preparacion: 0, listo: 2, entregado: 0 } },
    ],
  },
  {
    numero: 5, titulo: 'Búsqueda sin acentos', requisito: 'RF5', funcion: 'buscarPedidos',
    casos: [
      { nombre: '"ramirez" encuentra a Ana Ramírez', ejecutar: () => ids(m.buscarPedidos(pedidos, 'ramirez')), esperado: [101, 104, 110] },
      { nombre: '"JOSÉ" en mayúsculas', ejecutar: () => ids(m.buscarPedidos(pedidos, 'JOSÉ')), esperado: [102, 106, 107] },
      { nombre: '"oscar nunez" sin acentos ni ñ', ejecutar: () => ids(m.buscarPedidos(pedidos, 'oscar nunez')), esperado: [105] },
      { nombre: 'Texto vacío devuelve todos', ejecutar: () => ids(m.buscarPedidos(pedidos, '  ')).length, esperado: 10 },
      { nombre: 'Sin coincidencias', ejecutar: () => ids(m.buscarPedidos(pedidos, 'zzz')), esperado: [] },
    ],
  },
  {
    numero: 6, titulo: 'Top de clientes', requisito: 'Destacado', funcion: 'topClientes',
    casos: [
      { nombre: 'Top 3', ejecutar: () => m.topClientes(pedidos, 3), esperado: [{ cliente: 'Lucía Peña', total: 1656 }, { cliente: 'María José Ruiz', total: 1350 }, { cliente: 'Ana Ramírez', total: 1316 }] },
      { nombre: 'Empate: orden alfabético', ejecutar: () => m.topClientes([{ cliente: 'Zoe', items: [{ cantidad: 1, precioUnitario: 10 }] }, { cliente: 'Abel', items: [{ cantidad: 1, precioUnitario: 10 }] }], 2), esperado: [{ cliente: 'Abel', total: 10 }, { cliente: 'Zoe', total: 10 }] },
      { nombre: 'Cliente con pedido vacío vale 0', ejecutar: () => m.topClientes(pedidos, 10).find((c) => c.cliente === 'Héctor Ibáñez')?.total, esperado: 0 },
    ],
  },
]

export function mostrar(valor) {
  if (valor === undefined) return 'undefined'
  try { return JSON.stringify(valor) } catch { return String(valor) }
}

export function correrMisiones() {
  return misiones.map((mision) => {
    const resultados = mision.casos.map((caso) => {
      try {
        const obtenido = caso.ejecutar()
        const paso = mostrar(obtenido) === mostrar(caso.esperado)
        return { ...caso, obtenido, paso, error: null }
      } catch (e) {
        return { ...caso, obtenido: undefined, paso: false, error: e.message }
      }
    })
    return { ...mision, resultados, completa: resultados.every((r) => r.paso) }
  })
}
