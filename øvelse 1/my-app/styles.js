import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#F4F3FB',      
  card: '#FFFFFF',            
  primary: '#6C63FF',         
  primaryDark: '#5146D9',     
  secondary: '#4A90E2',    
  text: '#1A1A1A',         
  textLight: '#777777',      
  border: '#E0E0E0',         
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textLight,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3, // Android shadow
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
  },
  item: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  rating: {
    marginTop: 6,
    color: COLORS.secondary,
    fontWeight: '500',
  },

  errorText: 
  { color: '#D14343', 
    marginBottom: 8, 
    fontWeight: '600' },

});
