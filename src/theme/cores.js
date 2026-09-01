export const cores = {
  preto: '#1a1a1a',
  cinzaEscuro: '#333333',
  cinzaMedio: '#767676',
  cinzaClaro: '#e0e0e0',
  fundoClaro: '#f7f7f7',
  branco: '#ffffff',
};

export const estiloInput = {
  display: 'block',
  marginBottom: 12,
  width: '100%',
  padding: 10,
  color: cores.preto,
  background: cores.branco,
  border: `1px solid ${cores.cinzaClaro}`,
  borderRadius: 6,
  boxSizing: 'border-box',
  fontSize: 14,
};

export const estiloBotaoPrimario = {
  padding: '10px 20px',
  background: cores.preto,
  color: cores.branco,
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 0.3,
};

export const estiloBotaoSecundario = {
  padding: '8px 16px',
  background: 'transparent',
  color: cores.cinzaEscuro,
  border: `1px solid ${cores.cinzaClaro}`,
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
};