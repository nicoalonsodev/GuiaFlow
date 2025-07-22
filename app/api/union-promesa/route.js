export async function POST(request) {
  try {
    const body = await request.json();
    const { cedula, fecha } = body;

    if (!cedula || !fecha) {
      return new Response(JSON.stringify({ error: 'Faltan los campos cedula o fecha.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = process.env.token_metfy;

    // Paso 1: Obtener detalles del cliente
    const detallesResponse = await fetch('https://clientes.uniontvmas.cl/api/v1/GetClientsDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, cedula })
    });

    const detallesData = await detallesResponse.json();

    if (detallesData.estado !== 'exito' || !detallesData.datos?.length) {
      return new Response(JSON.stringify({ error: 'Cliente no encontrado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const idCliente = detallesData.datos[0].id;

    // Paso 2: Obtener facturas
    const facturasResponse = await fetch('https://clientes.uniontvmas.cl/api/v1/GetInvoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        estado: 1,
        idcliente: idCliente
      })
    });

    const facturasData = await facturasResponse.json();

    if (facturasData.estado !== 'exito' || !facturasData.facturas?.length) {
      return new Response(JSON.stringify({ error: 'No se encontraron facturas activas.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const idFactura = facturasData.facturas[0].id;

    // Paso 3: Crear promesa de pago
    const promesaResponse = await fetch('https://clientes.uniontvmas.cl/api/v1/PromesaPago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        idfactura: idFactura,
        fechalimite: fecha,
           descripcion: 'Chatbot Henko'
      })
    });

    const promesaData = await promesaResponse.json();

    return new Response(JSON.stringify(promesaData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en promesa-pago:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
