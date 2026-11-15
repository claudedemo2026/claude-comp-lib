import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CloseIcon, MenuIcon } from '../icons';
import './Navbar.scss';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Logo or product name, shown after the menu button. */
  brand?: ReactNode;
  /** Shows a menu button that calls this (typically toggles the Sidebar). */
  onMenuClick?: () => void;
  /** Whether the menu the button controls is open. Sets `aria-expanded` and swaps the icon. */
  menuOpen?: boolean;
  /** Id of the element the menu button controls. */
  menuControls?: string;
  /** Accessible name for the menu button. */
  menuLabel?: string;
  /** Left-aligned content after the brand: a context switcher, search, breadcrumbs. */
  children?: ReactNode;
  /** Right-aligned actions: language picker, icon buttons. */
  actions?: ReactNode;
  /** Far-right slot, set apart by a divider: user avatar, account menu. */
  account?: ReactNode;
  /** Pin the bar to the top of the viewport while scrolling. */
  sticky?: boolean;
}

/** The global top bar: menu toggle, brand, context, actions and account. */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  {
    brand,
    onMenuClick,
    menuOpen,
    menuControls,
    menuLabel = 'Toggle navigation',
    children,
    actions,
    account,
    sticky = false,
    className,
    ...rest
  },
  ref,
) {
  return (
    <header ref={ref} {...rest} className={cx('ds-navbar', sticky && 'ds-navbar--sticky', className)}>
      <div className="ds-navbar__start">
        {onMenuClick && (
          <NavbarIconButton
            label={menuLabel}
            className="ds-navbar__menu-button"
            aria-expanded={menuOpen}
            aria-controls={menuControls}
            onClick={onMenuClick}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </NavbarIconButton>
        )}
        {brand && <div className="ds-navbar__brand">{brand}</div>}
        {children && <div className="ds-navbar__context">{children}</div>}
      </div>
      {actions && <div className="ds-navbar__actions">{actions}</div>}
      {account && <div className="ds-navbar__account">{account}</div>}
    </header>
  );
});

export interface NavbarIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name (also the tooltip). Required because the button shows only an icon. */
  label: string;
  /** The icon. */
  children: ReactNode;
  /** Shows a small notification dot. Pass a number to show a count. */
  badge?: boolean | number;
}

/** Square icon-only button sized for the Navbar. */
export const NavbarIconButton = forwardRef<HTMLButtonElement, NavbarIconButtonProps>(
  function NavbarIconButton({ label, children, badge, className, type = 'button', ...rest }, ref) {
    const count = typeof badge === 'number' ? badge : undefined;
    const showBadge = badge === true || (count !== undefined && count > 0);
    const accessibleLabel = count ? `${label} (${count})` : label;
    return (
      <button
        ref={ref}
        type={type}
        aria-label={accessibleLabel}
        title={label}
        {...rest}
        className={cx('ds-navbar-icon-button', className)}
      >
        <span className="ds-navbar-icon-button__icon" aria-hidden="true">
          {children}
        </span>
        {showBadge && (
          <span
            className={cx('ds-navbar-icon-button__badge', count !== undefined && 'ds-navbar-icon-button__badge--count')}
            aria-hidden="true"
          >
            {count !== undefined && (count > 99 ? '99+' : count)}
          </span>
        )}
      </button>
    );
  },
);

export interface NavbarAvatarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Full name; used for initials and the accessible name. */
  name: string;
  /** Optional photo. Falls back to initials. */
  src?: string;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

/** Circular user avatar button for the Navbar's `account` slot. */
export const NavbarAvatar = forwardRef<HTMLButtonElement, NavbarAvatarProps>(function NavbarAvatar(
  { name, src, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={`Account: ${name}`}
      title={name}
      {...rest}
      className={cx('ds-navbar-avatar', className)}
    >
      {src ? <img src={src} alt="" /> : <span aria-hidden="true">{initials(name)}</span>}
    </button>
  );
});
