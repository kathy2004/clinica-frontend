import { useRef, useEffect } from 'react';
import { cores } from '../theme/cores';

export default function AssinaturaPad({ valor, onChange }) {
  const canvasRef = useRef(null);
  const desenhando = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (valor) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = valor;
    }
    // eslint-disable-next-line
  }, []);

  function posicao(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function iniciar(e) {
    desenhando.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = posicao(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function mover(e) {
    if (!desenhando.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = posicao(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = cores.preto;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function finalizar() {
    if (!desenhando.current) return;
    desenhando.current = false;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onChange(dataUrl);
  }

  function limpar() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onChange('');
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        style={{
          width: '100%',
          maxWidth: 400,
          height: 150,
          border: `1px solid ${cores.cinzaClaro}`,
          borderRadius: 6,
          touchAction: 'none',
          cursor: 'crosshair',
          display: 'block',
          background: '#fff',
        }}
        onMouseDown={iniciar}
        onMouseMove={mover}
        onMouseUp={finalizar}
        onMouseLeave={finalizar}
        onTouchStart={iniciar}
        onTouchMove={mover}
        onTouchEnd={finalizar}
      />
      <button
        type="button"
        onClick={limpar}
        style={{
          marginTop: 8,
          padding: '6px 14px',
          fontSize: 13,
          background: 'transparent',
          border: `1px solid ${cores.cinzaClaro}`,
          borderRadius: 6,
          color: cores.cinzaMedio,
          cursor: 'pointer',
        }}
      >
        Limpar assinatura
      </button>
    </div>
  );
}