export async function POST(req) {
  const url = 'https://integrations.fu.do/fudo/auth';
  const headers = {
    'Content-Type': 'application/json',
    'Fudo-External-App-Authorization': 'Bearer hTXbQlGZGPGwaT70rm13tJfPMAIqdXMc'
  };
  const body = {
    clientId: 'MDAwMDI6MTYwODIy',
    clientSecret: '6eeWEbTr2FLsxd9CNcdIuOz3'
  };

  try {
    const resFudo = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!resFudo.ok) {
      const errorText = await resFudo.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: resFudo.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await resFudo.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error al obtener el token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
