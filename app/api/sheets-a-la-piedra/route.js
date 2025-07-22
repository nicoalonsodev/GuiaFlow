export async function GET() {
  try {
    // Obtener token
    const authRes = await fetch(`https://thanks.henkomkt.com/api/auth-fudo`, { method: 'POST' });
    if (!authRes.ok) {
      return new Response(JSON.stringify({ error: 'Error al obtener token' }), { status: 500 });
    }

    const { token } = await authRes.json();

    // Obtener productos
    const prodRes = await fetch('https://integrations.fu.do/fudo/products', {
      headers: {
        'Fudo-External-App-Authorization': `Bearer ${token}`
      }
    });

    if (!prodRes.ok) {
      return new Response(JSON.stringify({ error: 'Error al obtener productos' }), { status: 500 });
    }

    const { products } = await prodRes.json();

    // Convertir a CSV
    const headers = ['id', 'name', 'price', 'active', 'description', 'productCategoryId'];
    const rows = products.map(p => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      p.price,
      p.active,
      `"${(p.description || '').replace(/"/g, '""')}"`,
      p.productCategoryId
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="products.csv"'
      }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
}
