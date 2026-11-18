import { ScopeList } from './components/list/ScopeList';
import { Modals } from './components/modals/Modals';
import { VersionDrawer } from './components/modals/VersionDrawer';
import { SidePanel } from './components/panel/SidePanel';
import { Toast } from './components/shared/Toast';
import { AppShell } from './components/shell/AppShell';
import { ContextHeader } from './components/shell/ContextHeader';
import { Workflow } from './components/workflow/Workflow';
import type { Mode, Role } from './data/types';
import { ScheduleAContext, useScheduleAModel } from './hooks/useScheduleA';
import './ScheduleA.scss';

export interface ScheduleAProps {
  /** `fresh` starts a new scope at step 1; `main` opens the populated HVAC scope. */
  mode?: Mode;
  /** Demo role to start as. It can be switched from the navbar. */
  role?: Role;
}

/**
 * Gate Three "Schedule A" scope-of-work workflow: details, reference documents, the scope editor,
 * AI review and export, built from claude-comp-lib components.
 */
export function ScheduleA({ mode = 'fresh', role = 'admin' }: ScheduleAProps) {
  const model = useScheduleAModel(mode, role);
  const onList = model.state.screen === 'list';

  return (
    <ScheduleAContext.Provider value={model}>
      <AppShell>
        <ContextHeader />
        {onList ? <ScopeList /> : <Workflow />}
      </AppShell>
      <SidePanel />
      <VersionDrawer />
      <Modals />
      <Toast />
    </ScheduleAContext.Provider>
  );
}
