import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    if (req.method !== "GET") {
      return new Response("Método no permitido", { status: 405 });
    }

    const url = new URL(req.url);
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Lat y lon requeridos' }),
        { status: 400 }
      );
    }

    const API_KEY = Deno.env.get('MAPS_PLATFORM_API_KEY');
    const googleApisUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`;

    const response = await fetch(googleApisUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch(error) {
    return new Response(
      JSON.stringify({ error: 'Error interno', details: error.message }),
      { status: 500 }
    );
  }
});
