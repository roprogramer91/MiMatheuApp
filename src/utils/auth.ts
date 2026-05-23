import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/api';

const TOKEN_KEY = 'auth_token';
const USUARIO_KEY = 'auth_usuario';

export interface Usuario {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getUsuario(): Promise<Usuario | null> {
  const raw = await AsyncStorage.getItem(USUARIO_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function guardarSesion(token: string, usuario: Usuario) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export async function cerrarSesion() {
  await AsyncStorage.multiRemove([TOKEN_KEY, USUARIO_KEY]);
}

export async function registrar(data: { nombre: string; telefono: string; email?: string }) {
  const res = await fetch(`${BASE_URL}/api/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Error al registrarse');
  await guardarSesion(json.token, json.usuario);
  return json.usuario as Usuario;
}

export async function login(telefono: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telefono }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Error al ingresar');
  await guardarSesion(json.token, json.usuario);
  return json.usuario as Usuario;
}

export async function recuperar(email: string) {
  const res = await fetch(`${BASE_URL}/api/auth/recuperar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Error al recuperar');
  await guardarSesion(json.token, json.usuario);
  return json.usuario as Usuario;
}
