import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  buscarProfissional,
  listarPacientesDoProfissional,
  criarPaciente,
  vincularPacienteAoProfissional,
  atualizarPaciente,
  removerFicha,
} from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import { cores, estiloInput, estiloBotaoPrimario } from '../theme/cores';

const dadosVazios = {
  nome: '',
  sexo: '',
  dataNascimento: '',
  naturalidade: '',
  endereco: '',
  numero: '',
  cidade: '',
  telefone: '',
  cpf: '',
  responsavelNome: '',
  responsavelCpf: '',
};

export default function ProfissionalDetalhe() {
  const { id } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [novoPaciente, setNovoPaciente] = useState(dadosVazios);
  const [mostrarMaisCampos, setMostrarMaisCampos] = useState(false);
  const [editandoFichaId, setEditandoFichaId] = useState(null);
  const [nomeEdicao, setNomeEdicao] = useState('');
  const [telefoneEdicao, setTelefoneEdicao] = useState('');
  const [erro, setErro] = useState('');

  async function carregar() {
    const prof = await buscarProfissional(id);
    setProfissional(prof);
    const listaFichas = await listarPacientesDoProfissional(id);
    setFichas(listaFichas);
  }

  useEffect(() => {
    carregar();
  }, [id]);

  function mudarCampo(campo, valor) {
    setNovoPaciente((atual) => ({ ...atual, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!novoPaciente.nome.trim()) return;
    const paciente = await criarPaciente(novoPaciente);
    await vincularPacienteAoProfissional(paciente.id, id);
    setNovoPaciente(dadosVazios);
    setMostrarMaisCampos(false);
    carregar();
  }

  function iniciarEdicao(f) {
    setEditandoFichaId(f.id);
    setNomeEdicao(f.paciente.nome);
    setTelefoneEdicao(f.paciente.telefone || '');
    setErro('');
  }

  function cancelarEdicao() {
    setEditandoFichaId(null);
  }

  async function salvarEdicao(f) {
    await atualizarPaciente(f.paciente.id, { nome: nomeEdicao, telefone: telefoneEdicao });
    setEditandoFichaId(null);
    carregar();
  }

  async function handleRemover(fichaId) {
    const confirmar = window.confirm(
      'Remover este paciente da lista deste profissional? (o cadastro do paciente não será apagado)',
    );
    if (!confirmar) return;
    try {
      await removerFicha(fichaId);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  if (!profissional) return <p>Carregando...</p>;

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo={profissional.nome} mostrarVoltar />
      <div style={{ maxWidth: 560, margin: '48px auto', fontFamily: 'sans-serif' }}>
        <p style={{ color: cores.cinzaMedio, marginTop: -8, marginBottom: 32 }}>
          {profissional.especialidade}
        </p>

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
            Cadastrar novo paciente
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nome do paciente"
              value={novoPaciente.nome}
              onChange={(e) => mudarCampo('nome', e.target.value)}
              style={estiloInput}
            />
            <input
              placeholder="CPF"
              value={novoPaciente.cpf}
              onChange={(e) => mudarCampo('cpf', e.target.value)}
              style={estiloInput}
            />
            <input
              placeholder="Telefone"
              value={novoPaciente.telefone}
              onChange={(e) => mudarCampo('telefone', e.target.value)}
              style={estiloInput}
            />

            {!mostrarMaisCampos && (
              <button
                type="button"
                onClick={() => setMostrarMaisCampos(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: cores.cinzaEscuro,
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: 0,
                  marginBottom: 16,
                  textDecoration: 'underline',
                }}
              >
                + Mais campos (sexo, nascimento, endereço...)
              </button>
            )}

            {mostrarMaisCampos && (
              <>
                <div style={{ display: 'flex', gap: 10 }}>
                  <select
                    value={novoPaciente.sexo}
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
                    value={novoPaciente.dataNascimento}
                    onChange={(e) => mudarCampo('dataNascimento', e.target.value)}
                    style={{ ...estiloInput, flex: 1 }}
                  />
                </div>
                <input
                  placeholder="Naturalidade"
                  value={novoPaciente.naturalidade}
                  onChange={(e) => mudarCampo('naturalidade', e.target.value)}
                  style={estiloInput}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    placeholder="Endereço"
                    value={novoPaciente.endereco}
                    onChange={(e) => mudarCampo('endereco', e.target.value)}
                    style={{ ...estiloInput, flex: 3 }}
                  />
                  <input
                    placeholder="Nº"
                    value={novoPaciente.numero}
                    onChange={(e) => mudarCampo('numero', e.target.value)}
                    style={{ ...estiloInput, flex: 1 }}
                  />
                </div>
                                <input
                  placeholder="Cidade"
                  value={novoPaciente.cidade}
                  onChange={(e) => mudarCampo('cidade', e.target.value)}
                  style={estiloInput}
                />

                <p style={{ color: cores.cinzaMedio, fontSize: 13, margin: '12px 0 8px' }}>
                  Se o paciente for menor de idade, preencha os dados do responsável:
                </p>
                <input
                  placeholder="Nome do responsável"
                  value={novoPaciente.responsavelNome}
                  onChange={(e) => mudarCampo('responsavelNome', e.target.value)}
                  style={estiloInput}
                />
                <input
                  placeholder="CPF do responsável"
                  value={novoPaciente.responsavelCpf}
                  onChange={(e) => mudarCampo('responsavelCpf', e.target.value)}
                  style={estiloInput}
                />
              </>
            )}
            <button type="submit" style={estiloBotaoPrimario}>
              Cadastrar
            </button>
          </form>
        </div>

        <h2 style={{ color: cores.preto, fontSize: 16, marginBottom: 12 }}>
          Pacientes desse profissional
        </h2>

        {erro && <p style={{ color: '#b00020', fontSize: 13, marginBottom: 12 }}>{erro}</p>}

        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {fichas.map((f, index) => (
            <div
              key={f.id}
              style={{
                padding: '14px 20px',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              {editandoFichaId === f.id ? (
                <div style={{ flex: 1 }}>
                  <input
                    value={nomeEdicao}
                    onChange={(e) => setNomeEdicao(e.target.value)}
                    style={{ ...estiloInput, marginBottom: 8 }}
                  />
                  <input
                    value={telefoneEdicao}
                    onChange={(e) => setTelefoneEdicao(e.target.value)}
                    style={{ ...estiloInput, marginBottom: 8 }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => salvarEdicao(f)}
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
                    to={`/fichas/${f.id}`}
                    state={{ nomePaciente: f.paciente.nome }}
                    style={{ color: cores.preto, textDecoration: 'none', flex: 1 }}
                  >
                    <strong>{f.paciente.nome}</strong>
                    {f.paciente.telefone && (
                      <span style={{ color: cores.cinzaMedio }}> — {f.paciente.telefone}</span>
                    )}
                  </Link>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => iniciarEdicao(f)}
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
                      onClick={() => handleRemover(f.id)}
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
                      Remover
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