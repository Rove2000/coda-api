export async function handler(event, context) {
  const API_TOKEN = process.env.CODA_API_TOKEN;  // hidden in Netlify
  const DOC_ID = "your_doc_id";                  // replace with your doc ID
  const TABLE_ID = "your_table_id";              // replace with your table ID

  const contractorKey = event.queryStringParameters.key;

  try {
    const url = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    const data = await res.json();

    const tasks = data.items
      .filter(r => r.values["ContractorKey"] === contractorKey)
      .map(r => ({
        id: r.id,
        task: r.values["Task"],
        status: r.values["Status"],
        due: r.values["DueDate"]
      }));

    return {
      statusCode: 200,
      body: JSON.stringify(tasks)
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}