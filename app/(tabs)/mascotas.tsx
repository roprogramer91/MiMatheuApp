import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMascotas, Mascota, reportarMascota, subirFoto, TipoMascota } from '../../services/mascotaService';
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
  contacto: '',
  publicadoPor: '',
};

function formatFecha(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}/${date.getFullYear()}`;
}

type Errores = Partial<Record<keyof typeof CAMPOS_VACIOS | 'fecha' | 'foto', string>>;

export default function Mascotas() {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(CAMPOS_VACIOS);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [errores, setErrores] = useState<Errores>({});
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

  useEffect(() => { cargar(filtro); }, [filtro, cargar]);

  function onCerrarModal() {
    setModalVisible(false);
    setForm(CAMPOS_VACIOS);
    setFecha(null);
    setFotoUri(null);
    setErrores({});
  }

  async function elegirFoto() {
    Alert.alert('Foto de la mascota', 'Elegí cómo querés subir la foto', [
      {
        text: 'Galería', onPress: async () => {
          const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (perm.status !== 'granted') { Alert.alert('Permiso denegado'); return; }
          const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
          if (!res.canceled && res.assets[0]) { setFotoUri(res.assets[0].uri); setErrores(e => ({ ...e, foto: undefined })); }
        }
      },
      {
        text: 'Cámara', onPress: async () => {
          const perm = await ImagePicker.requestCameraPermissionsAsync();
          if (perm.status !== 'granted') { Alert.alert('Permiso denegado'); return; }
          const res = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });
          if (!res.canceled && res.assets[0]) { setFotoUri(res.assets[0].uri); setErrores(e => ({ ...e, foto: undefined })); }
        }
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  }

  function validar(): boolean {
    const e: Errores = {};
    if (!form.publicadoPor.trim()) e.publicadoPor = 'Ingresá tu nombre';
    if (!form.nombre.trim() || form.nombre.trim().length < 2) e.nombre = 'Ingresá el nombre (mínimo 2 caracteres)';
    if (!form.descripcion.trim()) e.descripcion = 'Describí a la mascota';
    if (!form.zona.trim()) e.zona = 'Ingresá la zona donde se perdió';
    if (!fecha) e.fecha = 'Seleccioná la fecha en que se perdió';
    if (!form.contacto || form.contacto.length < 8) e.contacto = 'Ingresá un teléfono válido (mín. 8 dígitos)';
    if (!fotoUri) e.foto = 'La foto es obligatoria';
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  async function handleReportar() {
    if (!validar()) return;
    try {
      setGuardando(true);
      const fotoUrl = await subirFoto(fotoUri!);
      await reportarMascota({
        ...form,
        fechaPerdida: formatFecha(fecha!),
        color: COLORES_TIPO[form.tipo],
        foto: fotoUrl,
      });
      onCerrarModal();
      Alert.alert('Reporte enviado', 'La mascota fue reportada correctamente.');
      cargar(filtro);
    } catch {
      Alert.alert('Error', 'No se pudo enviar el reporte. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  }

  function onChangeFecha(_: DateTimePickerEvent, selected?: Date) {
    setShowPicker(Platform.OS === 'ios');
    if (selected) { setFecha(selected); setErrores(e => ({ ...e, fecha: undefined })); }
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroScroll} contentContainerStyle={styles.filtroContent}>
        {FILTROS.map(f => (
          <TouchableOpacity key={f.key} style={[styles.chip, filtro === f.key && styles.chipActivo]} onPress={() => setFiltro(f.key)}>
            <Text style={styles.chipEmoji}>{f.emoji}</Text>
            <Text style={[styles.chipText, filtro === f.key && styles.chipTextActivo]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && <View style={styles.centro}><ActivityIndicator size="large" color={colors.primario} /><Text style={styles.centroText}>Cargando...</Text></View>}
      {error && (
        <View style={styles.centro}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={styles.centroText}>Error al cargar</Text>
          <TouchableOpacity style={globalStyles.button} onPress={() => cargar(filtro)}><Text style={globalStyles.buttonText}>Reintentar</Text></TouchableOpacity>
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
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={onCerrarModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Reportar mascota perdida</Text>
              <TouchableOpacity onPress={onCerrarModal}><Ionicons name="close" size={24} color={colors.texto} /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

              {/* Foto */}
              <Text style={styles.label}>Foto de la mascota <Text style={styles.requerido}>*</Text></Text>
              <TouchableOpacity style={[styles.fotoBtn, errores.foto ? styles.inputError : null]} onPress={elegirFoto}>
                {fotoUri ? (
                  <Image source={{ uri: fotoUri }} style={styles.fotoPreview} />
                ) : (
                  <View style={styles.fotoPlaceholder}>
                    <Ionicons name="camera-outline" size={32} color={colors.grisMedio} />
                    <Text style={styles.fotoPlaceholderText}>Tocá para agregar foto</Text>
                  </View>
                )}
              </TouchableOpacity>
              {errores.foto && <Text style={styles.errorText}>{errores.foto}</Text>}

              {/* Tu nombre */}
              <Text style={styles.label}>Tu nombre <Text style={styles.requerido}>*</Text></Text>
              <TextInput
                style={[styles.input, errores.publicadoPor ? styles.inputError : null]}
                placeholder="¿Quién publica este reporte?"
                placeholderTextColor={colors.grisMedio}
                value={form.publicadoPor}
                onChangeText={v => { setForm(f => ({ ...f, publicadoPor: v })); setErrores(e => ({ ...e, publicadoPor: undefined })); }}
              />
              {errores.publicadoPor && <Text style={styles.errorText}>{errores.publicadoPor}</Text>}

              {/* Tipo */}
              <Text style={styles.label}>Tipo de mascota</Text>
              <View style={styles.tipoRow}>
                {(['perro', 'gato', 'otro'] as TipoMascota[]).map(t => (
                  <TouchableOpacity key={t} style={[styles.tipoBtn, form.tipo === t && { backgroundColor: COLORES_TIPO[t], borderColor: COLORES_TIPO[t] }]} onPress={() => setForm(f => ({ ...f, tipo: t }))}>
                    <Text style={[styles.tipoBtnText, form.tipo === t && { color: colors.blanco }]}>
                      {t === 'perro' ? '🐶 Perro' : t === 'gato' ? '🐱 Gato' : '🐾 Otro'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Nombre mascota */}
              <Text style={styles.label}>Nombre de la mascota <Text style={styles.requerido}>*</Text></Text>
              <TextInput
                style={[styles.input, errores.nombre ? styles.inputError : null]}
                placeholder="Ej: Luna"
                placeholderTextColor={colors.grisMedio}
                value={form.nombre}
                onChangeText={v => { setForm(f => ({ ...f, nombre: v })); setErrores(e => ({ ...e, nombre: undefined })); }}
              />
              {errores.nombre && <Text style={styles.errorText}>{errores.nombre}</Text>}

              {/* Descripción */}
              <Text style={styles.label}>Descripción <Text style={styles.requerido}>*</Text></Text>
              <TextInput
                style={[styles.input, styles.inputMulti, errores.descripcion ? styles.inputError : null]}
                placeholder="Color, tamaño, collar, señas particulares..."
                placeholderTextColor={colors.grisMedio}
                value={form.descripcion}
                onChangeText={v => { setForm(f => ({ ...f, descripcion: v })); setErrores(e => ({ ...e, descripcion: undefined })); }}
                multiline numberOfLines={3} textAlignVertical="top"
              />
              {errores.descripcion && <Text style={styles.errorText}>{errores.descripcion}</Text>}

              {/* Zona */}
              <Text style={styles.label}>Zona donde se perdió <Text style={styles.requerido}>*</Text></Text>
              <TextInput
                style={[styles.input, errores.zona ? styles.inputError : null]}
                placeholder="Ej: B° Centro, Ruta 6 zona..."
                placeholderTextColor={colors.grisMedio}
                value={form.zona}
                onChangeText={v => { setForm(f => ({ ...f, zona: v })); setErrores(e => ({ ...e, zona: undefined })); }}
              />
              {errores.zona && <Text style={styles.errorText}>{errores.zona}</Text>}

              {/* Fecha */}
              <Text style={styles.label}>Fecha en que se perdió <Text style={styles.requerido}>*</Text></Text>
              <TouchableOpacity style={[styles.input, styles.fechaBtn, errores.fecha ? styles.inputError : null]} onPress={() => setShowPicker(true)}>
                <Ionicons name="calendar-outline" size={18} color={fecha ? colors.texto : colors.grisMedio} />
                <Text style={[styles.fechaText, !fecha && { color: colors.grisMedio }]}>{fecha ? formatFecha(fecha) : 'Seleccioná la fecha'}</Text>
              </TouchableOpacity>
              {errores.fecha && <Text style={styles.errorText}>{errores.fecha}</Text>}
              {showPicker && (
                <DateTimePicker value={fecha ?? new Date()} mode="date" display={Platform.OS === 'ios' ? 'inline' : 'default'} maximumDate={new Date()} onChange={onChangeFecha} />
              )}

              {/* Contacto */}
              <Text style={styles.label}>Teléfono de contacto <Text style={styles.requerido}>*</Text></Text>
              <TextInput
                style={[styles.input, errores.contacto ? styles.inputError : null]}
                placeholder="Ej: 1140001111"
                placeholderTextColor={colors.grisMedio}
                value={form.contacto}
                onChangeText={v => { const n = v.replace(/[^0-9]/g, ''); setForm(f => ({ ...f, contacto: n })); setErrores(e => ({ ...e, contacto: undefined })); }}
                keyboardType="numeric" maxLength={15}
              />
              {errores.contacto && <Text style={styles.errorText}>{errores.contacto}</Text>}

              <TouchableOpacity style={[globalStyles.button, { marginTop: 20 }, guardando && { opacity: 0.6 }]} onPress={handleReportar} disabled={guardando}>
                {guardando ? <ActivityIndicator color={colors.blanco} /> : <Text style={globalStyles.buttonText}>Enviar reporte</Text>}
              </TouchableOpacity>
              <View style={{ height: 30 }} />
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
        {m.foto ? (
          <Image source={{ uri: m.foto }} style={styles.fotoCard} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: m.color + '20' }]}>
            <Text style={styles.avatarEmoji}>{emojis[m.tipo]}</Text>
          </View>
        )}
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
          {!!m.publicadoPor && (
            <View style={styles.metaFila}>
              <Ionicons name="person-outline" size={12} color={colors.grisMedio} />
              <Text style={styles.metaText}>Publicado por {m.publicadoPor}</Text>
            </View>
          )}
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
  fotoCard: { width: 52, height: 52, borderRadius: 26 },
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
  modalBox: { backgroundColor: colors.blanco, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '92%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  modalTitulo: { fontSize: 18, fontWeight: '700' as const, color: colors.texto },
  label: { fontSize: 13, fontWeight: '600' as const, color: colors.textoSecundario, marginBottom: 6, marginTop: 14 },
  requerido: { color: colors.error },
  input: { borderWidth: 1, borderColor: colors.gris, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 14, color: colors.texto, backgroundColor: colors.grisClaro },
  inputMulti: { minHeight: 72, paddingTop: 10 },
  inputError: { borderColor: colors.error },
  errorText: { fontSize: 12, color: colors.error, marginTop: 4 },
  fechaBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fechaText: { fontSize: 14, color: colors.texto },
  tipoRow: { flexDirection: 'row', gap: 8 },
  tipoBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.gris, alignItems: 'center', backgroundColor: colors.grisClaro },
  tipoBtnText: { fontSize: 13, fontWeight: '600' as const, color: colors.texto },
  fotoBtn: { borderWidth: 1, borderColor: colors.gris, borderRadius: 12, overflow: 'hidden', borderStyle: 'dashed' },
  fotoPreview: { width: '100%', height: 160 },
  fotoPlaceholder: { height: 120, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.grisClaro },
  fotoPlaceholderText: { fontSize: 13, color: colors.grisMedio },
});
