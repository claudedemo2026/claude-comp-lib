import { Select } from '../../../../components/Select';
import { ROLE_LABEL } from '../../data/project';
import type { Role } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';

/** Left side of the navbar: current project, the demo role switcher and who is signed in. */
export function NavbarContext() {
  const { state, d, actions } = useScheduleA();
  return (
    <div className="sa-navctx">
      <span className="sa-navctx__project">
        {state.details.project} <span className="sa-mono">{state.details.projectNo}</span>
      </span>
      <label className="sa-navctx__role">
        <span>Viewing as</span>
        <Select size="sm" value={state.role} onChange={(e) => actions.ui.setRole(e.target.value as Role)} aria-label="Demo role">
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="follower">Follower</option>
        </Select>
      </label>
      <span className="sa-navctx__who">
        <b>{d.me.name}</b>
        <span>{d.me.title} · {ROLE_LABEL[state.role]}</span>
      </span>
    </div>
  );
}
