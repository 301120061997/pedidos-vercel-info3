// Datos de ejemplo del Sistema de Pedidos y Clientes. No los modifiques:
// la verificación depende de ellos.
export const ESTADOS = ['registrado', 'en_preparacion', 'listo', 'entregado']

export const pedidos = [
  { id: 101, cliente: 'Ana Ramírez', estado: 'registrado', descuento: 0,
    items: [{ producto: 'Servicio A', cantidad: 2, precioUnitario: 150 }] },
  { id: 102, cliente: 'José Martínez', estado: 'en_preparacion', descuento: 0.1,
    items: [{ producto: 'Producto B', cantidad: 1, precioUnitario: 480 },
            { producto: 'Producto C', cantidad: 3, precioUnitario: 40 }] },
  { id: 103, cliente: 'Lucía Peña', estado: 'listo', descuento: 0,
    items: [{ producto: 'Servicio D', cantidad: 1, precioUnitario: 1200 }] },
  { id: 104, cliente: 'Ana Ramírez', estado: 'entregado', descuento: 0.15,
    items: [{ producto: 'Producto B', cantidad: 2, precioUnitario: 480 }] },
  { id: 105, cliente: 'Óscar Núñez', estado: 'registrado', descuento: 0,
    items: [{ producto: 'Producto C', cantidad: 10, precioUnitario: 40 }] },
  { id: 106, cliente: 'María José Ruiz', estado: 'en_preparacion', descuento: 0,
    items: [{ producto: 'Servicio A', cantidad: 1, precioUnitario: 150 },
            { producto: 'Servicio D', cantidad: 1, precioUnitario: 1200 }] },
  { id: 107, cliente: 'José Martínez', estado: 'entregado', descuento: 0,
    items: [{ producto: 'Producto E', cantidad: 4, precioUnitario: 99.9 }] },
  { id: 108, cliente: 'Lucía Peña', estado: 'registrado', descuento: 0.05,
    items: [{ producto: 'Producto B', cantidad: 1, precioUnitario: 480 }] },
  { id: 109, cliente: 'Héctor Ibáñez', estado: 'listo', descuento: 0,
    items: [] },
  { id: 110, cliente: 'Ana Ramírez', estado: 'en_preparacion', descuento: 0,
    items: [{ producto: 'Producto C', cantidad: 5, precioUnitario: 40 }] },
]
