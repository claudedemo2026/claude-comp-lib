import { clause } from '../../data/sections';
import type { Clause } from '../../data/types';
import { newId } from '../../lib/format';
import type { ClauseDraft } from '../../state/types';
import { scrollToId, type Store } from '../useStore';
import { mutateSections } from './scopeActions';

/** Editing, reordering, duplicating and deleting the clauses inside a section (step 3). */
export function createClauseActions(store: Store) {
  const findLocation = (id: string) => {
    const secs = store.get().sections;
    for (let si = 0; si < secs.length; si++) {
      const ii = secs[si].items.findIndex((i) => i.id === id);
      if (ii >= 0) return { si, ii };
    }
    return null;
  };

  return {
    edit: (c: Clause) => store.set({ draft: { id: c.id, text: c.text, kind: c.kind, crit: c.crit } }),
    updateDraft: (patch: Partial<ClauseDraft>) => store.set((s) => ({ draft: s.draft && { ...s.draft, ...patch } })),
    add: (sectionId: string) => {
      const id = newId();
      mutateSections(store, (secs) => secs.find((x) => x.id === sectionId)?.items.push(clause(id, '')), {
        draft: { id, text: '', kind: 'Inclusion', crit: false },
      });
      scrollToId(`item-${id}`);
    },
    cancel: () => {
      const { draft, sections } = store.get();
      const blank = !!draft && sections.some((x) => x.items.some((i) => i.id === draft.id && !i.text));
      if (blank) mutateSections(store, (secs) => secs.forEach((x) => (x.items = x.items.filter((i) => i.id !== draft!.id))), { draft: null });
      else store.set({ draft: null });
    },
    save: () => {
      const { draft } = store.get();
      if (!draft) return;
      const text = draft.text.trim();
      if (!text) {
        store.toast('Enter the clause text before saving.');
        return;
      }
      mutateSections(store, (secs) =>
        secs.forEach((x) => (x.items = x.items.map((i) => (i.id === draft.id ? { ...i, text, kind: draft.kind, crit: draft.crit } : i)))),
        { draft: null },
      );
      store.toast('Item saved.');
    },
    move: (id: string, dir: -1 | 1) => {
      const loc = findLocation(id);
      if (!loc) return;
      mutateSections(store, (secs) => {
        const items = secs[loc.si].items;
        const j = loc.ii + dir;
        if (j < 0 || j >= items.length) return;
        [items[loc.ii], items[j]] = [items[j], items[loc.ii]];
      });
    },
    duplicate: (id: string, num: string) => {
      const loc = findLocation(id);
      if (!loc) return;
      mutateSections(store, (secs) => {
        const it = secs[loc.si].items[loc.ii];
        secs[loc.si].items.splice(loc.ii + 1, 0, { ...it, id: newId(), tags: it.tags.slice() });
      });
      store.toast(`Item ${num} duplicated.`);
    },
    remove: (id: string, num: string) => {
      const loc = findLocation(id);
      if (!loc) return;
      const sec = store.get().sections[loc.si];
      mutateSections(store, (secs) => secs[loc.si].items.splice(loc.ii, 1), {
        undo: { sec: sec.id, idx: loc.ii, item: sec.items[loc.ii] },
      });
      store.toast(`Item ${num} deleted.`, true);
    },
    undoDelete: () => {
      const { undo } = store.get();
      if (!undo) return;
      mutateSections(store, (secs) => secs.find((x) => x.id === undo.sec)?.items.splice(undo.idx, 0, undo.item), {
        undo: null,
        toast: null,
      });
    },
  };
}
