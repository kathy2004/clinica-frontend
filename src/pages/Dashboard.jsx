import { useEffect, useState } from 'react';
import { buscarResumoDashboard } from '../api/clinica';
import Cabecalho from '../components/Cabecalho';
import { cores } from '../theme/cores';

function formatarHora(dataIso) {
  const d = new Date(dataIso);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatarMoeda(valor) {
  const numero = Number(valor) || 0;
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

const estiloCard = {
  background: cores.branco,
  border: `1px solid ${cores.cinzaClaro}`,
  borderRadius: 8,
  padding: 20,
};

export default function Dashboard() {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    buscarResumoDashboard().then(setResumo);
  }, []);

  if (!resumo) return <p>Carregando...</p>;

  return (
    <div style={{ minHeight: '100vh', background: cores.fundoClaro }}>
      <Cabecalho titulo="ESPAÇO JK — Início" />
      <div style={{ maxWidth: 720, margin: '48px auto', fontFamily: 'sans-serif' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={estiloCard}>
            <p style={{ color: cores.cinzaMedio, fontSize: 13, margin: '0 0 6px' }}>
              Agendamentos hoje
            </p>
            <p style={{ color: cores.preto, fontSize: 26, fontWeight: 700, margin: 0 }}>
              {resumo.totalAgendamentosHoje}
            </p>
          </div>

          <div style={estiloCard}>
            <p style={{ color: cores.cinzaMedio, fontSize: 13, margin: '0 0 6px' }}>
              Faturamento hoje
            </p>
            <p style={{ color: cores.preto, fontSize: 22, fontWeight: 700, margin: 0 }}>
              {formatarMoeda(resumo.faturamentoHoje)}
            </p>
            <p style={{ color: cores.cinzaMedio, fontSize: 12, margin: '6px 0 0' }}>
              Clínica: {formatarMoeda(resumo.faturamentoClinicaHoje)} · Profissionais:{' '}
              {formatarMoeda(resumo.faturamentoProfissionalHoje)}
            </p>
          </div>

          <div style={estiloCard}>
            <p style={{ color: cores.cinzaMedio, fontSize: 13, margin: '0 0 6px' }}>
              Faturamento do mês
            </p>
            <p style={{ color: cores.preto, fontSize: 22, fontWeight: 700, margin: 0 }}>
              {formatarMoeda(resumo.faturamentoMes)}
            </p>
            <p style={{ color: cores.cinzaMedio, fontSize: 12, margin: '6px 0 0' }}>
              Clínica: {formatarMoeda(resumo.faturamentoClinicaMes)} · Profissionais:{' '}
              {formatarMoeda(resumo.faturamentoProfissionalMes)}
            </p>
          </div>

          <div style={estiloCard}>
            <p style={{ color: cores.cinzaMedio, fontSize: 13, margin: '0 0 6px' }}>
              Pacientes cadastrados
            </p>
            <p style={{ color: cores.preto, fontSize: 26, fontWeight: 700, margin: 0 }}>
              {resumo.totalPacientes}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
          {Object.entries(resumo.porStatus).map(([status, qtd]) => (
            <span
              key={status}
              style={{
                background: CORES_STATUS[status].bg,
                color: CORES_STATUS[status].texto,
                padding: '6px 14px',
                borderRadius: 16,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {LABEL_STATUS[status]}: {qtd}
            </span>
          ))}
        </div>

        <h2 style={{ color: cores.preto, fontSize: 16, marginBottom: 12 }}>Agenda de hoje</h2>

        {resumo.agendamentosHoje.length === 0 && (
          <p style={{ color: cores.cinzaMedio }}>Nenhum agendamento para hoje.</p>
        )}

        <div
          style={{
            background: cores.branco,
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {resumo.agendamentosHoje.map((a, index) => (
            <div
              key={a.id}
              style={{
                padding: '14px 20px',
                borderTop: index === 0 ? 'none' : `1px solid ${cores.cinzaClaro}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ color: cores.preto }}>{formatarHora(a.dataHora)}</strong>
                <span style={{ color: cores.preto }}> — {a.ficha.paciente.nome}</span>
                <div style={{ color: cores.cinzaMedio, fontSize: 13 }}>
                  com {a.ficha.profissional.nome}
                </div>
              </div>
              <span
                style={{
                  background: CORES_STATUS[a.status].bg,
                  color: CORES_STATUS[a.status].texto,
                  padding: '4px 10px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {LABEL_STATUS[a.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}