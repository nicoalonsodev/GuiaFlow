export async function POST(req) {
  try {
    const {
      pedido,
      telefono,
      idsucursal,
      pago,
      envio,
      destino
    } = await req.json();

    if (!pedido || !telefono) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos: pedido y/o telefono' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Obtener access_token general
    const tokenResponse = await fetch('https://serviciotecnicocerca.com/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: 5,
        client_secret: 'woRDeyOmCKCOU7b2K0OCuTBU3htu9hPpAiFvFUl8',
        scope: 'chatbot-session'
      })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'No se pudo obtener el token general' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Obtener token de usuario
    const userResponse = await fetch('https://serviciotecnicocerca.com/api/chatbot/user-session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        phone_number: telefono
      })
    });

    const userData = await userResponse.json();
    const userAccessToken = userData.user_access_token;

    if (!userAccessToken) {
      return new Response(JSON.stringify({ error: 'No se pudo obtener el token del usuario' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Parsear productos y obtener datos completos desde API externa
    const productos = pedido
      .split(';')
      .filter(Boolean)
      .map(item => {
        const props = item.split(',').map(p => p.trim());
        const producto = {};
        props.forEach(p => {
          const [key, value] = p.split(':');
          if (key === 'producto') producto.descripcion = value.trim();
          if (key === 'count') producto.count = Number(value.trim());
        });
        return producto;
      });

    const cart_data = [];

    for (const producto of productos) {
const response = await fetch(
  `https://serviciotecnicocerca.com/api/getProduct?user_type=admin&store_id=${idsucursal}&filter_part=${encodeURIComponent(producto.descripcion)}`,
  {
    method: 'POST'
  }
);

const contentType = response.headers.get('content-type');

if (!response.ok || !contentType || !contentType.includes('application/json')) {
  const text = await response.text();
  console.error('Respuesta inesperada de getProduct:', text);
  throw new Error('La respuesta del servidor no es JSON válido');
}

const data = await response.json();

      const productInfo = data.products?.[0];

      if (!productInfo) {
        console.warn(`Producto no encontrado: ${producto.descripcion}`);
        continue; // O lanzar error si querés que sea obligatorio
      }

      const usarPrecio = producto.count >= productInfo.wholesale_quantity
        ? productInfo.wholesale
        : productInfo.unitary;

      cart_data.push({
        product_item_id: productInfo.product_item_id,
        part: productInfo.part,
        count: producto.count,
        unitary: productInfo.unitary,
        wholesale: productInfo.wholesale,
        wholesale_quantity: productInfo.wholesale_quantity || 3
      });
    }

    if (cart_data.length === 0) {
      return new Response(JSON.stringify({ error: 'No se pudieron procesar los productos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. Crear body del pedido con campos dinámicos
    const pedidoBody = {
      store_id: idsucursal || 2,
      app_versionName: 'henko_ia',
      cart_data,
      pay_method: pago || 'Transferencia',
      ship_company: envio || '1_Retiro Personalmente',
      destination: destino || 'A casa',
      user_type: 'user'
    };

    // 5. Enviar pedido final
    const finalResponse = await fetch('https://serviciotecnicocerca.com/api/authenticated/place_order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAccessToken}`
      },
      body: JSON.stringify(pedidoBody)
    });

    const finalResult = await finalResponse.json();

    return new Response(JSON.stringify(finalResult), {
      status: finalResponse.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en /api/procesar-pedido:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
