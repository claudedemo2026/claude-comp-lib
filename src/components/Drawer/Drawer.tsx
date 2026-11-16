import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { mergeRefs } from '../../utils/mergeRefs';
import './Drawer.scss';

export type DrawerPlacement = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the drawer is shown. The drawer is controlled: update this from `onClose`. */
  open: boolean;
  /** Heading shown at the top. Also the dialog's accessible name. */
  title: ReactNode;
  /** Optional icon rendered before the title. */
  icon?: ReactNode;
  /** Called when the user asks to close (close button, backdrop click or Escape). */
  onClose: () => void;
  /** Called each time the drawer opens. */
  onOpen?: () => void;
  /** Scrollable body content. */
  children?: ReactNode;
  /** Content pinned to the bottom, below a divider (e.g. action buttons). */
  footer?: ReactNode;
  /** Edge the drawer slides in from. */
  placement?: DrawerPlacement;
  /** Panel width: sm 320px, md 420px, lg 560px. Always capped to the viewport. */
  size?: DrawerSize;
  /** Close when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdropClick?: boolean;
  /** Close when Escape is pressed. Defaults to `true`. */
  closeOnEscape?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
}

const EXIT_DURATION_MS = 250; // Matches token('duration-slow') used in Drawer.scss.

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/** A modal panel that slides in from the edge of the screen, with a header, scrollable body and footer. */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    title,
    icon,
    onClose,
    onOpen,
    children,
    footer,
    placement = 'right',
    size = 'md',
    closeOnBackdropClick = true,
    closeOnEscape = true,
    closeLabel = 'Close',
    className,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  // `mounted` keeps the DOM around during the exit animation; `visible` drives the transition.
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Wait a frame so the closed position is painted before transitioning in.
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), EXIT_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (open) onOpenRef.current?.();
  }, [open]);

  // Focus management and body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(`.ds-drawer__body ${FOCUSABLE}, .ds-drawer__footer ${FOCUSABLE}`);
    (first ?? panel)?.focus({ preventScroll: true });

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === 'Escape' && closeOnEscape) {
      event.stopPropagation();
      onClose();
      return;
    }

    // Keep Tab focus inside the drawer.
    if (event.key === 'Tab' && panelRef.current) {
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === firstEl || active === panelRef.current)) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && active === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
  };

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className={cx('ds-drawer', `ds-drawer--${placement}`, visible && 'ds-drawer--open')}>
      <div
        className="ds-drawer__backdrop"
        aria-hidden="true"
        onClick={closeOnBackdropClick ? onClose : undefined}
      />
      <div
        ref={mergeRefs(panelRef, ref)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx('ds-drawer__panel', `ds-drawer__panel--${size}`, className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <header className="ds-drawer__header">
          <h2 id={titleId} className="ds-drawer__title">
            {icon && (
              <span className="ds-drawer__icon" aria-hidden="true">
                {icon}
              </span>
            )}
            {title}
          </h2>
          <button type="button" className="ds-drawer__close" aria-label={closeLabel} onClick={onClose}>
            <CloseIcon />
          </button>
        </header>

        <div className="ds-drawer__body">{children}</div>

        {footer && <footer className="ds-drawer__footer">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
});
