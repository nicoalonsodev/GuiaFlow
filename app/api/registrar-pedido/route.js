export async function POST(req) {
  try {
    const {
      pedido,
      telefono,
      store_id,
      pay_method,
      ship_company,
      destination
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
        client_secret: '99DDH4jnDw9zOJXBg1XpQJuaxcm698FAomO27nOG',
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

    // 3. Armar productos
    const productos = pedido.split(';').map(p => {
      const obj = {};
      p.split(',').forEach(prop => {
        const [clave, valor] = prop.trim().split(':');
        if (clave && valor !== undefined) {
          const cleanKey = clave.trim();
          const cleanValue = valor.trim();
          if (cleanKey === 'id') obj.product_item_id = cleanValue;
          else if (cleanKey === 'count') obj.count = Number(cleanValue);
          else if (cleanKey === 'unitary') obj.unitary = Number(cleanValue);
          else if (cleanKey === 'wholesale') obj.wholesale = Number(cleanValue);
        }
      });

      obj.wholesale_quantity = 3;
      obj.part = obj.product_item_id === '960'
        ? 'Modulo A03s A03 A02s A04e'
        : obj.product_item_id === '987'
        ? 'Modulo A32 4g oled pantalla chica con marco'
        : 'Parte desconocida';

      return obj;
    });

    // 4. Crear body del pedido con campos dinámicos
    const pedidoBody = {
      store_id: store_id || 2,
      app_versionName: 'henko_ia',
      cart_data: productos,
      pay_method: pay_method || 'Transferencia',
      ship_company: ship_company || '1_Retiro Personalmente',
      destination: destination || 'A casa',
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
