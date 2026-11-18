import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { FormField } from '../../../../components/FormField';
import { Input } from '../../../../components/Input';
import { TextArea } from '../../../../components/TextArea';
import { useScheduleA } from '../../hooks/useScheduleA';
import { AddSection } from './AddSection';
import { SectionCard } from './SectionCard';
import { StartOptions } from './StartOptions';

/** Step 3: title, description and the numbered sections of clauses. */
export function EditorStep() {
  const { state, d, actions } = useScheduleA();
  const ro = !d.canEdit;

  return (
    <>
      <Card padding="lg" className="sa-stack">
        <div className="sa-row sa-row--between">
          <div className="sa-row">
            <span className="sa-small sa-muted">Step 3 of 5 · Scope editor</span>
            {d.canEdit && <Button variant="outline" size="sm" onClick={actions.refs.openImport}>Import text or document</Button>}
            <Button variant="ghost" size="sm" onClick={() => actions.ui.showPanel('refs')}>Reference documents ({d.docSel})</Button>
          </div>
          <span className="sa-small sa-muted">{d.stats.sections} sections · {d.stats.items} clauses</span>
        </div>
        <FormField label="Scope title">
          <Input size="lg" value={state.scopeTitle} disabled={ro} onChange={(e) => actions.scope.setTitle(e.target.value)} />
        </FormField>
        <FormField label="General description" hint="Printed under the title. Keep it to the overall intent; obligations belong in the sections below.">
          <TextArea rows={3} value={state.scopeDesc} disabled={ro} onChange={(e) => actions.scope.setDesc(e.target.value)} />
        </FormField>
      </Card>

      {d.stats.items === 0 && <StartOptions blankStarted={state.sections.length > 0} />}

      {state.sections.map((sec, i) => <SectionCard key={sec.id} section={sec} index={i} />)}

      {d.canEdit && state.sections.length > 0 && <AddSection />}
      {state.sections.length > 0 && (
        <div className="sa-row sa-row--end">
          <Button variant="primary" onClick={() => actions.ui.go('review')}>Continue to AI review</Button>
        </div>
      )}
    </>
  );
}
