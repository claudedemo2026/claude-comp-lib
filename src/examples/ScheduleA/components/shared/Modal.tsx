import { useEffect, useId, useRef, type ReactNode } from 'react';
import { CloseIcon } from '../../icons';

export interface ModalProps {
  title: ReactNode;
  description?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
  /** Use for confirmations of destructive actions. */
  alert?: boolean;
  /** Hide the close button (the footer offers Cancel instead). */
  hideClose?: boolean;
}

/** Centered dialog (the library has a Drawer but no modal). Escape closes it and focus moves inside on open. */
export function Modal({ title, description, onClose, children, footer, wide, alert, hideClose }: ModalProps) {
  const titleId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="sa-overlay">
      <div ref={ref} tabIndex={-1} className={`sa-modal${wide ? ' sa-modal--wide' : ''}`}
        role={alert ? 'alertdialog' : 'dialog'} aria-modal="true" aria-labelledby={titleId}>
        <div className="sa-modal__head">
          <div>
            <h2 id={titleId} className="sa-h-sec">{title}</h2>
            {description && <p className="sa-small sa-muted">{description}</p>}
          </div>
          {!hideClose && (
            <button type="button" className="sa-icon-btn" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </div>
        <div className="sa-modal__body">{children}</div>
        {footer && <div className="sa-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}
