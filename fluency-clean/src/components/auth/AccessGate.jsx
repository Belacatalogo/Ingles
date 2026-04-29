import { LockKeyhole, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { logout, signInWithGoogle, subscribeAuth } from '../../services/auth.js';
import { clearAccessSession, getAccessSession, setAccessSession, validateAccessCode } from '../../services/accessCode.js';
import { diagnostics } from '../../services/diagnostics.js';
import { getFirebaseStatus } from '../../services/firebase.js';

function getExpectedAccessCode() {
  return String(import.meta.env.VITE_ACCESS_CODE ?? '').trim();
}

function getInitialSession() {
  const session = getAccessSession();
  return session?.unlocked ? session : null;
}

export function AccessGate({ children }) {
  const [session, setSession] = useState(() => getInitialSession());
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [message, setMessage] = useState('');
  const firebase = getFirebaseStatus();
  const expectedAccessCode = useMemo(() => getExpectedAccessCode(), []);
  const hasAccessCode = Boolean(expectedAccessCode);

  useEffect(() => {
    const unsubscribe = subscribeAuth((nextUser) => {
      setUser(nextUser);
      setAuthReady(true);

      if (nextUser) {
        const nextSession = setAccessSession('google');
        setSession(nextSession);
      }
    });

    return unsubscribe;
  }, []);

  if (session?.unlocked || user) return children;

  async function handleGoogleLogin() {
    setMessage('Abrindo login com Google...');
    const result = await signInWithGoogle({ preferRedirect: true });

    if (!result.ok) {
      setMessage(result.error || 'Não foi possível iniciar o login com Google.');
      return;
    }

    if (result.redirect) {
      setMessage('Login iniciado. Ao voltar do Google, o app deve liberar automaticamente.');
    }
  }

  function handleAccessCodeSubmit(event) {
    event.preventDefault();
    const result = validateAccessCode(accessCode, expectedAccessCode);

    if (!result.ok) {
      const text = result.reason === 'expected-code-not-configured'
        ? 'Código de acesso ainda não configurado no ambiente do preview.'
        : 'Código de acesso inválido.';
      setMessage(text);
      return;
    }

    const nextSession = setAccessSession('access-code');
    setSession(nextSession);
  }

  function handleVisualMode() {
    const nextSession = setAccessSession('visual-preview');
    setSession(nextSession);
    setMessage('Modo visual liberado para teste do preview.');
  }

  async function handleResetAccess() {
    clearAccessSession();
    setSession(null);
    setUser(null);
    await logout();
    diagnostics.log('Acesso reiniciado no preview limpo.', 'info');
    setMessage('Acesso reiniciado.');
  }

  return (
    <main className="access-shell">
      <section className="access-card">
        <div className="access-icon"><LockKeyhole size={26} /></div>
        <p className="eyebrow">Acesso Fluency</p>
        <h1>Entrada limpa, sem misturar login com bundle.</h1>
        <p>
          Este gate valida Google/Firebase, código de acesso e modo visual sem alterar a main nem depender do bundle antigo.
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
          <div>
            <UserCheck size={18} />
            <span>Auth state</span>
            <strong>{authReady ? 'verificado' : 'verificando'}</strong>
          </div>
        </div>

        <button type="button" className="primary-button" onClick={handleGoogleLogin} disabled={!firebase.configured}>
          Entrar com Google
        </button>

        <form className="access-code-form" onSubmit={handleAccessCodeSubmit}>
          <label htmlFor="access-code">Código de acesso</label>
          <div>
            <input
              id="access-code"
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              placeholder={hasAccessCode ? 'Digite seu código' : 'Aguardando VITE_ACCESS_CODE'}
              autoComplete="one-time-code"
              inputMode="text"
            />
            <button type="submit" className="secondary-button" disabled={!hasAccessCode}>
              Liberar
            </button>
          </div>
        </form>

        <button type="button" className="secondary-button" onClick={handleVisualMode}>
          Ver app em modo visual
        </button>
        <button type="button" className="danger-button reset-access-button" onClick={handleResetAccess}>
          Reiniciar acesso
        </button>

        {message ? <p className="generator-message">{message}</p> : null}
      </section>
    </main>
  );
}
