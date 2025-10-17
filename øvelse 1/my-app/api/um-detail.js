import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error:'missing slug' });

  const url = `https://um.dk/rejse-og-ophold/rejse-til-udlandet/rejsevejledninger/${slug}`;
  const r = await fetch(url, { headers:{'user-agent':'um-detail/1.0'} });
  if (!r.ok) return res.status(r.status).json({ error:'um detail fetch failed', url });
  const html = await r.text();
  const $ = cheerio.load(html);

  const title = $('h1').first().text().trim();
  const pageText = $('body').text();
  const updated = pageText.match(/Rejsevejledning opdateret:\s*([0-9.]{10})/i)?.[1] || '';
  const valid   = pageText.match(/Gyldig:\s*([0-9.]{10})/i)?.[1] || '';

  // “Generel anbefaling” sektionen
  let general = '';
  $('h2').each((_,h)=>{
    const t = $(h).text().trim();
    if (/Generel anbefaling/i.test(t)) {
      let n = $(h).next(); let out = [];
      while (n.length && n[0].tagName !== 'h2') { out.push(n.text().trim()); n = n.next(); }
      general = out.join('\n\n').trim();
    }
  });

  res.setHeader('cache-control','s-maxage=1800, stale-while-revalidate=86400');
  res.json({ slug, title, updated_at: updated, valid_through: valid, general, source_url: url });
}
