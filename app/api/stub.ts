export function createStubEndpoint(name: string) {
  return async function handler() {
    return new Response(JSON.stringify({
      message: `${name} endpoint is not available in this build`,
      timestamp: new Date().toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}
