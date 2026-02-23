import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Mascota, mockMascotas, TipoMascota } from '../../services/mockMascotas';
import colors from '../../src/constants/colors';
import globalStyles from '../../src/styles/globalStyles';

type Filtro = TipoMascota | 'todos';

const FILTROS: { key: Filtro; label: string; emoji: string }[] = [
  { key: 'todos', label: 'Todos', emoji: '🐾' },
  { key: 'perro', label: 'Perros', emoji: '🐶' },
  { key: 'gato', label: 'Gatos', emoji: '🐱' },
  { key: 'otro', label: 'Otros', emoji: '🐰' },
];

export default function Mascotas() {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  useEffect(() => {
    AsyncStorage.getItem('visits_mascotas').then(v => {
      AsyncStorage.setItem('visits_mascotas', String(parseInt(v ?? '0', 10) + 1));
    }).catch(() => {});
  }, []);

  const lista = filtro === 'todos' ? mockMascotas : mockMascotas.filter(m => m.tipo === filtro);

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo}>Mascotas Perdidas</Text>
          <Text style={styles.sub}>{mockMascotas.length} reportes en Matheu</Text>
        </View>
        <TouchableOpacity
          style={styles.reportBtn}
          onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto.')}
        >
          <Ionicons name="add" size={20} color={colors.blanco} />
          <Text style={styles.reportBtnText}>Reportar</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.filtroScroll}
        contentContainerStyle={styles.filtroContent}
      >
        {FILTROS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.chip, filtro === f.key && styles.chipActivo]}
            onPress={() => setFiltro(f.key)}
          >
            <Text style={styles.chipEmoji}>{f.emoji}</Text>
            <Text style={[styles.chipText, filtro === f.key && styles.chipTextActivo]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}>
        {lista.map(m => <CardMascota key={m.id} mascota={m} />)}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function CardMascota({ mascota: m }: { mascota: Mascota }) {
  const emojis: Record<TipoMascota, string> = { perro: '🐶', gato: '🐱', otro: '🐾' };
  return (
    <View style={[globalStyles.card, styles.card]}>
      <View style={[styles.accent, { backgroundColor: m.color }]} />
      <View style={styles.cardBody}>
        <View style={[styles.avatar, { backgroundColor: m.color + '20' }]}>
          <Text style={styles.avatarEmoji}>{emojis[m.tipo]}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.cardTitulo}>
            <Text style={styles.nombre}>{m.nombre}</Text>
            <View style={[styles.tipoBadge, { backgroundColor: m.color + '20' }]}>
              <Text style={[styles.tipoText, { color: m.color }]}>{m.tipo}</Text>
            </View>
          </View>
          <Text style={styles.desc}>{m.descripcion}</Text>
          <View style={styles.metaFila}>
            <Ionicons name="location-outline" size={12} color={colors.grisMedio} />
            <Text style={styles.metaText}>{m.zona}</Text>
          </View>
          <View style={styles.metaFila}>
            <Ionicons name="calendar-outline" size={12} color={colors.grisMedio} />
            <Text style={styles.metaText}>Perdida el {m.fechaPerdida}</Text>
          </View>
          <TouchableOpacity
            style={styles.llamarBtn}
            onPress={() => Linking.openURL(`tel:${m.contacto}`)}
          >
            <Ionicons name="call-outline" size={14} color={colors.primario} />
            <Text style={styles.llamarText}>Llamar al dueño</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primario,
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titulo: { fontSize: 24, fontWeight: '700' as const, color: colors.blanco, marginBottom: 2 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  reportBtn: {
    backgroundColor: colors.acento,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reportBtnText: { color: colors.blanco, fontSize: 13, fontWeight: '600' as const },
  filtroScroll: { flexGrow: 0, paddingVertical: 10 },
  filtroContent: { paddingHorizontal: 16, gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.grisClaro,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipActivo: { backgroundColor: colors.primarioClaro, borderColor: colors.primario },
  chipEmoji: { fontSize: 14 },
  chipText: { fontSize: 13, fontWeight: '500' as const, color: colors.grisOscuro },
  chipTextActivo: { color: colors.primario, fontWeight: '700' as const },
  lista: { paddingTop: 4 },
  card: { padding: 0, flexDirection: 'row', overflow: 'hidden' },
  accent: { width: 4 },
  cardBody: { flex: 1, flexDirection: 'row', padding: 12, gap: 10 },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 26 },
  cardTitulo: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  nombre: { fontSize: 17, fontWeight: '700' as const, color: colors.texto },
  tipoBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  tipoText: { fontSize: 10, fontWeight: '700' as const, textTransform: 'capitalize' as const },
  desc: { fontSize: 12, color: colors.textoSecundario, marginBottom: 4, lineHeight: 17 },
  metaFila: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 2 },
  metaText: { fontSize: 11, color: colors.grisMedio },
  llamarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    backgroundColor: colors.primarioClaro,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  llamarText: { fontSize: 12, color: colors.primario, fontWeight: '600' as const },
});
