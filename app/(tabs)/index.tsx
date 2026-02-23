import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../src/constants/colors';
import globalStyles from '../../src/styles/globalStyles';

interface WeatherData {
  temp: number;
  desc: string;
  humidity: number;
  wind: number;
}

const SECCIONES = [
  { key: 'farmacias', label: 'Farmacias', icon: 'medical', color: colors.primario, ruta: '/farmacias' },
  { key: 'mascotas', label: 'Mascotas', icon: 'paw', color: colors.acento, ruta: '/mascotas' },
  { key: 'perfil', label: 'Mi Perfil', icon: 'person', color: colors.info, ruta: '/perfil' },
] as const;

type Seccion = typeof SECCIONES[number];

function tempColor(t: number): string {
  if (t <= 10) return '#1877f2';   // azul — frío
  if (t <= 19) return '#10b981';   // verde — templado
  if (t <= 29) return '#f59e0b';   // naranja — calor
  return '#ef4444';                // rojo — mucho calor
}

export default function Inicio() {
  const router = useRouter();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [topSeccion, setTopSeccion] = useState<Seccion | null>(null);
  const [hora, setHora] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setHora('Buenos días ☀️');
    else if (h < 18) setHora('Buenas tardes 🌤️');
    else setHora('Buenas noches 🌙');
    loadWeather();
    loadTopSeccion();
  }, []);

  const loadWeather = async () => {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-34.3833&longitude=-58.9167&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America/Argentina/Buenos_Aires'
      );
      const json = await res.json();
      const c = json.current;
      const code = c.weather_code;
      let desc = 'Despejado';
      if (code >= 61) desc = 'Lluvia';
      else if (code >= 51) desc = 'Llovizna';
      else if (code >= 45) desc = 'Niebla';
      else if (code >= 1) desc = 'Parcialmente nublado';
      setWeather({ temp: Math.round(c.temperature_2m), desc, humidity: c.relative_humidity_2m, wind: Math.round(c.wind_speed_10m) });
    } catch {
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  };

  const loadTopSeccion = useCallback(async () => {
    try {
      let max = 0;
      let top: Seccion | null = null;
      for (const s of SECCIONES) {
        const v = await AsyncStorage.getItem(`visits_${s.key}`);
        const count = parseInt(v ?? '0', 10);
        if (count > max) { max = count; top = s; }
      }
      if (max > 0) setTopSeccion(top);
    } catch {}
  }, []);

  const handleNav = async (seccion: Seccion) => {
    try {
      const val = await AsyncStorage.getItem(`visits_${seccion.key}`);
      await AsyncStorage.setItem(`visits_${seccion.key}`, String(parseInt(val ?? '0', 10) + 1));
    } catch {}
    router.push(seccion.ruta as any);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.headerHora}>{hora}</Text>
        <Text style={styles.headerCiudad}>Matheu, Buenos Aires</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Clima */}
        <View style={[globalStyles.card, styles.climaCard]}>
          <Text style={styles.climaTitulo}>Clima en Matheu</Text>
          {weatherLoading ? (
            <ActivityIndicator color={colors.primario} />
          ) : weather ? (
            <View>
              <Text style={[styles.climaTemp, { color: tempColor(weather.temp) }]}>{weather.temp}°C</Text>
              <Text style={styles.climaDesc}>{weather.desc}</Text>
              <View style={styles.climaRow}>
                <Ionicons name="water-outline" size={14} color={colors.grisMedio} />
                <Text style={styles.climaMeta}>{weather.humidity}% hum.</Text>
                <Ionicons name="speedometer-outline" size={14} color={colors.grisMedio} />
                <Text style={styles.climaMeta}>{weather.wind} km/h</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.climaDesc}>No se pudo cargar el clima</Text>
          )}
        </View>

        {/* Más visitada */}
        {topSeccion && (
          <View style={globalStyles.card}>
            <Text style={globalStyles.sectionTitle}>Tu sección favorita</Text>
            <TouchableOpacity
              style={[styles.favBtn, { backgroundColor: topSeccion.color }]}
              onPress={() => handleNav(topSeccion)}
            >
              <Ionicons name={topSeccion.icon as any} size={22} color={colors.blanco} />
              <Text style={styles.favBtnText}>{topSeccion.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.blanco} />
            </TouchableOpacity>
          </View>
        )}

        {/* Secciones */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Secciones</Text>
          {SECCIONES.map(s => (
            <TouchableOpacity
              key={s.key}
              style={styles.seccionRow}
              onPress={() => handleNav(s)}
            >
              <View style={[styles.seccionIcon, { backgroundColor: s.color + '22' }]}>
                <Ionicons name={s.icon as any} size={22} color={s.color} />
              </View>
              <Text style={styles.seccionLabel}>{s.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.grisMedio} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primario,
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerHora: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: colors.blanco,
    marginBottom: 2,
  },
  headerCiudad: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  climaCard: {
    marginTop: 16,
  },
  climaTitulo: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.grisMedio,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  climaTemp: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: colors.texto, // sobreescrito dinámicamente
  },
  climaDesc: {
    fontSize: 16,
    color: colors.textoSecundario,
    marginBottom: 8,
  },
  climaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  climaMeta: {
    fontSize: 13,
    color: colors.grisMedio,
    marginRight: 8,
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
  },
  favBtnText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.blanco,
  },
  seccionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gris,
  },
  seccionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seccionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500' as const,
    color: colors.texto,
  },
});
