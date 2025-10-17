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
  errorText: { 
    color: '#D14343', 
    marginBottom: 8, 
    fontWeight: '600',
  },

  // 🌍 --- Forside styles ---
  frontContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  frontTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  globe: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 40,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  reviewCard: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 12,
  padding: 14,
  marginHorizontal: 20,
  marginBottom: 10,
},
reviewHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 6,
},
starsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},
star: {
  fontSize: 18,
  marginRight: 2,
},
reviewMeta: {
  color: '#777777',
  fontSize: 12,
},
reviewBody: {
  color: '#1A1A1A',
  fontSize: 15,
  marginTop: 6,
},
row: { flexDirection: 'row', alignItems: 'center' },
spaceBetween: { justifyContent: 'space-between' },
chip: {
  backgroundColor: '#EEF1FF',
  color: '#5146D9',
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 8,
  fontSize: 12,
  overflow: 'hidden',
},
divider: {
  height: 1,
  backgroundColor: '#E0E0E0',
  marginVertical: 12,
},
smallBtn: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 10,
  marginRight: 8,
},
smallBtnText: {
  color: '#1A1A1A',
  fontSize: 14,
  fontWeight: '600',
},

  /* --- Country Advisories (NYE STYLES) --- */
  advisoryHeader: {
    // matcher title/subtitle spacing
    marginBottom: 8,
  },
  searchInline: {
    // samme visuelle sprog som 'input', men small tweaks til liste-søg
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  listSeparator: {
    height: 8,
  },
  listRow: {
    // som 'item', men i række med chevron
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRowContent: {
    flex: 1,
  },
  listRowTitle: {
    // matcher itemTitle
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  listRowMeta: {
    // sekundær tekstlinje (region/subregion)
    marginTop: 2,
    color: COLORS.textLight,
  },
  listRowHint: {
    // lille hjælpetekst ("Åbn UM-rejsevejledning")
    marginTop: 6,
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 22,
    color: COLORS.textLight,
    paddingLeft: 8,
  },
  errorBanner: {
    backgroundColor: '#FDECEC',
    borderColor: '#FAC5C5',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorBannerText: {
    color: '#D14343',
    fontWeight: '600',
  },

    /* --- Country Advisories --- */
    advisoryHeader: {
      marginBottom: 8,
    },
    searchInline: {
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 12,
      fontSize: 15,
    },
    listSeparator: {
      height: 8,
    },
    listRow: {
      backgroundColor: COLORS.card,
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    listRowContent: {
      flex: 1,
    },
    listRowTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
    },
    listRowMeta: {
      marginTop: 2,
      color: COLORS.textLight,
    },
    listRowHint: {
      marginTop: 6,
      fontSize: 12,
      color: COLORS.secondary,
      fontWeight: '500',
    },
    chevron: {
      fontSize: 22,
      color: COLORS.textLight,
      paddingLeft: 8,
    },
    errorBanner: {
      backgroundColor: '#FDECEC',
      borderColor: '#FAC5C5',
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    errorBannerText: {
      color: '#D14343',
      fontWeight: '600',
    },
  
    /* --- Country choice modal --- */
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      padding: 24,
    },
    modalBox: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      gap: 10,
    },
  
});

