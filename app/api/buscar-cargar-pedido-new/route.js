import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const {
      pedido,
      telefono,
      email,
      store_id,
      pay_method,
      ship_company,
      destination
    } = await req.json();

    if (!pedido || (!telefono && !email)) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos: pedido y teléfono o email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sucursalesEmail = {
      2: 'henkoprompter@gmail.com',
      42: 'henkoprompter@gmail.com',
      38: 'henkoprompter@gmail.com',
      9: 'henkoprompter@gmail.com',
      29: 'henkoprompter@gmail.com',
      13: 'henkoprompter@gmail.com',
      33: 'henkoprompter@gmail.com',
      22: 'henkoprompter@gmail.com',
      28: 'henkoprompter@gmail.com',
      14: 'henkoprompter@gmail.com',
      24: 'henkoprompter@gmail.com',
      26: 'henkoprompter@gmail.com',
      41: 'henkoprompter@gmail.com',
      17: 'henkoprompter@gmail.com',
      8: 'henkoprompter@gmail.com',
      19: 'henkoprompter@gmail.com',
      7: 'henkoprompter@gmail.com',
      37: 'henkoprompter@gmail.com',
      39: 'henkoprompter@gmail.com'
    };

    const sucursalesNombres = {
      2: 'Sucursal CABA',
      42: 'Sucursal Catamarca',
      38: 'Sucursal Córdoba',
      9: 'Sucursal Concepción',
      29: 'Sucursal Crovara',
      13: 'Sucursal Entre Ríos',
      33: 'Sucursal Ezeiza',
      22: 'Sucursal Laferrere',
      28: 'Sucursal La Plata',
      14: 'Sucursal La Rioja',
      24: 'Sucursal Lanús',
      26: 'Sucursal Lomas',
      41: 'Sucursal Mar del Plata',
      17: 'Sucursal Mendoza',
      8: 'Sucursal Monte Grande',
      19: 'Sucursal Montero',
      7: 'Sucursal San Juan',
      37: 'Sucursal San Rafael',
      39: 'Sucursal Solano'
    };

    const telefonoFormateado = telefono?.startsWith('+') ? telefono : `+${telefono}`;

    const tokenResponse = await fetch('https://tecnicocerca.com/oauth/token', {
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

    let userAccessToken = null;

    if (telefono) {
      const res = await fetch('https://tecnicocerca.com/api/chatbot/user-session', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ phone_number: telefonoFormateado })
      });
      const data = await res.json();
      userAccessToken = data.user_access_token;
    }

    if (!userAccessToken && email) {
      const res = await fetch('https://tecnicocerca.com/api/chatbot/user-session/create-by-email', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      userAccessToken = data.user_access_token;
    }

    if (!userAccessToken) {
      const correoSucursal = sucursalesEmail[store_id] || 'henkoprompter@gmail.com';
      const nombreSucursal = sucursalesNombres[store_id] || `Sucursal ${store_id}`;

      const productosRaw = pedido.split(';');
      const productosFormateados = productosRaw.map(p => {
        const props = p.split(',');
        let nombre = '', cantidad = '';
        for (const prop of props) {
          const [clave, valor] = prop.trim().split(':');
          if (clave === 'nombre') nombre = valor.trim();
          if (clave === 'cantidad' || clave === 'count') cantidad = valor.trim();
        }
        return `- nombre: ${nombre}, cantidad: ${cantidad}`;
      }).join('\n');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nicoalonso99.na@gmail.com',
          pass: 'xsboqkapcvofqwco'
        }
      });

      const mailOptions = {
        from: 'nicoalonso99.na@gmail.com',
        to: correoSucursal,
        subject: 'Pedido Técnico Cerca',
        text: `Pedido Técnico Cerca:
(No se pudo autenticar al usuario con teléfono ni email).

Detalles del pedido:

Pedido: 
${productosFormateados}

Teléfono: ${telefonoFormateado}
Email: ${email || 'No informado'}
Sucursal: ${nombreSucursal}
Método de pago: ${pay_method || 'No informado'}
Entrega: ${ship_company || 'No informado'}
Destino: ${destination || 'Sucursal'}`
      };

      await transporter.sendMail(mailOptions);

      return new Response(JSON.stringify({
        message: 'Pedido enviado a la sucursal. No se pudo autenticar el usuario.'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const productosRaw = pedido.split(';');

    const productosMapeados = productosRaw.map(p => {
      const props = p.split(',');
      const producto = {};
      for (const prop of props) {
        const [clave, valor] = prop.trim().split(':');
        if (clave === 'nombre') producto.nombre = valor.trim();
        if (clave === 'count') producto.count = Number(valor.trim());
      }
      return producto;
    });

    const productos = await Promise.all(productosMapeados.map(async producto => {
      const response = await fetch(
        `https://tecnicocerca.com/api/getProduct?user_type=admin&store_id=${store_id || 2}&filter_name=${encodeURIComponent(producto.nombre)}`,
        { method: 'POST' }
      );

      const data = await response.json();
      const productosEncontrados = data.products || [];

      let info = productosEncontrados.find(p => p.name.toLowerCase() === producto.nombre.toLowerCase());
      if (!info && productosEncontrados.length > 0) {
        info = productosEncontrados[0];
      }

      if (!info) {
        throw new Error(`Producto no encontrado: ${producto.nombre}`);
      }

      return {
        product_item_id: info.product_item_id,
        count: producto.count,
        unitary: info.unitary,
        wholesale: info.wholesale,
        wholesale_quantity: info.wholesale_quantity,
        part: info.part
      };
    }));

    const pedidoBody = {
      store_id: store_id || 2,
      app_versionName: 'henko_ia',
      cart_data: productos,
      pay_method: pay_method || 'Transferencia',
      ship_company: ship_company || '1_Retiro Personalmente',
      destination: destination || 'A casa',
      user_type: 'user'
    };

    const finalResponse = await fetch(
      'https://tecnicocerca.com/api/authenticated/place_order',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAccessToken}`
        },
        body: JSON.stringify(pedidoBody)
      }
    );

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
