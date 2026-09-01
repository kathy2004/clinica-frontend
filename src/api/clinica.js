const BASE_URL = 'http://localhost:3000';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function login(usuario, senha) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });
  if (!res.ok) throw new Error('Usuário ou senha inválidos');
  return res.json();
}

export async function listarProfissionais() {
  const res = await fetch(`${BASE_URL}/profissionais`, { headers: authHeaders() });
  return res.json();
}

export async function criarProfissional(dados) {
  const res = await fetch(`${BASE_URL}/profissionais`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function buscarProfissional(id) {
  const res = await fetch(`${BASE_URL}/profissionais/${id}`, { headers: authHeaders() });
  return res.json();
}

export async function listarPacientesDoProfissional(profissionalId) {
  const res = await fetch(`${BASE_URL}/profissionais/${profissionalId}/pacientes`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function criarPaciente(dados) {
  const res = await fetch(`${BASE_URL}/pacientes`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function vincularPacienteAoProfissional(pacienteId, profissionalId) {
  const res = await fetch(`${BASE_URL}/pacientes/${pacienteId}/vincular/${profissionalId}`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
}

export async function listarAtendimentosPorFicha(fichaId) {
  const res = await fetch(`${BASE_URL}/atendimentos/ficha/${fichaId}`, { headers: authHeaders() });
  return res.json();
}

export async function criarAtendimento(dados) {
  const res = await fetch(`${BASE_URL}/atendimentos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function atualizarProfissional(id, dados) {
  const res = await fetch(`${BASE_URL}/profissionais/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function excluirProfissional(id) {
  const res = await fetch(`${BASE_URL}/profissionais/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.message || 'Erro ao excluir');
  }
  return res.json();
}

export async function atualizarPaciente(id, dados) {
  const res = await fetch(`${BASE_URL}/pacientes/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function excluirPaciente(id) {
  const res = await fetch(`${BASE_URL}/pacientes/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.message || 'Erro ao excluir');
  }
  return res.json();
}

export async function removerFicha(fichaId) {
  const res = await fetch(`${BASE_URL}/pacientes/ficha/${fichaId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.message || 'Erro ao remover vínculo');
  }
  return res.json();
}

export async function atualizarAtendimento(id, dados) {
  const res = await fetch(`${BASE_URL}/atendimentos/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function excluirAtendimento(id) {
  const res = await fetch(`${BASE_URL}/atendimentos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}

export async function listarAgendamentosPorFicha(fichaId) {
  const res = await fetch(`${BASE_URL}/agendamentos/ficha/${fichaId}`, { headers: authHeaders() });
  return res.json();
}

export async function criarAgendamento(dados) {
  const res = await fetch(`${BASE_URL}/agendamentos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function listarAgendamentosPorDia(data) {
  const res = await fetch(`${BASE_URL}/agendamentos?data=${data}`, { headers: authHeaders() });
  return res.json();
}

export async function atualizarStatusAgendamento(id, status) {
  const res = await fetch(`${BASE_URL}/agendamentos/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function excluirAgendamento(id) {
  const res = await fetch(`${BASE_URL}/agendamentos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}

export async function buscarPaciente(id) {
  const res = await fetch(`${BASE_URL}/pacientes/${id}`, { headers: authHeaders() });
  return res.json();
}

export async function listarFichasDoPaciente(pacienteId) {
  const res = await fetch(`${BASE_URL}/pacientes/${pacienteId}/fichas`, { headers: authHeaders() });
  return res.json();
}

export async function listarTodosPacientes() {
  const res = await fetch(`${BASE_URL}/pacientes`, { headers: authHeaders() });
  return res.json();
}

export async function buscarResumoDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard/resumo`, { headers: authHeaders() });
  return res.json();
}