import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './PageLayout.scss';

export type PageLayoutWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface PageLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Header slot: app bar, navigation, brand. Rendered in a <header> landmark. */
  header?: ReactNode;
  /** Body slot: the page's main content. Rendered in a <main> landmark. */
  children: ReactNode;
  /** Optional footer slot. Rendered in a <footer> landmark. */
  footer?: ReactNode;
  /** Max width of the content area. */
  maxWidth?: PageLayoutWidth;
  /** Keep the header pinned to the top while scrolling. */
  stickyHeader?: boolean;
  /** Id for <main>, targeted by the skip link. */
  mainId?: string;
  /** Text for the "skip to content" link that appears on keyboard focus. */
  skipLinkLabel?: string;
}

export function PageLayout({
  header,
  children,
  footer,
  maxWidth = 'lg',
  stickyHeader = false,
  mainId = 'main-content',
  skipLinkLabel = 'Skip to content',
  className,
  ...rest
}: PageLayoutProps) {
  return (
    <div {...rest} className={cx('ds-page-layout', `ds-page-layout--${maxWidth}`, className)}>
      <a className="ds-page-layout__skip-link" href={`#${mainId}`}>
        {skipLinkLabel}
      </a>
      {header && (
        <header className={cx('ds-page-layout__header', stickyHeader && 'ds-page-layout__header--sticky')}>
          <div className="ds-page-layout__container ds-page-layout__header-inner">{header}</div>
        </header>
      )}
      <main id={mainId} className="ds-page-layout__body" tabIndex={-1}>
        <div className="ds-page-layout__container">{children}</div>
      </main>
      {footer && (
        <footer className="ds-page-layout__footer">
          <div className="ds-page-layout__container">{footer}</div>
        </footer>
      )}
    </div>
  );
}
