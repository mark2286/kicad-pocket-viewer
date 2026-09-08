// KiCad Pocket Viewer - GitHub OAuth relay (Cloudflare Worker)
// Exchanges the one-time `code` from GitHub's login redirect for an access token.
// Needs two secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.
// Optional var ALLOWED_ORIGINS: comma-separated list of page origins allowed to call this.
// The token goes straight back to the user's browser; this worker never sees repository contents.
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || 'https://mark2286.github.io,http://localhost:8791').split(',').map(s => s.trim());
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    const json = (obj, status) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return new Response('KiCad Pocket Viewer OAuth relay is running.', { headers: cors });

    let body;
    try { body = await req.json(); } catch { return json({ error: 'JSON body required' }, 400); }
    if (!body.code) return json({ error: 'code required' }, 400);

    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'User-Agent': 'kicad-pocket-viewer' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: body.code,
        redirect_uri: body.redirect_uri,
      }),
    });
    const data = await r.json();
    if (data.error) return json({ error: data.error_description || data.error }, 400);
    return json({ access_token: data.access_token, scope: data.scope }, 200);
  },
};
