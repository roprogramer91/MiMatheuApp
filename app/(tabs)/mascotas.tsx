import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMascotas, Mascota, reportarMascota, TipoMascota } from '../../services/mascotaService';
import colors from '../../src/constants/colors';
import globalStyles from '../../src/styles/globalStyles';

type Filtro = TipoMascota | 'todos';

const FILTROS: { key: Filtro; label: string; emoji: string }[] = [
  { key: 'todos', label: 'Todos', emoji: '🐾' },
  { key: 'perro', label: 'Perros', emoji: '🐶' },
  { key: 'gato', label: 'Gatos', emoji: '🐱' },
  { key: 'otro', label: 'Otros', emoji: '🐰' },
];

const COLORES_TIPO: Record<TipoMascota, string> = {
  perro: '#f97316',
  gato: '#3b82f6',
  otro: '#8b5cf6',
};

const CAMPOS_VACIOS = {
  nombre: '',
  tipo: 'perro' as TipoMascota,
  descripcion: '',
  zona: '',
  fechaPerdida: '',
  contacto: '',
};

export default function Mascotas() {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(CAMPOS_VACIOS);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('visits_mascotas').then(v => {
      AsyncStorage.setItem('visits_mascotas', String(parseInt(v ?? '0', 10) + 1));
    }).catch(() => {});
  }, []);

  const cargar = useCallback(async (tipo: Filtro) => {
    try {
      setLoading(true);
      setError(false);
      const data = await getMascotas(tipo);
      setMascotas(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar(filtro);
  }, [filtro, cargar]);

  async function handleReportar() {
    if (!form.nombre || !form.descripcion || !form.zona || !form.fechaPerdida || !form.contacto) {
      Alert.alert('Campos incompletos', 'Completá todos los campos antes de reportar.');
      return;
    }
    try {
      setGuardando(true);
      await reportarMascota({ ...form, color: COLORES_TIPO[form.tipo] });
      setForm(CAMPOS_VACIOS);
      setModalVisible(false);
      Alert.alert('Reporte enviado', 'La mascota fue reportada correctamente.');
      cargar(filtro);
    } catch {
      Alert.alert('Error', 'No se pudo enviar el reporte. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo}>Mascotas Perdidas</Text>
          <Text style={styles.sub}>{!loading && !error ? `${mascotas.length} reportes en Matheu` : 'Matheu'}</Text>
        </View>
        <TouchableOpacity style={styles.reportBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={20} color={colors.blanco} />
          <Text style={styles.reportBtnText}>Reportar</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroScroll} contentContainerStyle={styles.filtroContent}>
        {FILTROS.map(f => (
          <TouchableOpacity key={f.key} style={[styles.chip, filtro === f.key && styles.chipActivo]} onPress={() => setFiltro(f.key)}>
            <Text style={styles.chipEmoji}>{f.emoji}</Text>
            <Text style={[styles.chipText, filtro === f.key && styles.chipTextActivo]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
          <TouchableOpacity style={globalStyles.button} onPress={() => cargar(filtro)}>
            <Text style={globalStyles.buttonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && mascotas.length === 0 && (
        <View style={styles.centro}>
          <Ionicons name="paw-outline" size={48} color={colors.grisMedio} />
          <Text style={styles.centroText}>No hay reportes activos</Text>
        </View>
      )}

      {!loading && !error && mascotas.length > 0 && (
        <ScrollView contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}>
          {mascotas.map(m => <CardMascota key={m.id} mascota={m} />)}
          <View style={{ height: 20 }} />
        </ScrollView>
      )}

      {/* Modal reportar */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Reportar mascota perdida</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.texto} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Tipo</Text>
              <View style={styles.tipoRow}>
                {(['perro', 'gato', 'otro'] as TipoMascota[]).map(t => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.tipoBtn, form.tipo === t && { backgroundColor: COLORES_TIPO[t] }]}
                    onPress={() => setForm(f => ({ ...f, tipo: t }))}
                  >
                    <Text style={[styles.tipoBtnText, form.tipo === t && { color: colors.blanco }]}>
                      {t === 'perro' ? '🐶 Perro' : t === 'gato' ? '🐱 Gato' : '🐾 Otro'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {[
                { key: 'nombre', label: 'Nombre', placeholder: 'Ej: Luna' },
                { key: 'descripcion', label: 'Descripción', placeholder: 'Color, tamaño, collar...' },
                { key: 'zona', label: 'Zona donde se perdió', placeholder: 'Ej: B° Centro' },
                { key: 'fechaPerdida', label: 'Fecha', placeholder: 'Ej: 23/05/2026' },
                { key: 'contacto', label: 'Teléfono de contacto', placeholder: 'Ej: 1140001111' },
              ].map(({ key, label, placeholder }) => (
                <View key={key}>
                  <Text style={styles.label}>{label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.grisMedio}
                    value={form[key as keyof typeof CAMPOS_VACIOS]}
                    onChangeText={v => setForm(f => ({ ...f, [key]: v }))}
                    keyboardType={key === 'contacto' ? 'phone-pad' : 'default'}
                    multiline={key === 'descripcion'}
                  />
                </View>
              ))}

              <TouchableOpacity
                style={[globalStyles.button, guardando && { opacity: 0.6 }]}
                onPress={handleReportar}
                disabled={guardando}
              >
                {guardando
                  ? <ActivityIndicator color={colors.blanco} />
                  : <Text style={globalStyles.buttonText}>Enviar reporte</Text>
                }
              </TouchableOpacity>
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
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
          <TouchableOpacity style={styles.llamarBtn} onPress={() => Linking.openURL(`tel:${m.contacto}`)}>
            <Ionicons name="call-outline" size={14} color={colors.primario} />
            <Text style={styles.llamarText}>Llamar al dueño</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.primario, paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'flex-end' },
  titulo: { fontSize: 24, fontWeight: '700' as const, color: colors.blanco, marginBottom: 2 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  reportBtn: { backgroundColor: colors.acento, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  reportBtnText: { color: colors.blanco, fontSize: 13, fontWeight: '600' as const },
  filtroScroll: { flexGrow: 0, paddingVertical: 10 },
  filtroContent: { paddingHorizontal: 16, gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: colors.grisClaro, borderWidth: 1, borderColor: 'transparent' },
  chipActivo: { backgroundColor: colors.primarioClaro, borderColor: colors.primario },
  chipEmoji: { fontSize: 14 },
  chipText: { fontSize: 13, fontWeight: '500' as const, color: colors.grisOscuro },
  chipTextActivo: { color: colors.primario, fontWeight: '700' as const },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  centroText: { fontSize: 15, color: colors.grisMedio, marginTop: 4 },
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
  llamarBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, backgroundColor: colors.primarioClaro, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start' },
  llamarText: { fontSize: 12, color: colors.primario, fontWeight: '600' as const },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: colors.blanco, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  modalTitulo: { fontSize: 18, fontWeight: '700' as const, color: colors.texto },
  label: { fontSize: 13, fontWeight: '600' as const, color: colors.textoSecundario, marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: colors.gris, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: colors.texto, backgroundColor: colors.grisClaro },
  tipoRow: { flexDirection: 'row', gap: 8 },
  tipoBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: colors.gris, alignItems: 'center', backgroundColor: colors.grisClaro },
  tipoBtnText: { fontSize: 13, fontWeight: '600' as const, color: colors.texto },
});
