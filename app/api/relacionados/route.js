export async function POST(req) {
  try {
    const { tags, idsucursal } = await req.json();

    if (!tags || !idsucursal) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos: tags o idsucursal' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Separar tags y limpiar vacíos
    const tagList = tags.split(' ').map(t => t.trim()).filter(t => t !== '');

    const productosMap = new Map();

    for (const tag of tagList) {
   
        
      const response = await fetch(`https://tecnicocerca.com/api/getProduct?user_type=admin&store_id=${idsucursal}&filter_tags=${encodeURIComponent(tag)}`, {
        method: 'POST'
      });

      const data = await response.json();
      console.log(data);
      
      const productos = data.products || [];

      for (const producto of productos) {
        const id = producto.product_item_id;
        if (!productosMap.has(id)) {
          productosMap.set(id, producto);
        }
      }
    }

    // Filtrar solo productos con stock > 0
    const productosConStock = Array.from(productosMap.values()).filter(p => p.stock > 0);

    return new Response(JSON.stringify({ productos: productosConStock }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en /api/relacionados:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
