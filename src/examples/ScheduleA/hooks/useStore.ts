import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AgentKey, AgentRun, Mode, Role } from '../data/types';
import { clock } from '../lib/format';
import { initialState } from '../state/initial';
import type { AppState } from '../state/types';

export type Patch = Partial<AppState> | ((s: AppState) => Partial<AppState>);

export interface Store {
  get: () => AppState;
  set: (patch: Patch) => void;
  /** Shows a toast; `undo` adds an Undo button and keeps it up longer. */
  toast: (text: string, undo?: boolean) => void;
  /** Marks the scope as saving, then saved a moment later (simulated autosave). */
  touch: () => void;
  /** Runs a callback after a delay; pending timers are cleared on unmount. */
  later: (fn: () => void, ms: number) => void;
}

/** Marks completed agent runs as outdated after the scope or its references change. */
export const staleAgents = (a: Record<AgentKey, AgentRun>) => ({
  lang: { ...a.lang, stale: a.lang.status === 'complete' },
  gap: { ...a.gap, stale: a.gap.status === 'complete' },
});

/** Owns the page state and the timers behind autosave, toasts and simulated agent runs. */
export function useStore(mode: Mode, role: Role) {
  const [state, setState] = useState(() => initialState(mode, role));
  const ref = useRef(state);
  ref.current = state;
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const all = timers.current;
    return () => {
      all.forEach(clearTimeout);
      clearTimeout(toastTimer.current);
      clearTimeout(saveTimer.current);
    };
  }, []);

  const set = useCallback((patch: Patch) => {
    setState((s) => {
      const next = { ...s, ...(typeof patch === 'function' ? patch(s) : patch) };
      ref.current = next;
      return next;
    });
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
  }, []);

  const toast = useCallback(
    (text: string, undo = false) => {
      clearTimeout(toastTimer.current);
      set({ toast: { text, undo } });
      toastTimer.current = setTimeout(() => set({ toast: null, undo: null }), undo ? 6000 : 3500);
    },
    [set],
  );

  const touch = useCallback(() => {
    set({ saveState: 'saving' });
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => set({ saveState: 'saved', savedAt: clock() }), 900);
  }, [set]);

  const store = useMemo<Store>(() => ({ get: () => ref.current, set, toast, touch, later }), [set, toast, touch, later]);
  return { state, store };
}

/** Scrolls an element into view once the next render has placed it. */
export function scrollToId(id: string) {
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 90);
}
