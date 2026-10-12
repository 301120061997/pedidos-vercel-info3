# Sistema de Pedidos y Clientes — de tu código a producción

**Informática III · Grupo 1301 · Laboratorio del lunes 12 de octubre de 2026**

Hoy vas a programar la lógica central del sistema que tu equipo está modelando para E2, y a publicarla en internet con **Vercel**. Tu sitio trae un **panel de verificación**: corre casos de prueba contra tu código y te dice, en vivo, qué misión ya funciona y cuál no, qué esperaba y qué obtuvo.

Al final del día, tu URL de Vercel es tu evidencia. El profesor la abre y ve tu marcador.

---

## Paso 0 · Prepara tu copia (15 min)

1. Arriba a la derecha de este repo: **Fork** → crea la copia en tu cuenta.
2. Ábrelo en tu computadora (GitHub Desktop → *Clone*) **o** en Codespaces (*Code → Codespaces → Create*).
3. En la terminal:
   ```
   npm install
   npm run dev
   ```
   Abre la dirección que aparece (en Codespaces, la pestaña *Ports*). Debes ver **0/6**.
4. Edita `src/config.js` con tu nombre, usuario, equipo y el negocio de tu equipo. Guarda: el sitio se actualiza solo.

## Paso 1 · Publica ANTES de programar (15 min)

Sí, antes. En la industria se despliega pronto y seguido, no al final.

1. Haz commit de `config.js` y súbelo (GitHub Desktop: *Commit to main* → *Push origin*; terminal: `git add . && git commit -m "Mis datos" && git push`).
2. Entra a [vercel.com](https://vercel.com) → *Add New… → Project* → importa **tu fork**.
3. Vercel detecta Vite solo. No cambies nada. **Deploy**.
4. Abre tu URL `https://algo.vercel.app`. Verás tu nombre y **0/6**. Guarda esa URL.

A partir de aquí, **cada push a `main` se publica solo** en 1 minuto. Mira la fecha de "Versión desplegada" al pie de la página.

## Paso 2 · Las misiones (60 min)

Todo se programa en **un solo archivo: `src/misiones.js`**. Cada función tiene instrucciones y pistas en sus comentarios.

| # | Función | Requisito | Lo que aprendes |
|---|---|---|---|
| 1 | `totalPedido` | RF3 | Por qué `0.1 + 0.2` no da `0.3` y cómo afecta al dinero |
| 2 | `puedeTransicionar` | RF4 | Reglas de negocio como máquina de estados |
| 3 | `validarCliente` | RF1 | Validar entradas reales (espacios, guiones, campos opcionales) |
| 4 | `resumenPorEstado` | RF5 | Contar sin olvidar los casos en cero |
| 5 | `buscarPedidos` | RF5 | Acentos y mayúsculas: el problema de buscar "ramirez" |
| 6 | `topClientes` | Destacado | Reutilizar tus funciones en vez de copiar código |

**Cómo trabajar:**
- Lee el caso que falla en el panel. Esperado vs. obtenido te dice exactamente qué corregir.
- `npm run verificar` corre los mismos casos en la terminal.
- **Haz commit y push cada vez que completes una misión.** Tu sitio en Vercel debe subir de marcador durante la clase, no solo al final.
- No modifiques `src/verificacion.js` ni `src/datos.js`. Cambiar la prueba para que pase no es arreglar el código.

**Prueba tu sistema, no solo el panel:** cuando completes una misión, la parte derecha del sitio cobra vida. Con la Misión 2 lista, intenta "reiniciar" un pedido: tu función debe impedirlo.

## Entrega en Classroom (antes de las 14:00)

1. Tu URL de Vercel.
2. La liga a tu fork en GitHub.
3. **Una respuesta corta (3–5 líneas):** elige un caso que te falló, explica por qué fallaba y qué cambiaste.

## Niveles

| Nivel | Qué ve el profesor en tu URL |
|---|---|
| Destacado | 6/6, con commits por misión |
| Competente | 5/6 |
| Suficiente | 3–4/6 |
| Insuficiente | 0–2/6, o el sitio no está publicado |

## Uso de IA

Puedes usarla, declarándolo en tu respuesta de Classroom: qué herramienta, para qué y qué verificaste. Recuerda: en la defensa individual te pueden pedir que expliques cualquiera de estas funciones. Si no la puedes explicar, no la hiciste tú.

## Si algo falla

| Problema | Solución |
|---|---|
| Vercel no muestra mi fork | En el import: *Adjust GitHub App Permissions* y agrega el repo |
| El build falla en Vercel | Abre el log. Casi siempre es un error de sintaxis: corre `npm run build` local |
| Hice push y el sitio no cambia | Espera 1 min y recarga. Revisa la fecha de "Versión desplegada" |
| La página sale en blanco | Abre la consola del navegador (F12): tienes un error de JavaScript en `misiones.js` |
