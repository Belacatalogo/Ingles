import { Card } from '../components/ui/Card.jsx';

export function SettingsScreen() {
  return (
    <section className="screen-stack">
      <Card eyebrow="Ajustes" title="Configurações organizadas">
        <p>Configurações serão separadas por categoria: conta, IA, aulas, áudio, diagnóstico e aparência.</p>
      </Card>
    </section>
  );
}
