//style til profi, login, mine reviews og favoritter skærmene
// styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f8f9fa',
  },
  containerCentered: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },

  // Typografi
  title: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 40,
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  titleLarge: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 8,
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Knapper
  btn: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
  btnLarge: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  btnTextSecondary: {
    color: '#000',
  },

  // Cards/lister
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  // Utility classes
  textCenter: {
    textAlign: 'center',
  },
  mb20: {
    marginBottom: 20,
  },
  mb40: {
    marginBottom: 40,
  },
//Forside.js
containerCentered: {
  flex: 1,
  padding: 30,
  backgroundColor: '#f8f9fa',
  justifyContent: 'center',
  alignItems: 'center',
},
});