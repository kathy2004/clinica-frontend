import { useEffect, useState } from 'react';
import { listarAgendamentosPorDia, atualizarStatusAgendamento, excluirAgendamento } from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import { cores } from '../theme/cores';

function hojeISO() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function formatarHora(dataIso) {
  const d = new Date(dataIso);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

const CORES_STATUS = {
  AGENDADO: { bg: '#eeeeee', texto: cores.cinzaEscuro },
  CONFIRMADO: { bg: '#dff0d8', texto: '#3c763d' },
  CANCELADO: { bg: '#f2dede', texto: '#a94442' },
  REALIZADO: { bg: '#d9edf7', texto: '#31708f' },
};

const LABEL_STATUS = {
  AGENDADO: 'Agendado',
  CONFIRMADO: 'Confirmado',
  CANCELADO: 'Cancelado',
  REALIZADO: 'Realizado',
};

export default function AgendaDia() {
  const [data, setData] = useState(hojeISO());
  const [agendamentos, setAgendamentos] = useState([]);

  async function carregar() {
    const lista = await listarAgendamentosPorDia(data);
    setAgendamentos(lista);
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line
  }, [data]);

  async function mudarStatus(id, status) {
    await atualizarStatusAgendamento(id, status);
    carregar();
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm('Cancelar e remover este agendamento?');
    if (!confirmar) return;
    await excluirAgendamento(id);
    carregar();
  }

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo="ESPAÇO JK — Agenda" mostrarVoltar />
      <div style={{ maxWidth: 640, margin: '48px auto', fontFamily: 'sans-serif' }}>
        <div style={{ marginBottom: 24 }}>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 6,
              border: `1px solid ${cores.cinzaClaro}`,
              fontSize: 14,
            }}
          />
        </div>

        {agendamentos.length === 0 && (
          <p style={{ color: cores.cinzaMedio }}>Nenhum agendamento para este dia.</p>
        )}

        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {agendamentos.map((a, index) => (
            <div
              key={a.id}
              style={{
                padding: '16px 20px',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ color: cores.preto }}>{formatarHora(a.dataHora)}</strong>
                  <span style={{ color: cores.preto }}> — {a.ficha.paciente.nome}</span>
                  <div style={{ color: cores.cinzaMedio, fontSize: 13 }}>
                    com {a.ficha.profissional.nome}
                  </div>
                  {a.observacoes && (
                    <div style={{ color: cores.cinzaMedio, fontSize: 13, marginTop: 4 }}>
                      {a.observacoes}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    background: CORES_STATUS[a.status].bg,
                    color: CORES_STATUS[a.status].texto,
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {LABEL_STATUS[a.status]}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                {a.status !== 'CONFIRMADO' && (
                  <button
                    onClick={() => mudarStatus(a.id, 'CONFIRMADO')}
                    style={estiloBotaoAcao}
                  >
                    Confirmar
                  </button>
                )}
                {a.status !== 'REALIZADO' && (
                  <button
                    onClick={() => mudarStatus(a.id, 'REALIZADO')}
                    style={estiloBotaoAcao}
                  >
                    Marcar realizado
                  </button>
                )}
                {a.status !== 'CANCELADO' && (
                  <button
                    onClick={() => mudarStatus(a.id, 'CANCELADO')}
                    style={{ ...estiloBotaoAcao, color: '#b00020', borderColor: '#e0b0b0' }}
                  >
                    Cancelar
                  </button>
                )}
                <button
                  onClick={() => handleExcluir(a.id)}
                  style={{ ...estiloBotaoAcao, color: cores.cinzaMedio }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const estiloBotaoAcao = {
  padding: '6px 12px',
  fontSize: 12,
  background: 'transparent',
  border: `1px solid ${cores.cinzaClaro}`,
  borderRadius: 6,
  color: cores.cinzaEscuro,
  cursor: 'pointer',
};