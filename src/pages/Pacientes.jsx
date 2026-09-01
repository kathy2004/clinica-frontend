import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarTodosPacientes } from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import { cores, estiloInput } from '../theme/cores';

// Reaproveita a listagem de profissionais + pacientes de cada um, juntando tudo numa lista única
export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

   async function carregar() {
    setCarregando(true);
    const dados = await listarTodosPacientes();
    setPacientes(dados);
    setCarregando(false);
  }
  useEffect(() => {
    carregar();
  }, []);

  const filtrados = pacientes.filter((p) => {
    const termo = busca.toLowerCase();
    return (
      p.nome.toLowerCase().includes(termo) ||
      (p.cpf && p.cpf.includes(termo)) ||
      (p.telefone && p.telefone.includes(termo))
    );
  });

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo="ESPAÇO JK — Pacientes" mostrarVoltar />
      <div style={{ maxWidth: 560, margin: '48px auto', fontFamily: 'sans-serif' }}>
        <input
          placeholder="Buscar por nome, CPF ou telefone..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ ...estiloInput, marginBottom: 24 }}
        />

        {carregando && <p style={{ color: cores.cinzaMedio }}>Carregando...</p>}

        {!carregando && filtrados.length === 0 && (
          <p style={{ color: cores.cinzaMedio }}>Nenhum paciente encontrado.</p>
        )}

        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {filtrados.map((p, index) => (
            <Link
              key={p.id}
              to={`/pacientes/${p.id}`}
              style={{
                display: 'block',
                padding: '14px 20px',
                color: cores.preto,
                textDecoration: 'none',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
              }}
            >
              <strong>{p.nome}</strong>
              {p.telefone && <span style={{ color: cores.cinzaMedio }}> — {p.telefone}</span>}
              {p.cpf && (
                <div style={{ color: cores.cinzaMedio, fontSize: 12, marginTop: 2 }}>
                  CPF: {p.cpf}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}