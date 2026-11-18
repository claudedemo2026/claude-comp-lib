import { createContext, useContext, useMemo } from 'react';
import type { Mode, Role } from '../data/types';
import { derive, type Derived } from '../lib/derive';
import type { AppState } from '../state/types';
import { createClauseActions } from './actions/clauseActions';
import { createLifecycleActions } from './actions/lifecycleActions';
import { createReferenceActions } from './actions/referenceActions';
import { createReviewActions } from './actions/reviewActions';
import { createScopeActions } from './actions/scopeActions';
import { createUiActions } from './actions/uiActions';
import { useStore } from './useStore';

function createActions(store: ReturnType<typeof useStore>['store']) {
  return {
    ui: createUiActions(store),
    scope: createScopeActions(store),
    clause: createClauseActions(store),
    refs: createReferenceActions(store),
    review: createReviewActions(store),
    lifecycle: createLifecycleActions(store),
  };
}

export type Actions = ReturnType<typeof createActions>;

export interface ScheduleAModel {
  state: AppState;
  /** Values computed from state: counts, step progress, permissions. */
  d: Derived;
  actions: Actions;
}

/** All state and behaviour for the Schedule A workflow. */
export function useScheduleAModel(mode: Mode, role: Role): ScheduleAModel {
  const { state, store } = useStore(mode, role);
  const actions = useMemo(() => createActions(store), [store]);
  const d = useMemo(() => derive(state), [state]);
  return { state, d, actions };
}

export const ScheduleAContext = createContext<ScheduleAModel | null>(null);

/** Reads the workflow model from the nearest provider. */
export function useScheduleA() {
  const model = useContext(ScheduleAContext);
  if (!model) throw new Error('useScheduleA must be used inside <ScheduleA>.');
  return model;
}
