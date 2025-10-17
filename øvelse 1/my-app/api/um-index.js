import * as cheerio from 'cheerio';

const BASE = 'https://um.dk/rejse-og-ophold/rejse-til-udlandet/rejsevejledninger';

function norm(s='') {
  return s.toLowerCase()
    .replaceAll('æ','ae').replaceAll('ø','oe').replaceAll('å','aa')
    .replace(/[^\w\s-]/g,'').replace(/\s+/g,' ').trim();
}

export default async function handler(req, res) {
  const r = await fetch(BASE, { headers:{'user-agent':'um-index/1.0'} });
  if (!r.ok) return res.status(r.status).json({ error:'um.dk fetch failed' });
  const html = await r.text();
  const $ = cheerio.load(html);

  const items = [];
  $('a[href*="/rejse-og-ophold/rejse-til-udlandet/rejsevejledninger/"]').each((_,a)=>{
    const href = $(a).attr('href') || '';
    const name = $(a).text().trim();
    // filtrér støj som “Ambassade websites”
    if (!name || name.length < 2) return;
    if (!/\/rejsevejledninger\/[^/]+$/i.test(href)) return;

    const url = href.startsWith('http') ? href : new URL(href, BASE).toString();
    const slug = url.split('/').filter(Boolean).pop();
    items.push({ name_da: name, slug, url, name_norm: norm(name) });
  });

  // fjern dubletter
  const map = new Map();
  for (const it of items) if (!map.has(it.slug)) map.set(it.slug, it);
  const list = Array.from(map.values()).sort((a,b)=>a.name_da.localeCompare(b.name_da,'da'));

  res.setHeader('cache-control','s-maxage=3600, stale-while-revalidate=86400');
  res.json({ base: BASE, count: list.length, list });
}
