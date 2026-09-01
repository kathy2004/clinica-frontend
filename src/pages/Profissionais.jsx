import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  listarProfissionais,
  criarProfissional,
  atualizarProfissional,
  excluirProfissional,
} from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import { cores, estiloInput, estiloBotaoPrimario } from '../theme/cores';

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEdicao, setNomeEdicao] = useState('');
  const [especialidadeEdicao, setEspecialidadeEdicao] = useState('');
  const [erro, setErro] = useState('');

  async function carregar() {
    const dados = await listarProfissionais();
    setProfissionais(dados);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;
    await criarProfissional({ nome, especialidade });
    setNome('');
    setEspecialidade('');
    carregar();
  }

  function iniciarEdicao(p) {
    setEditandoId(p.id);
    setNomeEdicao(p.nome);
    setEspecialidadeEdicao(p.especialidade || '');
    setErro('');
  }

  function cancelarEdicao() {
    setEditandoId(null);
  }

  async function salvarEdicao(id) {
    await atualizarProfissional(id, { nome: nomeEdicao, especialidade: especialidadeEdicao });
    setEditandoId(null);
    carregar();
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este profissional?');
    if (!confirmar) return;
    try {
      await excluirProfissional(id);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo="ESPAÇO JK — Profissionais" />
      <div style={{ maxWidth: 560, margin: '48px auto', fontFamily: 'sans-serif' }}>
        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            padding: 28,
            marginBottom: 32,
          }}
        >
          <h2 style={{ color: cores.preto, fontSize: 16, marginTop: 0, marginBottom: 18 }}>
            Cadastrar profissional
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nome do profissional"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={estiloInput}
            />
            <input
              placeholder="Especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              style={estiloInput}
            />
            <button type="submit" style={estiloBotaoPrimario}>
              Cadastrar
            </button>
          </form>
        </div>

        <h2 style={{ color: cores.preto, fontSize: 16, marginBottom: 12 }}>Profissionais</h2>

        {erro && <p style={{ color: '#b00020', fontSize: 13, marginBottom: 12 }}>{erro}</p>}

        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {profissionais.map((p, index) => (
            <div
              key={p.id}
              style={{
                padding: '14px 20px',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              {editandoId === p.id ? (
                <div style={{ flex: 1 }}>
                  <input
                    value={nomeEdicao}
                    onChange={(e) => setNomeEdicao(e.target.value)}
                    style={{ ...estiloInput, marginBottom: 8 }}
                  />
                  <input
                    value={especialidadeEdicao}
                    onChange={(e) => setEspecialidadeEdicao(e.target.value)}
                    style={{ ...estiloInput, marginBottom: 8 }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => salvarEdicao(p.id)}
                      style={{ ...estiloBotaoPrimario, padding: '6px 14px', fontSize: 13 }}
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelarEdicao}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        background: 'transparent',
                        border: `1px solid ${cores.cinzaClaro}`,
                        borderRadius: 6,
                        color: cores.cinzaMedio,
                        cursor: 'pointer',
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to={`/profissionais/${p.id}`}
                    style={{ color: cores.preto, textDecoration: 'none', flex: 1 }}
                  >
                    <strong>{p.nome}</strong>
                    {p.especialidade && (
                      <span style={{ color: cores.cinzaMedio }}> — {p.especialidade}</span>
                    )}
                  </Link>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => iniciarEdicao(p)}
                      style={{
                        padding: '6px 12px',
                        fontSize: 13,
                        background: 'transparent',
                        border: `1px solid ${cores.cinzaClaro}`,
                        borderRadius: 6,
                        color: cores.cinzaEscuro,
                        cursor: 'pointer',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(p.id)}
                      style={{
                        padding: '6px 12px',
                        fontSize: 13,
                        background: 'transparent',
                        border: '1px solid #e0b0b0',
                        borderRadius: 6,
                        color: '#b00020',
                        cursor: 'pointer',
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}