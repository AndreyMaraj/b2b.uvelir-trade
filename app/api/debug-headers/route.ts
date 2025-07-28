export async function GET(request: Request) {
	return new Response(JSON.stringify(Object.fromEntries(request.headers)), {
		headers: { 'content-type': 'application/json' },
	});
}