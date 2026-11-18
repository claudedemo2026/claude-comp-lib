import { useScheduleA } from '../../hooks/useScheduleA';
import { EditorStep } from '../editor/EditorStep';
import { ExportStep } from '../export/ExportStep';
import { ReviewStep } from '../review/ReviewStep';
import { DetailsStep } from '../steps/DetailsStep';
import { ReferencesStep } from '../steps/ReferencesStep';
import { Stepper } from './Stepper';

const STEPS = {
  details: DetailsStep,
  refs: ReferencesStep,
  editor: EditorStep,
  review: ReviewStep,
  export: ExportStep,
};

/** Stepper on the left, the current step on the right. */
export function Workflow() {
  const { state } = useScheduleA();
  if (state.screen === 'list') return null;
  const Step = STEPS[state.screen];

  return (
    <div className="sa-workflow">
      <Stepper />
      <div className="sa-workflow__main sa-stack" id="sa-step">
        <Step />
      </div>
    </div>
  );
}
