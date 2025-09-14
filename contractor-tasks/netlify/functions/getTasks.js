export async function handler(event, context) {
  const API_TOKEN = process.env.API_TOKEN; // must match your Netlify env variable
  const DOC_ID = process.env.DOC_ID;
  const TABLE_ID = process.env.TABLE_ID;

  try {
    const url = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    if (!res.ok) throw new Error('Coda API request failed');

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.items)
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
