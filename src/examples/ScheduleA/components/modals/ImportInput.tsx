import { useRef } from 'react';
import { Button } from '../../../../components/Button';
import { FormField } from '../../../../components/FormField';
import { TextArea } from '../../../../components/TextArea';
import { SAMPLE_IMPORT_NAME } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';

const PLACEHOLDER = 'GENERAL REQUIREMENTS\n1. Provide all labour, materials and equipment for...\nEXCLUSIONS\n2. Line-voltage power wiring by Division 26.';

/** First stage of the import: choose a file, load the sample, or paste text. */
export function ImportInput({ lines }: { lines: number }) {
  const { state, actions } = useScheduleA();
  const fileRef = useRef<HTMLInputElement>(null);
  const { imp } = state;

  return (
    <>
      <div className="sa-drop">
        <div>
          <b>Upload a file</b>
          <p className="sa-small sa-muted">Plain text and CSV are read directly. Word and PDF extraction is simulated in this prototype.</p>
        </div>
        <div className="sa-row">
          <input ref={fileRef} type="file" accept=".txt,.csv,.md,.docx,.pdf" className="sa-visually-hidden" tabIndex={-1}
            aria-hidden="true" onChange={(e) => e.target.files?.[0] && actions.refs.loadFile(e.target.files[0])} />
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>Choose file</Button>
          <Button variant="ghost" size="sm" onClick={actions.refs.loadSample}>Use sample: {SAMPLE_IMPORT_NAME}</Button>
        </div>
      </div>
      <FormField label={`Or paste text${imp.source ? ` (loaded from ${imp.source})` : ''}`}
        hint={lines ? `${lines} non-empty lines` : 'Nothing to import yet.'}>
        <TextArea rows={10} className="sa-import-text" value={imp.text} placeholder={PLACEHOLDER}
          onChange={(e) => actions.refs.setImportText(e.target.value)} />
      </FormField>
    </>
  );
}
