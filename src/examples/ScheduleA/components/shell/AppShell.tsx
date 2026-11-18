import { useState, type ReactNode } from 'react';
import { Navbar, NavbarAvatar, NavbarIconButton } from '../../../../global/Navbar';
import { Sidebar } from '../../../../global/Sidebar';
import { ROLE_LABEL } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { BellIcon, HelpIcon, SearchIcon } from '../../icons';
import { NavbarContext } from './NavbarContext';
import { ACTIVE_NAV_ID, GATE_THREE_SECTIONS } from './navigation';

const isWide = () => typeof window === 'undefined' || window.matchMedia('(min-width: 1024px)').matches;

/**
 * Global Navbar on top, Gate Three Sidebar on the left, scrolling content on the right.
 * On wide screens the menu button hides or shows the sidebar; below `lg` it opens it as a drawer.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { state, d, actions } = useScheduleA();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const alerts = d.findings.openCrit + d.findings.openHigh;

  const toggleMenu = () => (isWide() ? setSidebarHidden((h) => !h) : setDrawerOpen((o) => !o));

  return (
    <div className={`sa-shell${sidebarHidden ? ' sa-shell--sidebar-hidden' : ''}`}>
      <Navbar
        sticky
        brand={
          <span className="sa-brand">
            <span className="sa-brand__mark" aria-hidden="true">G3</span>
            Gate Three
          </span>
        }
        menuOpen={isWide() ? !sidebarHidden : drawerOpen}
        menuControls="sa-sidebar"
        menuLabel="Show or hide navigation"
        onMenuClick={toggleMenu}
        actions={
          <>
            <NavbarIconButton label="Search projects"><SearchIcon /></NavbarIconButton>
            <NavbarIconButton label="Notifications" badge={alerts || false}><BellIcon /></NavbarIconButton>
            <NavbarIconButton label="Help"><HelpIcon /></NavbarIconButton>
          </>
        }
        account={
          <NavbarAvatar
            name={d.me.name}
            onClick={() => actions.ui.notice(`Signed in as ${d.me.name} (${ROLE_LABEL[state.role]}).`)}
          />
        }
      >
        <NavbarContext />
      </Navbar>

      <div className="sa-shell__body">
        <Sidebar
          id="sa-sidebar"
          className="sa-shell__sidebar"
          label="Gate Three navigation"
          sections={GATE_THREE_SECTIONS}
          activeId={ACTIVE_NAV_ID}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSelect={(item, event) => {
            event.preventDefault();
            setDrawerOpen(false);
            if (item.id !== ACTIVE_NAV_ID) actions.ui.notice(`${item.label} is another Gate Three product, not part of this prototype.`);
          }}
          footer="Gate Three · Help centre"
        />
        <div className="sa-main">{children}</div>
      </div>
    </div>
  );
}
