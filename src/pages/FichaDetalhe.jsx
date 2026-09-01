import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  listarAtendimentosPorFicha,
  criarAtendimento,
  atualizarAtendimento,
  excluirAtendimento,
  criarAgendamento,
} from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import AssinaturaPad from '../components/AssinaturaPad';
import { cores, estiloInput, estiloBotaoPrimario } from '../theme/cores';

function paraInputDate(dataIso) {
  return dataIso ? dataIso.slice(0, 10) : '';
}

function formatarDataBR(dataIso) {
  const [ano, mes, dia] = dataIso.slice(0, 10).split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function FichaDetalhe() {
  const { id } = useParams();
  const location = useLocation();
  const nomePaciente = location.state?.nomePaciente ?? 'Paciente';

  const [atendimentos, setAtendimentos] = useState([]);
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [assinatura, setAssinatura] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [dataEdicao, setDataEdicao] = useState('');
  const [valorEdicao, setValorEdicao] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaAgendamento, setHoraAgendamento] = useState('');
  const [obsAgendamento, setObsAgendamento] = useState('');
  const [mensagemAgendamento, setMensagemAgendamento] = useState('');

  async function carregar() {
    const lista = await listarAtendimentosPorFicha(id);
    setAtendimentos(lista);
  }

  useEffect(() => {
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data) return;
    await criarAtendimento({
      fichaId: id,
      data,
      valor: valor ? Number(valor) : undefined,
      assinatura: assinatura || undefined,
    });
    setData('');
    setValor('');
    setAssinatura('');
    carregar();
  }

  async function handleSubmitAgendamento(e) {
    e.preventDefault();
    if (!dataAgendamento || !horaAgendamento) return;
    await criarAgendamento({
      fichaId: id,
      dataHora: `${dataAgendamento}T${horaAgendamento}:00`,
      observacoes: obsAgendamento || undefined,
    });
    setDataAgendamento('');
    setHoraAgendamento('');
    setObsAgendamento('');
    setMensagemAgendamento('Agendamento criado com sucesso.');
    setTimeout(() => setMensagemAgendamento(''), 3000);
  }

  function iniciarEdicao(a) {
    setEditandoId(a.id);
    setDataEdicao(paraInputDate(a.data));
    setValorEdicao(a.valor ?? '');
  }

  function cancelarEdicao() {
    setEditandoId(null);
  }

  async function salvarEdicao(id) {
    await atualizarAtendimento(id, {
      data: dataEdicao,
      valor: valorEdicao ? Number(valorEdicao) : undefined,
    });
    setEditandoId(null);
    carregar();
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm('Excluir este atendimento?');
    if (!confirmar) return;
    await excluirAtendimento(id);
    carregar();
  }

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo={nomePaciente} mostrarVoltar />
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
            Registrar atendimento
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={estiloInput}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Valor (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={estiloInput}
            />

            <p style={{ color: cores.cinzaMedio, fontSize: 13, marginBottom: 8 }}>
              Assinatura do paciente
            </p>
            <div style={{ marginBottom: 16 }}>
              <AssinaturaPad valor={assinatura} onChange={setAssinatura} />
            </div>

            <button type="submit" style={estiloBotaoPrimario}>
              Registrar
            </button>
          </form>
        </div>

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
            Marcar horário
          </h2>
          <form onSubmit={handleSubmitAgendamento}>
            <input
              type="date"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              style={estiloInput}
            />
            <input
              type="time"
              value={horaAgendamento}
              onChange={(e) => setHoraAgendamento(e.target.value)}
              style={estiloInput}
            />
            <input
              placeholder="Observações (opcional)"
              value={obsAgendamento}
              onChange={(e) => setObsAgendamento(e.target.value)}
              style={estiloInput}
            />
            <button type="submit" style={estiloBotaoPrimario}>
              Marcar horário
            </button>
            {mensagemAgendamento && (
              <p style={{ color: '#3c763d', fontSize: 13, marginTop: 10 }}>
                {mensagemAgendamento}
              </p>
            )}
          </form>
        </div>

        <h2 style={{ color: cores.preto, fontSize: 16, marginBottom: 12 }}>
          Histórico de atendimentos
        </h2>
        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {atendimentos.map((a, index) => (
            <div
              key={a.id}
              style={{
                padding: '14px 20px',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              {editandoId === a.id ? (
                <div style={{ flex: 1 }}>
                  <input
                    type="date"
                    value={dataEdicao}
                    onChange={(e) => setDataEdicao(e.target.value)}
                    style={{ ...estiloInput, marginBottom: 8 }}
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={valorEdicao}
                    onChange={(e) => setValorEdicao(e.target.value)}
                    style={{ ...estiloInput, marginBottom: 8 }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => salvarEdicao(a.id)}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                    {a.assinatura && (
                      <img
                        src={a.assinatura}
                        alt="assinatura"
                        style={{
                          width: 60,
                          height: 24,
                          objectFit: 'contain',
                          border: `1px solid ${cores.cinzaClaro}`,
                          borderRadius: 4,
                          background: '#fff',
                        }}
                      />
                    )}
                    <div style={{ color: cores.preto }}>
                      {formatarDataBR(a.data)}
                      {a.valor && (
                        <span style={{ color: cores.cinzaMedio }}> — R$ {a.valor}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => iniciarEdicao(a)}
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
                      onClick={() => handleExcluir(a.id)}
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