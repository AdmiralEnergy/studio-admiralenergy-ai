export const runtime = 'edge';

export async function GET() {
  const commit = process.env.COMMIT_REF || 'unknown';
  return new Response(JSON.stringify({ ok: true, commit }), { 
    headers: { 
      'content-type': 'application/json',
      'cache-control': 'public, max-age=60'
    }
  });
}