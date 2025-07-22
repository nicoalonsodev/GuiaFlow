export async function POST(req) {
  try {
    const body = await req.json();

    const requiredFields = [
      'numero',
      'pedido',
      'precio',
      'direccion',
      'forma_de_pago',
      'rango_de_entrega',
      'salsas'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Campo requerido faltante: ${field}` }),
          { status: 400 }
        );
      }
    }

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyw9uIrVzz86894hKmn5HkH3rbfkol9GlwDVC1IDtO39xIPJuK--xG5VR2KhUMFnnfu/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Error en Google Script:', text);
      return new Response(
        JSON.stringify({ error: 'Error al enviar a Google Script', detail: text }),
        { status: 500 }
      );
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ success: true, result }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Error interno', detail: err.message }),
      { status: 500 }
    );
  }
}
