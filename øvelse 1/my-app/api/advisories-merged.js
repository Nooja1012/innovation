import Fuse from 'fuse.js';

function norm(s=''){return s.toLowerCase()
 .replaceAll('æ','ae').replaceAll('ø','oe').replaceAll('å','aa')
 .replace(/[^\w\s-]/g,'').replace(/\s+/g,' ').trim();}

export default async function handler(req,res){
  const [countriesRes, umRes] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/countries`),
    fetch(`${process.env.BASE_URL}/api/um-index`)
  ]);
  const countries = await countriesRes.json();
  const um = await umRes.json();

  const fuse = new Fuse(um.list, { keys:['name_da','name_norm','slug'], threshold:0.28 });

  const merged = countries.map(c => {
    const nameDa = c.name_da || c.name_en;
    // direkte hit
    let hit = um.list.find(u => norm(u.name_da) === norm(nameDa));
    // fallback: fuse
    if (!hit) hit = fuse.search(nameDa)[0]?.item;

    return {
      ...c,
      um: hit ? { slug: hit.slug, url: hit.url, name_da: hit.name_da } : null
    };
  });

  res.setHeader('cache-control','s-maxage=86400, stale-while-revalidate=604800');
  res.json(merged);
}
