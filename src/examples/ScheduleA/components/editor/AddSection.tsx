import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Select } from '../../../../components/Select';
import { SECTION_ORDER } from '../../data/sections';
import { useScheduleA } from '../../hooks/useScheduleA';

/** Adds one of the standard sections the scope doesn't have yet. */
export function AddSection() {
  const { state, actions } = useScheduleA();
  const present = new Set(state.sections.map((s) => s.title));
  const options = SECTION_ORDER.filter((t) => !present.has(t));
  const [choice, setChoice] = useState('');
  if (!options.length) return null;
  const selected = options.includes(choice) ? choice : options[0];

  return (
    <Card padding="md" className="sa-add-section sa-row sa-row--between">
      <div>
        <b>Add a section</b>
        <p className="sa-small sa-muted">Suggested: {options.slice(0, 3).join(', ')}</p>
      </div>
      <div className="sa-row">
        <Select size="sm" aria-label="Section to add" value={selected} onChange={(e) => setChoice(e.target.value)}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </Select>
        <Button variant="outline" size="sm" onClick={() => actions.scope.addSection(selected)}>Add section</Button>
      </div>
    </Card>
  );
}
