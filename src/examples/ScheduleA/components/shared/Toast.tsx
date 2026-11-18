import { useScheduleA } from '../../hooks/useScheduleA';

/** Bottom-center status message, with Undo after a clause is deleted. */
export function Toast() {
  const { state, actions } = useScheduleA();
  if (!state.toast) return null;
  return (
    <div className="sa-toast" role="status">
      <span>{state.toast.text}</span>
      {state.toast.undo && (
        <button type="button" onClick={actions.clause.undoDelete}>
          Undo
        </button>
      )}
    </div>
  );
}
