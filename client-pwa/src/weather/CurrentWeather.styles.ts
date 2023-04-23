export const weatherStyles = {
  container: {
    minHeight: '15rem',
  },
  cardMain: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    margin: 10,
    textAlign: 'left',
    border: '1px solid #33333366',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff99',
    boxShadow: '4px 4px 2px 1px #33333333',
  },
  cardItem: {
    flex: 1,
  },
} as const;
