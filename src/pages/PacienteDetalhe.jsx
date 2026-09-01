import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buscarPaciente, listarFichasDoPaciente, atualizarPaciente } from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import { cores, estiloInput, estiloBotaoPrimario } from '../theme/cores';

export default function PacienteDetalhe() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState({});

  async function carregar() {
    const p = await buscarPaciente(id);
    setPaciente(p);
    const listaFichas = await listarFichasDoPaciente(id);
    setFichas(listaFichas);
  }

  useEffect(() => {
    carregar();
  }, [id]);

  function iniciarEdicao() {
    setDadosEdicao({
      nome: paciente.nome || '',
      cpf: paciente.cpf || '',
      sexo: paciente.sexo || '',
      dataNascimento: paciente.dataNascimento ? paciente.dataNascimento.slice(0, 10) : '',
      naturalidade: paciente.naturalidade || '',
      endereco: paciente.endereco || '',
      numero: paciente.numero || '',
      cidade: paciente.cidade || '',
      telefone: paciente.telefone || '',
    });
    setEditando(true);
  }

  function mudarCampo(campo, valor) {
    setDadosEdicao((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await atualizarPaciente(id, dadosEdicao);
    setEditando(false);
    carregar();
  }

  if (!paciente) return <p>Carregando...</p>;

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo={paciente.nome} mostrarVoltar />
      <div style={{ maxWidth: 560, margin: '48px auto', fontFamily: 'sans-serif' }}>
        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            padding: 24,
            marginBottom: 32,
          }}
        >
          {!editando ? (
            <>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>CPF:</strong> {paciente.cpf || '-'}
              </p>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>Sexo:</strong> {paciente.sexo || '-'}
              </p>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>Nascimento:</strong>{' '}
                {paciente.dataNascimento
                  ? paciente.dataNascimento.slice(0, 10).split('-').reverse().join('/')
                  : '-'}
              </p>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>Naturalidade:</strong> {paciente.naturalidade || '-'}
              </p>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>Endereço:</strong> {paciente.endereco || '-'}
                {paciente.numero ? `, ${paciente.numero}` : ''}
              </p>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>Cidade:</strong> {paciente.cidade || '-'}
              </p>
              <p style={{ margin: '4px 0', color: cores.preto }}>
                <strong>Telefone:</strong> {paciente.telefone || '-'}
              </p>
              <button
                onClick={iniciarEdicao}
                style={{ ...estiloBotaoPrimario, marginTop: 16, fontSize: 13, padding: '8px 16px' }}
              >
                Editar dados
              </button>
            </>
          ) : (
            <form onSubmit={salvarEdicao}>
              <input
                placeholder="Nome"
                value={dadosEdicao.nome}
                onChange={(e) => mudarCampo('nome', e.target.value)}
                style={estiloInput}
              />
              <input
                placeholder="CPF"
                value={dadosEdicao.cpf}
                onChange={(e) => mudarCampo('cpf', e.target.value)}
                style={estiloInput}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <select
                  value={dadosEdicao.sexo}
                  onChange={(e) => mudarCampo('sexo', e.target.value)}
                  style={{ ...estiloInput, flex: 1 }}
                >
                  <option value="">Sexo</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
                <input
                  type="date"
                  value={dadosEdicao.dataNascimento}
                  onChange={(e) => mudarCampo('dataNascimento', e.target.value)}
                  style={{ ...estiloInput, flex: 1 }}
                />
              </div>
              <input
                placeholder="Naturalidade"
                value={dadosEdicao.naturalidade}
                onChange={(e) => mudarCampo('naturalidade', e.target.value)}
                style={estiloInput}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  placeholder="Endereço"
                  value={dadosEdicao.endereco}
                  onChange={(e) => mudarCampo('endereco', e.target.value)}
                  style={{ ...estiloInput, flex: 3 }}
                />
                <input
                  placeholder="Nº"
                  value={dadosEdicao.numero}
                  onChange={(e) => mudarCampo('numero', e.target.value)}
                  style={{ ...estiloInput, flex: 1 }}
                />
              </div>
              <input
                placeholder="Cidade"
                value={dadosEdicao.cidade}
                onChange={(e) => mudarCampo('cidade', e.target.value)}
                style={estiloInput}
              />
              <input
                placeholder="Telefone"
                value={dadosEdicao.telefone}
                onChange={(e) => mudarCampo('telefone', e.target.value)}
                style={estiloInput}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" style={{ ...estiloBotaoPrimario, fontSize: 13, padding: '8px 16px' }}>
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  style={{
                    padding: '8px 16px',
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
            </form>
          )}
        </div>

        <h2 style={{ color: cores.preto, fontSize: 16, marginBottom: 12 }}>
          Profissionais que atendem esse paciente
        </h2>

        {fichas.length === 0 && (
          <p style={{ color: cores.cinzaMedio }}>
            Este paciente ainda não está vinculado a nenhum profissional.
          </p>
        )}

        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {fichas.map((f, index) => (
            <Link
              key={f.id}
              to={`/fichas/${f.id}`}
              state={{ nomePaciente: paciente.nome }}
              style={{
                display: 'block',
                padding: '14px 20px',
                color: cores.preto,
                textDecoration: 'none',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
              }}
            >
              <strong>{f.profissional.nome}</strong>
              {f.profissional.especialidade && (
                <span style={{ color: cores.cinzaMedio }}> — {f.profissional.especialidade}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}