import { LockKeyhole, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { logout, resolveGoogleRedirectResult, signInWithGoogle, subscribeAuth } from '../../services/auth.js';
import { clearAccessSession, getAccessSession, setAccessSession, validateAccessCode } from '../../services/accessCode.js';
import { diagnostics } from '../../services/diagnostics.js';
import {
  clearRuntimeFirebaseConfig,
  getFirebaseStatus,
  getRuntimeFirebaseConfig,
  saveRuntimeFirebaseConfig,
} from '../../services/firebase.js';

function getExpectedAccessCode() {
  return String(import.meta.env.VITE_ACCESS_CODE ?? '').trim();
}

function getInitialSession() {
  const session = getAccessSession();
  return session?.unlocked ? session : null;
}

function getInitialFirebaseForm() {
  return getRuntimeFirebaseConfig();
}

export function AccessGate({ children }) {
  const [session, setSession] = useState(() => getInitialSession());
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [firebaseVersion, setFirebaseVersion] = useState(0);
  const [firebaseForm, setFirebaseForm] = useState(() => getInitialFirebaseForm());
  const [message, setMessage] = useState('');
  const [authMode, setAuthMode] = useState('');
  const firebase = useMemo(() => getFirebaseStatus(), [firebaseVersion]);
  const expectedAccessCode = useMemo(() => getExpectedAccessCode(), []);
  const hasAccessCode = Boolean(expectedAccessCode);

  useEffect(() => {
    let cancelled = false;

    async function resolveRedirect() {
      if (!firebase.configured) return;
      setMessage('Verificando retorno do Google...');
      const result = await resolveGoogleRedirectResult();

      if (cancelled) return;

      if (!result.ok) {
        setMessage(result.error || 'Erro ao verificar retorno do Google.');
        return;
      }

      if (result.user) {
        const nextSession = setAccessSession('google-redirect');
        setUser(result.user);
        setSession(nextSession);
        return;
      }

      setMessage('');
    }

    resolveRedirect();

    return () => {
      cancelled = true;
    };
  }, [firebase.configured, firebaseVersion]);

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
  }, [firebaseVersion]);

  if (session?.unlocked || user) return children;

  async function handleGoogleLogin(mode) {
    setAuthMode(mode);
    setMessage(mode === 'popup' ? 'Abrindo Google por popup...' : 'Abrindo Google por redirecionamento...');
    diagnostics.log(`Botão Google acionado no AccessGate: ${mode}.`, 'info');

    const result = await signInWithGoogle({ mode });

    if (!result.ok) {
      setMessage(result.error || 'Não foi possível iniciar o login com Google.');
      setAuthMode('');
      return;
    }

    if (result.user) {
      const nextSession = setAccessSession('google');
      setSession(nextSession);
      return;
    }

    if (result.redirect) {
      setMessage('Redirect solicitado. Se voltar para esta tela, use o botão de redirecionamento alternativo apenas para diagnóstico.');
    }

    setAuthMode('');
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

  function updateFirebaseField(name, value) {
    setFirebaseForm((current) => ({ ...current, [name]: value }));
  }

  function handleFirebaseConfigSubmit(event) {
    event.preventDefault();
    const result = saveRuntimeFirebaseConfig(firebaseForm);

    if (!result.ok) {
      setMessage(result.error || 'Configuração Firebase incompleta.');
      return;
    }

    setFirebaseVersion((value) => value + 1);
    setMessage('Configuração Firebase salva neste navegador. Agora teste Entrar com Google.');
  }

  async function handleClearFirebaseConfig() {
    await clearRuntimeFirebaseConfig();
    setFirebaseForm(getInitialFirebaseForm());
    setFirebaseVersion((value) => value + 1);
    setMessage('Configuração Firebase removida deste navegador.');
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
            <strong>{firebase.configured ? `configurado (${firebase.source})` : 'aguardando config'}</strong>
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

        <div className="google-auth-actions">
          <button type="button" className="primary-button" onClick={() => handleGoogleLogin('popup')} disabled={!firebase.configured || Boolean(authMode)}>
            {authMode === 'popup' ? 'Abrindo Google...' : 'Entrar com Google'}
          </button>
          <button type="button" className="secondary-button" onClick={() => handleGoogleLogin('redirect')} disabled={!firebase.configured || Boolean(authMode)}>
            {authMode === 'redirect' ? 'Abrindo redirect...' : 'Tentar Google por redirecionamento'}
          </button>
        </div>

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

        <details className="firebase-config-panel">
          <summary>Configurar Firebase neste preview</summary>
          <p>
            Use isto apenas para validar o preview pelo RawGitHack. A configuração fica salva somente neste navegador.
          </p>
          <form onSubmit={handleFirebaseConfigSubmit}>
            <label htmlFor="firebase-api-key">API Key</label>
            <input id="firebase-api-key" value={firebaseForm.apiKey || ''} onChange={(event) => updateFirebaseField('apiKey', event.target.value)} autoCapitalize="none" autoCorrect="off" />

            <label htmlFor="firebase-auth-domain">Auth Domain</label>
            <input id="firebase-auth-domain" value={firebaseForm.authDomain || ''} onChange={(event) => updateFirebaseField('authDomain', event.target.value)} autoCapitalize="none" autoCorrect="off" />

            <label htmlFor="firebase-project-id">Project ID</label>
            <input id="firebase-project-id" value={firebaseForm.projectId || ''} onChange={(event) => updateFirebaseField('projectId', event.target.value)} autoCapitalize="none" autoCorrect="off" />

            <label htmlFor="firebase-storage-bucket">Storage Bucket</label>
            <input id="firebase-storage-bucket" value={firebaseForm.storageBucket || ''} onChange={(event) => updateFirebaseField('storageBucket', event.target.value)} autoCapitalize="none" autoCorrect="off" />

            <label htmlFor="firebase-sender-id">Messaging Sender ID</label>
            <input id="firebase-sender-id" value={firebaseForm.messagingSenderId || ''} onChange={(event) => updateFirebaseField('messagingSenderId', event.target.value)} autoCapitalize="none" autoCorrect="off" />

            <label htmlFor="firebase-app-id">App ID</label>
            <input id="firebase-app-id" value={firebaseForm.appId || ''} onChange={(event) => updateFirebaseField('appId', event.target.value)} autoCapitalize="none" autoCorrect="off" />

            <button type="submit" className="primary-button">Salvar Firebase</button>
            <button type="button" className="danger-button reset-access-button" onClick={handleClearFirebaseConfig}>Remover Firebase salvo</button>
          </form>
        </details>

        <button type="button" className="secondary-button" onClick={handleVisualMode}>
          Ver app em modo visual
        </button>
        <button type="button" className="danger-button reset-access-button" onClick={handleResetAccess}>
          Reiniciar acesso
        </button>

        {message ? <p className="generator-message auth-message">{message}</p> : null}
      </section>
    </main>
  );
}
