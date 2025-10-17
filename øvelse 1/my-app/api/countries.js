export default async function handler(req, res) {
    const r = await fetch('https://restcountries.com/v3.1/all?fields=cca2,cca3,ccn3,name,translations,region,subregion');
    if (!r.ok) return res.status(r.status).json({ error: 'restcountries failed' });
    const all = await r.json();
  
    // Lav en “dansk visningsstreng” hvis muligt
    const out = all.map(c => {
      const daName = c.translations?.dan?.common || c.name?.common || '';
      return {
        code2: c.cca2, code3: c.cca3, num: c.ccn3,
        name_en: c.name?.common || '',
        name_da: daName,
        region: c.region || '', subregion: c.subregion || ''
      };
    }).sort((a,b)=>a.name_da.localeCompare(b.name_da, 'da'));
    res.setHeader('cache-control', 's-maxage=86400, stale-while-revalidate=604800');
    res.json(out);
  }
  