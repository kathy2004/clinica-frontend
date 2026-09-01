import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Sprout } from 'lucide-react';
import { login } from '../api/clinica';
import { cores } from '../theme/cores';
import LogoJK from '../components/LogoJK';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      const { access_token } = await login(usuario, senha);
      localStorage.setItem('token', access_token);
      navigate('/');
    } catch {
      setErro('Usuário ou senha inválidos');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: cores.fundoClaro,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -20,
          fontSize: 220,
          fontWeight: 800,
          color: '#000',
          opacity: 0.05,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        jk
      </div>

      <Sprout
        size={340}
        color={cores.cinzaMedio}
        style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          opacity: 0.15,
          filter: 'blur(1px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '55%',
          height: '35%',
          background: '#eceae6',
          clipPath: 'polygon(0 100%, 100% 100%, 40% 0)',
        }}
      />

      <form
        onSubmit={handleSubmit}
        style={{
          position: 'relative',
          zIndex: 1,
          background: cores.branco,
          padding: '44px 40px',
          borderRadius: 16,
          width: 340,
          border: `1px solid ${cores.cinzaClaro}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <LogoJK size={56} />
        </div>
        <h1
          style={{
            color: cores.preto,
            fontSize: 20,
            margin: '0 0 4px',
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          ESPAÇO JK
        </h1>
        <p style={{ color: cores.cinzaMedio, marginBottom: 28, fontSize: 13 }}>
          Acesso da secretaria
        </p>

        <div style={{ position: 'relative', marginBottom: 14 }}>
          <User
            size={18}
            color={cores.cinzaMedio}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 40px',
              borderRadius: 8,
              border: `1px solid ${cores.cinzaClaro}`,
              fontSize: 14,
              color: cores.preto,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ position: 'relative', marginBottom: 20 }}>
          <Lock
            size={18}
            color={cores.cinzaMedio}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 40px',
              borderRadius: 8,
              border: `1px solid ${cores.cinzaClaro}`,
              fontSize: 14,
              color: cores.preto,
              boxSizing: 'border-box',
            }}
          />
          <button
            type="button"
            onClick={() => setMostrarSenha((v) => !v)}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
            }}
          >
            {mostrarSenha ? (
              <EyeOff size={18} color={cores.cinzaMedio} />
            ) : (
              <Eye size={18} color={cores.cinzaMedio} />
            )}
          </button>
        </div>

        {erro && <p style={{ color: '#b00020', fontSize: 13, marginBottom: 14 }}>{erro}</p>}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: 13,
            borderRadius: 8,
            border: 'none',
            background: cores.preto,
            color: cores.branco,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 24,
          }}
        >
          Entrar
        </button>

        <div style={{ borderTop: `1px solid ${cores.cinzaClaro}`, paddingTop: 16 }}>
          <p style={{ color: cores.preto, fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>
            Acesso restrito
          </p>
          <p style={{ color: cores.cinzaMedio, fontSize: 12, margin: 0 }}>
            Uso exclusivo da equipe autorizada
          </p>
        </div>
      </form>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: cores.cinzaMedio,
          fontSize: 13,
        }}
      >
                <span style={{ color: cores.preto, fontWeight: 700 }}>Espaço JK</span>
        <span>Clínica de Saúde e Desenvolvimento</span>
      </div>
    </div>
  );
}