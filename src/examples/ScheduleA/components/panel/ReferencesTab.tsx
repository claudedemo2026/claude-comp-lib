import { Badge } from '../../../../components/Badge';
import { DOC_TYPE_COLOR } from '../../data/documents';
import { useScheduleA } from '../../hooks/useScheduleA';
import { ReferenceDocument } from './ReferenceDocument';

/** The documents linked in step 2. Open one to read its excerpts and insert them as clauses. */
export function ReferencesTab() {
  const { state, actions } = useScheduleA();
  const linked = state.docs.filter((x) => x.selected);
  const open = linked.find((x) => x.id === state.refDocId);

  if (open) return <ReferenceDocument doc={open} />;

  return (
    <>
      <p className="sa-small sa-muted sa-panel__intro">
        Documents linked to this scope. Open one to read it beside the editor and insert excerpts as clauses.
      </p>
      <div className="sa-panel-list">
        {linked.map((doc) => (
          <button type="button" key={doc.id} className="sa-panel-item" onClick={() => actions.refs.openDoc(doc.id)}>
            <span className="sa-row sa-row--tight">
              <Badge size="sm" color={DOC_TYPE_COLOR[doc.type]}>{doc.type}</Badge>
              <span className="sa-small sa-muted">{doc.date}</span>
            </span>
            <span className="sa-panel-item__title">{doc.name}</span>
            <span className="sa-small sa-muted">{doc.meta}</span>
          </button>
        ))}
        {!linked.length && (
          <p className="sa-small sa-muted sa-panel__intro">No documents linked. Choose them in step 2, Reference documents.</p>
        )}
      </div>
    </>
  );
}
