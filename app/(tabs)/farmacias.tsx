import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AyerHoyManiana, Farmacia, getFarmaciasAyerHoyManiana } from '../../services/farmaciaService';
import colors from '../../src/constants/colors';
import globalStyles from '../../src/styles/globalStyles';

const SW = Dimensions.get('window').width;
const DIAS: Array<keyof AyerHoyManiana> = ['ayer', 'hoy', 'maniana'];
const LABELS = { ayer: 'AYER', hoy: 'HOY', maniana: 'MAÑANA' };
const COLORES_DIA = { ayer: colors.grisMedio, hoy: colors.primario, maniana: colors.acento };

export default function Farmacias() {
  const [data, setData] = useState<AyerHoyManiana | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [idx, setIdx] = useState(1);
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    AsyncStorage.getItem('visits_farmacias').then(v => {
      AsyncStorage.setItem('visits_farmacias', String(parseInt(v ?? '0', 10) + 1));
    }).catch(() => {});
    cargar();
  }, []);

  useEffect(() => {
    if (data) {
      setTimeout(() => ref.current?.scrollTo({ x: SW, animated: false }), 100);
    }
  }, [data]);

  async function cargar() {
    try {
      setLoading(true);
      setError(false);
      const d = await getFarmaciasAyerHoyManiana();
      setData(d);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function onScroll(e: any) {
    const x = e.nativeEvent.contentOffset.x;
    const newIdx = Math.round(x / SW);
    if (newIdx >= 0 && newIdx < 3 && newIdx !== idx) setIdx(newIdx);
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.titulo}>Farmacia de Turno</Text>
        <Text style={styles.sub}>Deslizá para ver ayer y mañana</Text>
      </View>

      {/* Tabs de día */}
      <View style={styles.tabs}>
        {DIAS.map((d, i) => (
          <TouchableOpacity
            key={d}
            style={[styles.tab, i === idx && { borderBottomWidth: 2, borderBottomColor: COLORES_DIA[d] }]}
            onPress={() => {
              setIdx(i);
              ref.current?.scrollTo({ x: SW * i, animated: true });
            }}
          >
            <Text style={[styles.tabText, i === idx && { color: COLORES_DIA[d], fontWeight: '700' as const }]}>
              {LABELS[d]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color={colors.primario} />
          <Text style={styles.centroText}>Cargando...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centro}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={styles.centroText}>Error al cargar</Text>
          <TouchableOpacity style={globalStyles.button} onPress={cargar}>
            <Text style={globalStyles.buttonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && data && (
        <ScrollView
          ref={ref}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={SW}
          decelerationRate={0.9}
          onScroll={onScroll}
          scrollEventThrottle={32}
          style={{ flex: 1 }}
        >
          {DIAS.map((dia) => (
            <View key={dia} style={{ width: SW }}>
              <TarjetaFarmacia farmacia={data[dia]} dia={dia} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function TarjetaFarmacia({ farmacia: f, dia }: { farmacia: Farmacia; dia: keyof AyerHoyManiana }) {
  const col = COLORES_DIA[dia];
  return (
    <ScrollView contentContainerStyle={styles.slide} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, dia === 'hoy' && { borderWidth: 2, borderColor: colors.primario }]}>
        <View style={[styles.badge, { backgroundColor: col }]}>
          <Text style={styles.badgeText}>{LABELS[dia]}</Text>
        </View>

        {f.imagen ? (
          <Image source={{ uri: f.imagen }} style={styles.imagen} resizeMode="cover" />
        ) : (
          <View style={styles.imagenPlaceholder}>
            <Ionicons name="business-outline" size={48} color={colors.grisMedio} />
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.nombre}>{f.nombre || 'Sin datos'}</Text>

          {!!f.direccion && (
            <View style={styles.fila}>
              <Ionicons name="location-outline" size={16} color={colors.primario} />
              <Text style={styles.filaText}>{f.direccion}</Text>
            </View>
          )}

          {!!f.telefono && (
            <View style={styles.fila}>
              <Ionicons name="call-outline" size={16} color={colors.primario} />
              <Text style={styles.filaText}>{f.telefono}</Text>
            </View>
          )}
        </View>

        <View style={styles.acciones}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.acento }]}
            onPress={() => f.telefono && Linking.openURL(`tel:${f.telefono}`)}
          >
            <Ionicons name="call" size={18} color={colors.blanco} />
            <Text style={styles.btnText}>Llamar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primario }]}
            onPress={() => f.maps && Linking.openURL(f.maps)}
          >
            <Ionicons name="navigate" size={18} color={colors.blanco} />
            <Text style={styles.btnText}>Cómo llegar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primario,
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titulo: { fontSize: 24, fontWeight: '700' as const, color: colors.blanco, marginBottom: 2 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.blanco,
    borderBottomWidth: 1,
    borderBottomColor: colors.gris,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: { fontSize: 13, fontWeight: '500' as const, color: colors.grisMedio },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  centroText: { fontSize: 15, color: colors.grisMedio, marginTop: 4 },
  slide: { padding: 16 },
  card: {
    backgroundColor: colors.fondoTarjeta,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  badge: {
    margin: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { color: colors.blanco, fontSize: 11, fontWeight: '700' as const },
  imagen: { width: '100%', height: 200 },
  imagenPlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: colors.grisClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { padding: 16, gap: 8 },
  nombre: { fontSize: 20, fontWeight: '700' as const, color: colors.texto, marginBottom: 4 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  filaText: { fontSize: 14, color: colors.textoSecundario, flex: 1 },
  acciones: { padding: 16, gap: 10 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 10,
  },
  btnText: { color: colors.blanco, fontSize: 15, fontWeight: '600' as const },
});
