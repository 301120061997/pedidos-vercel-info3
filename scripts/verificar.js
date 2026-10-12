// Corre los mismos casos del panel, pero en la terminal: npm run verificar
import { correrMisiones, mostrar } from '../src/verificacion.js'

let completas = 0
for (const m of correrMisiones()) {
  const ok = m.resultados.filter((r) => r.paso).length
  if (m.completa) completas++
  console.log(`\n${m.completa ? '✅' : '❌'} Misión ${m.numero} · ${m.titulo} (${ok}/${m.resultados.length})`)
  const falla = m.resultados.find((r) => !r.paso)
  if (falla) {
    console.log(`   Caso que falla: ${falla.nombre}`)
    console.log(`   Esperado: ${mostrar(falla.esperado)}`)
    console.log(`   Obtenido: ${falla.error ? 'Error → ' + falla.error : mostrar(falla.obtenido)}`)
  }
}
console.log(`\nMisiones completas: ${completas}/6\n`)
