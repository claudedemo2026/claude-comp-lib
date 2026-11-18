import { SAMPLE_IMPORT, SAMPLE_IMPORT_NAME } from '../../data/project';
import { clause, sectionRank } from '../../data/sections';
import { newId } from '../../lib/format';
import { parseImport } from '../../lib/parseImport';
import { staleAgents, type Store } from '../useStore';
import { mutateSections } from './scopeActions';

/** Reference documents (step 2) and the Import text or document dialog. */
export function createReferenceActions(store: Store) {
  const setImport = (patch: Partial<ReturnType<Store['get']>['imp']>) => store.set((s) => ({ imp: { ...s.imp, ...patch } }));

  return {
    toggleDoc: (id: string) =>
      store.set((s) => ({
        docs: s.docs.map((d) => (d.id === id ? { ...d, selected: !d.selected } : d)),
        agents: staleAgents(s.agents),
      })),
    selectAll: () => store.set((s) => ({ docs: s.docs.map((d) => ({ ...d, selected: true })), agents: staleAgents(s.agents) })),
    clearAll: () => store.set((s) => ({ docs: s.docs.map((d) => ({ ...d, selected: false })) })),
    continueRefs: () => {
      const std = store.get().docs.filter((d) => d.selected && d.type === 'Standard').length;
      if (!std) {
        store.set({ refsTried: true });
        store.toast('Link at least one standard contract schedule to continue.');
        return;
      }
      store.set({ refsTried: false, screen: 'editor' });
    },
    openDoc: (refDocId: string | null) => store.set({ refDocId }),

    // Import dialog
    openImport: () => store.set((s) => ({ modal: 'import', imp: { ...s.imp, stage: 'input', rows: [] } })),
    setImportText: (text: string) => setImport({ text }),
    loadSample: () => setImport({ text: SAMPLE_IMPORT, source: SAMPLE_IMPORT_NAME }),
    loadFile: (file: File) => {
      if (/\.(txt|csv|md)$/i.test(file.name)) {
        file.text().then((text) => setImport({ text, source: file.name }));
      } else {
        setImport({ text: SAMPLE_IMPORT, source: file.name });
        store.toast(`Extraction from ${file.name} is simulated: sample text loaded.`);
      }
    },
    parse: () => {
      setImport({ stage: 'parsing' });
      store.later(() => setImport({ stage: 'preview', rows: parseImport(store.get().imp.text) }), 1100);
    },
    backToInput: () => setImport({ stage: 'input' }),
    toggleRow: (index: number) =>
      store.set((s) => ({ imp: { ...s.imp, rows: s.imp.rows.map((r, k) => (k === index ? { ...r, on: !r.on } : r)) } })),
    doImport: () => {
      const { imp } = store.get();
      const rows = imp.rows.filter((r) => r.on);
      const src = imp.source || 'pasted text';
      mutateSections(store, (secs) => {
        rows.forEach((r) => {
          let sec = secs.find((x) => x.title.toLowerCase() === r.section.toLowerCase());
          if (!sec) {
            sec = { id: `s${newId()}`, title: r.section, items: [] };
            const rank = sectionRank(r.section);
            const at = secs.findIndex((x) => sectionRank(x.title) > rank);
            if (at < 0) secs.push(sec);
            else secs.splice(at, 0, sec);
          }
          sec.items.push(clause(newId(), r.text, r.kind, false, [], src, 'import'));
        });
      }, { modal: null, imp: { stage: 'input', text: '', source: '', rows: [] }, screen: 'editor' });
      store.toast(`Imported ${rows.length} clauses from ${src}. Review and edit them in place.`);
    },
  };
}
