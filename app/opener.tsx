import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../src/constants/colors';
import globalStyles from '../src/styles/globalStyles';
import { getToken } from '../src/utils/auth';

export default function OpenerScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(async () => {
      const token = await getToken();
      router.replace(token ? '/(tabs)' : '/login');
    }, 1400);

    return () => clearTimeout(timeout);
  }, [router, opacity, scale, subtitleOpacity]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <StatusBar style="light" />

      <View style={styles.center}>
        <Animated.View style={[styles.logoCircle, { transform: [{ scale }], opacity }]}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.title}>MiMatheu</Text>
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          Tu guía local en Matheu, Buenos Aires
        </Animated.Text>
      </View>

      <Text style={styles.smallText}>Cargando información...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: colors.textoSecundario,
    fontSize: 16,
  },
  header: {
    marginTop: 64,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primarioClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: '800' as const,
    color: colors.texto,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textoSecundario,
  },
  cardsRow: {
    marginTop: 16,
  },
  infoCard: {
    backgroundColor: colors.fondoTarjeta,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gris,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: colors.texto,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textoSecundario,
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  smallText: {
    fontSize: 12,
    color: colors.grisMedio,
    textAlign: 'center',
  },
});

