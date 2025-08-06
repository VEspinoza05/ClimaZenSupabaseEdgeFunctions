import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const LANG = 'es'

serve(async (req) => {
  try {
    if (req.method !== 'GET') {
      return new Response('Método no permitido', { status: 405 });
    }

    const url = new URL(req.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const days = url.searchParams.get('days');
    const hour = url.searchParams.get('hour');


    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Lat y lon requeridos' }),
        { status: 400 }
      );
    }

    const API_KEY = Deno.env.get('WEATHERAPI_API_KEY');
    const weatherapiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&hour=${hour}&lang${LANG}`

    const response = await fetch(weatherapiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch (error) {
    const details = error instanceof Error ? error.message : String(error)

    return new Response(
      JSON.stringify({ error: 'Error interno', details: details }),
      { status: 500 }
    );
  }

});