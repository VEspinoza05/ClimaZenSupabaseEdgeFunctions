import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { lat, lon } = await req.json();

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Lat y lon requeridos' }),
        { status: 400 }
      );
    }

    const API_KEY = Deno.env.get('OPENWEATHER_API_KEY');
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

    const weatherRes = await fetch(url);
    const weatherData = await weatherRes.json();

    return new Response(JSON.stringify(weatherData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error interno', details: error.message }),
      { status: 500 }
    );
  }
});
