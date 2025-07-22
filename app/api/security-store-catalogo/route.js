import { TextEncoder } from 'util';
import iconv from 'iconv-lite';

export async function GET() {
  const endpoint =
    'https://www.securitystore.com.uy/sublimepanel/tools/exportar_facebook.php?auth=7b3f62cca8ead2d188ca9a1c9e9f259c';

  const response = await fetch(endpoint);
  const arrayBuffer = await response.arrayBuffer();

  // Decodificar el contenido como ISO-8859-1 y convertirlo a UTF-8
  const text = iconv.decode(Buffer.from(arrayBuffer), 'iso-8859-1');

  // Procesar el contenido del CSV
  const [headers, ...rows] = text.trim().split('\n').map(line => line.split(','));
  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

  // Codificar el contenido en UTF-8
  const utf8Csv = new TextEncoder().encode(csv);

  return new Response(utf8Csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="catalogo.csv"',
    },
  });
}
