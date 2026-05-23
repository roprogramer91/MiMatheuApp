import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../src/constants/colors';
import { login, recuperar, registrar } from '../src/utils/auth';

type Modo = 'login' | 'registro' | 'recuperar';

export default function Login() {
  const router = useRouter();
  const [modo, setModo] = useState<Modo>('login');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  function limpiar() {
    setTelefono('');
    setNombre('');
    setEmail('');
    setError('');
  }

  function cambiarModo(m: Modo) {
    limpiar();
    setModo(m);
  }

  async function handleSubmit() {
    setError('');

    if (modo === 'login') {
      if (!telefono.trim() || telefono.trim().length < 8) {
        setError('Ingresá tu número de teléfono');
        return;
      }
      try {
        setCargando(true);
        await login(telefono.trim());
        router.replace('/');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }

    if (modo === 'registro') {
      if (!nombre.trim()) { setError('Ingresá tu nombre'); return; }
      if (!telefono.trim() || telefono.trim().length < 8) { setError('Ingresá tu número de teléfono'); return; }
      try {
        setCargando(true);
        await registrar({ nombre: nombre.trim(), telefono: telefono.trim(), email: email.trim() || undefined });
        router.replace('/');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }

    if (modo === 'recuperar') {
      if (!email.trim()) { setError('Ingresá tu email'); return; }
      try {
        setCargando(true);
        await recuperar(email.trim());
        router.replace('/');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Ionicons name="location" size={40} color={colors.blanco} />
          </View>
          <Text style={styles.appNombre}>MiMatheu</Text>
          <Text style={styles.appSub}>Tu barrio en un solo lugar</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Tabs login / registro */}
          {modo !== 'recuperar' && (
            <View style={styles.tabs}>
              <TouchableOpacity style={[styles.tab, modo === 'login' && styles.tabActivo]} onPress={() => cambiarModo('login')}>
                <Text style={[styles.tabText, modo === 'login' && styles.tabTextActivo]}>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tab, modo === 'registro' && styles.tabActivo]} onPress={() => cambiarModo('registro')}>
                <Text style={[styles.tabText, modo === 'registro' && styles.tabTextActivo]}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          )}

          {modo === 'recuperar' && (
            <TouchableOpacity style={styles.backBtn} onPress={() => cambiarModo('login')}>
              <Ionicons name="arrow-back" size={20} color={colors.primario} />
              <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
          )}

          <View style={styles.form}>

            {/* Nombre — solo en registro */}
            {modo === 'registro' && (
              <>
                <Text style={styles.label}>Tu nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cómo te llamás?"
                  placeholderTextColor={colors.grisMedio}
                  value={nombre}
                  onChangeText={v => { setNombre(v); setError(''); }}
                  autoCapitalize="words"
                />
              </>
            )}

            {/* Teléfono — login y registro */}
            {modo !== 'recuperar' && (
              <>
                <Text style={styles.label}>Número de teléfono</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: 1140001111"
                  placeholderTextColor={colors.grisMedio}
                  value={telefono}
                  onChangeText={v => { setTelefono(v.replace(/[^0-9]/g, '')); setError(''); }}
                  keyboardType="numeric"
                  maxLength={15}
                />
              </>
            )}

            {/* Email — registro (opcional) y recuperar */}
            {(modo === 'registro' || modo === 'recuperar') && (
              <>
                <Text style={styles.label}>
                  Email {modo === 'registro' && <Text style={styles.opcional}>(opcional — para recuperar cuenta)</Text>}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="tu@email.com"
                  placeholderTextColor={colors.grisMedio}
                  value={email}
                  onChangeText={v => { setEmail(v); setError(''); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </>
            )}

            {/* Error */}
            {!!error && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color={colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Botón principal */}
            <TouchableOpacity style={[styles.btn, cargando && { opacity: 0.6 }]} onPress={handleSubmit} disabled={cargando}>
              {cargando
                ? <ActivityIndicator color={colors.blanco} />
                : <Text style={styles.btnText}>
                    {modo === 'login' ? 'Ingresar' : modo === 'registro' ? 'Crear cuenta' : 'Recuperar cuenta'}
                  </Text>
              }
            </TouchableOpacity>

            {/* Link recuperar — solo en login */}
            {modo === 'login' && (
              <TouchableOpacity style={styles.linkBtn} onPress={() => cambiarModo('recuperar')}>
                <Text style={styles.linkText}>¿Cambiaste de número? Recuperá tu cuenta con el email</Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: colors.primario },
  header: { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
  logoWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  appNombre: { fontSize: 32, fontWeight: '700' as const, color: colors.blanco, marginBottom: 4 },
  appSub: { fontSize: 15, color: 'rgba(255,255,255,0.8)' },
  card: { backgroundColor: colors.blanco, borderTopLeftRadius: 28, borderTopRightRadius: 28, flex: 1, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.gris, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActivo: { borderBottomWidth: 2, borderBottomColor: colors.primario },
  tabText: { fontSize: 15, fontWeight: '500' as const, color: colors.grisMedio },
  tabTextActivo: { color: colors.primario, fontWeight: '700' as const },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 16 },
  backText: { fontSize: 15, color: colors.primario, fontWeight: '600' as const },
  form: { gap: 4 },
  label: { fontSize: 13, fontWeight: '600' as const, color: colors.textoSecundario, marginBottom: 6, marginTop: 14 },
  opcional: { fontSize: 11, fontWeight: '400' as const, color: colors.grisMedio },
  input: { borderWidth: 1, borderColor: colors.gris, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: colors.texto, backgroundColor: colors.grisClaro },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#fef2f2', borderRadius: 10, padding: 12, marginTop: 8 },
  errorText: { fontSize: 13, color: colors.error, flex: 1 },
  btn: { backgroundColor: colors.primario, borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 20 },
  btnText: { color: colors.blanco, fontSize: 16, fontWeight: '700' as const },
  linkBtn: { alignItems: 'center', paddingVertical: 16 },
  linkText: { fontSize: 13, color: colors.primario, textAlign: 'center' },
});
