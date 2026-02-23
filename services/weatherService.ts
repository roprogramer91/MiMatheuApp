// Coordenadas de Matheu, Buenos Aires, Argentina
const LAT = -34.37;
const LON = -58.98;

const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&timezone=America%2FArgentina%2FBuenos_Aires`;

export interface Weather {
  temperature: number;
  weatherCode: number;
  windspeed: number;
  humidity: number;
  label: string;
  emoji: string;
}

// WMO Weather Codes → descripción y emoji
function parseWeatherCode(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: 'Despejado', emoji: '☀️' };
  if (code <= 2) return { label: 'Parcialmente nublado', emoji: '⛅' };
  if (code === 3) return { label: 'Nublado', emoji: '☁️' };
  if (code <= 49) return { label: 'Niebla', emoji: '🌫️' };
  if (code <= 59) return { label: 'Llovizna', emoji: '🌦️' };
  if (code <= 69) return { label: 'Lluvia', emoji: '🌧️' };
  if (code <= 79) return { label: 'Nieve', emoji: '❄️' };
  if (code <= 84) return { label: 'Chaparrones', emoji: '🌧️' };
  if (code <= 99) return { label: 'Tormenta', emoji: '⛈️' };
  return { label: 'Sin datos', emoji: '🌡️' };
}

export async function getWeatherMatheu(): Promise<Weather> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener el clima');

    const data = await response.json();
    const current = data.current;

    const { label, emoji } = parseWeatherCode(current.weathercode);

    return {
      temperature: Math.round(current.temperature_2m),
      weatherCode: current.weathercode,
      windspeed: Math.round(current.windspeed_10m),
      humidity: current.relative_humidity_2m,
      label,
      emoji,
    };
  } catch (error) {
    console.error('🌡️ Error obteniendo clima:', error);
    throw error;
  }
}
