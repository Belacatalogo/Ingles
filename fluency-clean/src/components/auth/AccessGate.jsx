import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { signInWithGoogle } from '../../services/auth.js';
import { getFirebaseStatus } from '../../services/firebase.js';

export function AccessGate({ children }) {
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const firebase = getFirebaseStatus();

  if (demoUnlocked) return children;

  async function handleGoogleLogin() {
    const result = await signInWithGoogle({ preferRedirect: true });
    if (!result.ok) {
      // Enquanto Firebase não está configurado, o botão vira apenas informativo.
      console.warn('[Fluency AccessGate]', result.error);
    }
  }

  return (
    <main className="access-shell">
      <section className="access-card">
        <div className="access-icon"><LockKeyhole size={26} /></div>
        <p className="eyebrow">Acesso Fluency</p>
        <h1>Entrada limpa, sem misturar login com bundle.</h1>
        <p>
          Este gate prepara Google/Firebase e o código de acesso atual, mas ainda não bloqueia o app antigo nem altera a main.
        </p>

        <div className="access-status">
          <div>
            <ShieldCheck size={18} />
            <span>Firebase</span>
            <strong>{firebase.configured ? 'configurado' : 'aguardando env'}</strong>
          </div>
          <div>
            <Mail size={18} />
            <span>Auth domain</span>
            <strong>{firebase.authDomain || 'não definido'}</strong>
          </div>
        </div>

        <button type="button" className="primary-button" onClick={handleGoogleLogin}>
          Entrar com Google
        </button>
        <button type="button" className="secondary-button" onClick={() => setDemoUnlocked(true)}>
          Ver app em modo visual
        </button>
      </section>
    </main>
  );
}
