import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../src/constants/colors';
import globalStyles from '../../src/styles/globalStyles';

const FOTO_KEY = 'profile_photo';

export default function Perfil() {
  const [foto, setFoto] = useState<string | null>(null);
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(FOTO_KEY).then(v => { if (v) setFoto(v); }).catch(() => {});
  }, []);

  async function elegirFoto() {
    Alert.alert('Foto de perfil', 'Elegí cómo querés subir tu foto', [
      { text: 'Galería', onPress: abrirGaleria },
      { text: 'Cámara', onPress: abrirCamara },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  }

  async function abrirGaleria() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== 'granted') { Alert.alert('Permiso denegado'); return; }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled && res.assets[0]) guardarFoto(res.assets[0].uri);
  }

  async function abrirCamara() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (perm.status !== 'granted') { Alert.alert('Permiso denegado'); return; }
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled && res.assets[0]) guardarFoto(res.assets[0].uri);
  }

  async function guardarFoto(uri: string) {
    setFoto(uri);
    await AsyncStorage.setItem(FOTO_KEY, uri).catch(() => {});
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarWrap} onPress={elegirFoto}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={44} color={colors.blanco} />
            </View>
          )}
          <View style={styles.cameraTag}>
            <Ionicons name="camera" size={13} color={colors.blanco} />
          </View>
        </TouchableOpacity>
        <Text style={styles.titulo}>Mi Perfil</Text>
        <Text style={styles.sub}>Tocá la foto para cambiarla</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Configuración */}
        <View style={[globalStyles.card, { marginTop: 16 }]}>
          <Text style={globalStyles.sectionTitle}>Configuración</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.primarioClaro }]}>
                <Ionicons name="notifications-outline" size={20} color={colors.primario} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Notificaciones</Text>
                <Text style={styles.settingDesc}>Requiere build de producción</Text>
              </View>
            </View>
            <Switch
              value={notif}
              onValueChange={v => {
                setNotif(v);
                if (v) Alert.alert('Info', 'Las notificaciones push estarán disponibles en la versión publicada de la app.');
              }}
              trackColor={{ false: colors.gris, true: colors.primario }}
              thumbColor={colors.blanco}
            />
          </View>
        </View>

        {/* Acerca de */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Acerca de</Text>
          <View style={styles.infoRow}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primarioClaro }]}>
              <Ionicons name="information-circle-outline" size={20} color={colors.primario} />
            </View>
            <View>
              <Text style={styles.infoLabel}>Versión</Text>
              <Text style={styles.infoVal}>1.0.0</Text>
            </View>
          </View>
          <View style={globalStyles.divider} />
          <View style={styles.infoRow}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primarioClaro }]}>
              <Ionicons name="location-outline" size={20} color={colors.primario} />
            </View>
            <View>
              <Text style={styles.infoLabel}>Zona</Text>
              <Text style={styles.infoVal}>Matheu, Buenos Aires</Text>
            </View>
          </View>
        </View>

        {/* Contacto */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Contacto</Text>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => Alert.alert('Feedback', 'Próximamente podrás enviarnos feedback.')}
          >
            <View style={[styles.settingIcon, { backgroundColor: colors.acentoClaro }]}>
              <Ionicons name="mail-outline" size={20} color={colors.acento} />
            </View>
            <Text style={[styles.infoVal, { flex: 1 }]}>Enviar feedback</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.grisMedio} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primario,
    paddingTop: 56,
    paddingBottom: 24,
    alignItems: 'center',
  },
  avatarWrap: { position: 'relative', marginBottom: 10 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cameraTag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.acento,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primario,
  },
  titulo: { fontSize: 20, fontWeight: '700' as const, color: colors.blanco, marginBottom: 2 },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  settingIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { fontSize: 14, fontWeight: '600' as const, color: colors.texto },
  settingDesc: { fontSize: 11, color: colors.grisMedio, marginTop: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 2 },
  infoLabel: { fontSize: 11, color: colors.grisMedio, marginBottom: 1 },
  infoVal: { fontSize: 14, fontWeight: '500' as const, color: colors.texto },
});
