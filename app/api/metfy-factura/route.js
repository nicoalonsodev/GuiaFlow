export async function POST(request) {
  try {
    const body = await request.json();
    const { cedula } = body;

    if (!cedula) {
      return new Response(JSON.stringify({ error: 'Falta el campo cedula.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = process.env.token_metfy;

    // Paso 1: Obtener detalles del cliente
    const detallesResponse = await fetch('https://cliente.metfy.cl/api/v1/GetClientsDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        cedula
      })
    });

    const detallesData = await detallesResponse.json();

    if (detallesData.estado !== 'exito' || !detallesData.datos || detallesData.datos.length === 0) {
      return new Response(JSON.stringify({ error: 'Cliente no encontrado o sin datos válidos.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const idCliente = detallesData.datos[0].id;

    // Paso 2: Activar servicio
    const activarResponse = await fetch('https://cliente.metfy.cl/api/v1/ActiveService', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        idcliente: idCliente
      })
    });

    const activarData = await activarResponse.json();

    return new Response(JSON.stringify({
      resultado: 'ok',
      respuestaActivacion: activarData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en el endpoint:', error);
    return new Response(JSON.stringify({ error: 'Error interno en el servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
