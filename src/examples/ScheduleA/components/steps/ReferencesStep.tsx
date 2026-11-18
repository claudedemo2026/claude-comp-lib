import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Checkbox } from '../../../../components/Checkbox';
import { DOC_GROUPS, DOC_TYPE_COLOR } from '../../data/documents';
import { useScheduleA } from '../../hooks/useScheduleA';
import { Banner } from '../shared/Banner';
import { StepHeading } from './StepHeading';

/** Step 2: link the documents to draft from and to review against. */
export function ReferencesStep() {
  const { state, d, actions } = useScheduleA();
  const { refs } = actions;
  const ro = !d.canEdit;

  return (
    <>
      <StepHeading
        title="Reference documents"
        description="Link the documents you will draft from. They stay open in the side panel while you write, and the review agents compare your draft against them."
        actions={
          <>
            <Button variant="ghost" size="sm" disabled={ro} onClick={refs.selectAll}>Select all</Button>
            <Button variant="ghost" size="sm" disabled={ro} onClick={refs.clearAll}>Clear</Button>
            <Button variant="outline" size="sm" disabled title="Manual upload is planned for a later release">Upload document</Button>
          </>
        }
      />
      {d.stdSel === 0 && state.refsTried && (
        <Banner tone="crit">Select at least one standard contract schedule. The Language Review Agent cannot run without one.</Banner>
      )}

      {DOC_GROUPS.map((group) => {
        const docs = state.docs.filter((x) => x.group === group);
        return (
          <Card as="section" padding="none" key={group} aria-label={group}>
            <div className="sa-group-head">
              <span>{group}</span>
              <span>{docs.filter((x) => x.selected).length} of {docs.length} selected</span>
            </div>
            {docs.map((doc) => (
              <div className="sa-doc-row" key={doc.id}>
                <div className="sa-doc-row__main">
                  <Checkbox label={doc.name} description={doc.meta} checked={doc.selected} disabled={ro} onChange={() => refs.toggleDoc(doc.id)} />
                </div>
                <div className="sa-row sa-small sa-muted">
                  <Badge size="sm" color={DOC_TYPE_COLOR[doc.type]}>{doc.type}</Badge>
                  <span className="sa-nowrap">{doc.date}</span>
                </div>
              </div>
            ))}
          </Card>
        );
      })}

      <Card padding="md" className="sa-row sa-row--between">
        <span><b>{d.docSel} of {state.docs.length}</b> documents selected · {d.histSel} historical sources</span>
        <Button variant="primary" onClick={refs.continueRefs}>Continue to scope editor</Button>
      </Card>
    </>
  );
}
