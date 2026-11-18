import { useScheduleA } from '../../hooks/useScheduleA';
import { ExportModal } from './ExportModal';
import { HistoricalModal } from './HistoricalModal';
import { ImportModal } from './ImportModal';
import { NewScopeModal } from './NewScopeModal';
import { CreateVersionModal, RestoreModal } from './VersionModals';

/** Renders whichever dialog is open. */
export function Modals() {
  const { state } = useScheduleA();
  switch (state.modal) {
    case 'historical':
      return <HistoricalModal />;
    case 'export':
      return <ExportModal />;
    case 'newScope':
      return <NewScopeModal />;
    case 'import':
      return <ImportModal />;
    case 'createVersion':
      return <CreateVersionModal />;
    case 'restore':
      return <RestoreModal />;
    default:
      return null;
  }
}
