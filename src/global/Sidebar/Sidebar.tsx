import { useId, useState, type CSSProperties, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ChevronDownIcon } from '../icons';
import './Sidebar.scss';

export interface SidebarItem {
  /** Unique id, matched against `activeId`. */
  id: string;
  label: ReactNode;
  /** Renders the item as a link. Without it the item is a button. */
  href?: string;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Nested items. The parent becomes an expand/collapse toggle. */
  children?: SidebarItem[];
}

export interface SidebarSection {
  id: string;
  /** Small uppercase heading. */
  title: string;
  items: SidebarItem[];
  /** Whether the section starts expanded (uncontrolled). Defaults to `true`. */
  defaultExpanded?: boolean;
}

export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  sections: SidebarSection[];
  /** Id of the current page's item. Its ancestors are expanded on first render. */
  activeId?: string;
  /** Called when a leaf item is chosen. Call `event.preventDefault()` to stop link navigation. */
  onSelect?: (item: SidebarItem, event: MouseEvent<HTMLElement>) => void;
  /** Accessible name for the <nav> landmark. */
  label?: string;
  /** Content pinned to the bottom (e.g. version, help link). */
  footer?: ReactNode;
  /**
   * Below the `lg` breakpoint the sidebar is an off-canvas drawer; this shows it.
   * Pair with Navbar's `onMenuClick`. Ignored on wide screens.
   */
  open?: boolean;
  /** Called when the backdrop is clicked while the drawer is open. */
  onClose?: () => void;
}

function containsActive(item: SidebarItem, activeId?: string): boolean {
  if (!activeId) return false;
  if (item.id === activeId) return true;
  return item.children?.some((child) => containsActive(child, activeId)) ?? false;
}

/** Initial expanded state: sections default open; parents open if they hold the active item. */
function initialExpanded(sections: SidebarSection[], activeId?: string) {
  const state: Record<string, boolean> = {};
  const walk = (items: SidebarItem[]) =>
    items.forEach((item) => {
      if (item.children) {
        state[item.id] = containsActive(item, activeId);
        walk(item.children);
      }
    });
  sections.forEach((section) => {
    state[`section:${section.id}`] = section.defaultExpanded ?? true;
    walk(section.items);
  });
  return state;
}

/** App-level vertical navigation grouped into collapsible sections. */
export function Sidebar({
  sections,
  activeId,
  onSelect,
  label = 'Main',
  footer,
  open = false,
  onClose,
  className,
  ...rest
}: SidebarProps) {
  const baseId = useId();
  const [expanded, setExpanded] = useState(() => initialExpanded(sections, activeId));
  const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const renderItems = (items: SidebarItem[], depth: number): ReactNode =>
    items.map((item) => {
      const hasChildren = !!item.children?.length;
      const isActive = item.id === activeId;
      const isExpanded = !!expanded[item.id];
      const groupId = `${baseId}-group-${item.id}`;
      const content = (
        <>
          {item.icon && (
            <span className="ds-sidebar__item-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="ds-sidebar__item-label">{item.label}</span>
          {hasChildren && <ChevronDownIcon className="ds-sidebar__chevron" />}
        </>
      );
      const itemClass = cx(
        'ds-sidebar__item',
        isActive && 'ds-sidebar__item--active',
        hasChildren && containsActive(item, activeId) && 'ds-sidebar__item--has-active',
      );

      return (
        <li key={item.id} style={{ '--_depth': depth } as CSSProperties}>
          {hasChildren ? (
            <button
              type="button"
              className={itemClass}
              aria-expanded={isExpanded}
              aria-controls={groupId}
              onClick={() => toggle(item.id)}
            >
              {content}
            </button>
          ) : item.href ? (
            <a
              className={itemClass}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={(event) => onSelect?.(item, event)}
            >
              {content}
            </a>
          ) : (
            <button
              type="button"
              className={itemClass}
              aria-current={isActive ? 'page' : undefined}
              onClick={(event) => onSelect?.(item, event)}
            >
              {content}
            </button>
          )}
          {hasChildren && (
            <ul id={groupId} className="ds-sidebar__list ds-sidebar__list--nested" hidden={!isExpanded}>
              {renderItems(item.children!, depth + 1)}
            </ul>
          )}
        </li>
      );
    });

  return (
    <>
      <div
        className={cx('ds-sidebar-backdrop', open && 'ds-sidebar-backdrop--visible')}
        aria-hidden="true"
        onClick={onClose}
      />
      <nav
        aria-label={label}
        {...rest}
        className={cx('ds-sidebar', open && 'ds-sidebar--open', className)}
      >
        <div className="ds-sidebar__scroll">
          {sections.map((section) => {
            const key = `section:${section.id}`;
            const isExpanded = !!expanded[key];
            const listId = `${baseId}-section-${section.id}`;
            return (
              <section key={section.id} className="ds-sidebar__section">
                <h2 className="ds-sidebar__section-heading">
                  <button
                    type="button"
                    className="ds-sidebar__section-toggle"
                    aria-expanded={isExpanded}
                    aria-controls={listId}
                    onClick={() => toggle(key)}
                  >
                    <span>{section.title}</span>
                    <ChevronDownIcon className="ds-sidebar__chevron" />
                  </button>
                </h2>
                <ul id={listId} className="ds-sidebar__list" hidden={!isExpanded}>
                  {renderItems(section.items, 0)}
                </ul>
              </section>
            );
          })}
        </div>
        {footer && <div className="ds-sidebar__footer">{footer}</div>}
      </nav>
    </>
  );
}
