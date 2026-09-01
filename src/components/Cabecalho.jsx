import { useNavigate, Link } from 'react-router-dom';
import { cores, estiloBotaoSecundario } from '../theme/cores';

export default function Cabecalho({ titulo, mostrarVoltar = false }) {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const estiloLink = {
    ...estiloBotaoSecundario,
    color: cores.cinzaClaro,
    borderColor: cores.cinzaEscuro,
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <header
      style={{
        background: cores.preto,
        borderBottom: `1px solid ${cores.cinzaEscuro}`,
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {mostrarVoltar && (
          <button
            onClick={() => navigate(-1)}
            style={{
              ...estiloBotaoSecundario,
              color: cores.branco,
              borderColor: cores.cinzaEscuro,
            }}
          >
            ← Voltar
          </button>
        )}
        <h1
          style={{
            fontSize: 18,
            margin: 0,
            color: cores.branco,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {titulo}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <Link to="/" style={estiloLink}>
          Início
        </Link>
        <Link to="/profissionais" style={estiloLink}>
          Profissionais
        </Link>
        <Link to="/pacientes" style={estiloLink}>
          Pacientes
        </Link>
        <Link to="/agenda" style={estiloLink}>
          Agenda
        </Link>
        <button onClick={sair} style={estiloLink}>
          Sair
        </button>
      </div>
    </header>
  );
}