import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  card: {
    backgroundColor: colors.fondoTarjeta,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  button: {
    backgroundColor: colors.primario,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.texto,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gris,
    marginVertical: 12,
  },
});

export default globalStyles;
