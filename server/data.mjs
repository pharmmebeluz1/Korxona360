import { db } from './database.mjs';
export async function GET(request) { try {
    if (!request.headers.get('oai-authenticated-user-id'))
        return Response.json({ error: 'Hisobingizga kiring' }, { status: 401 });
    const industry = new URL(request.url).searchParams.get('industry');
    if (!["carton", "food", "drinks", "plastic", "metal", "construction", "textile", "chemicals", "paint", "wood", "glass", "rubber", "electrical", "leather", "other"].includes(industry || ''))
        return Response.json({ error: 'Soha noto‘g‘ri' }, { status: 400 });
    const d = db();
    const tables = ['materials', 'products', 'batches', 'orders', 'sales', 'expenses', 'operations'];
    const rows = await d.batch(tables.map(t => d.prepare(`SELECT * FROM ${t} WHERE industry = ? ORDER BY rowid DESC`).bind(industry)));
    return Response.json(Object.fromEntries(tables.map((t, i) => [t, rows[i].results])), { headers: { 'Cache-Control': 'no-store' } });
}
catch (e) {
    console.error(e);
    return Response.json({ error: 'Ma’lumotlarni yuklab bo‘lmadi. Qayta urinib ko‘ring.' }, { status: 503 });
} }
