import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Card.scss';

export type CardVariant = 'outlined' | 'elevated' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardElement = 'div' | 'section' | 'article' | 'aside' | 'li';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** The card's content. Anything goes. */
  children?: ReactNode;
  /** `outlined`: border on white. `elevated`: shadow on white. `filled`: light grey, no border. */
  variant?: CardVariant;
  /** Inner padding. Use `none` for edge-to-edge media or lists and pad the content yourself. */
  padding?: CardPadding;
  /** Element to render. Use `section`/`article` when the card is a landmark or standalone item. */
  as?: CardElement;
}

/** A generic surface that groups related content. */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { children, variant = 'outlined', padding = 'md', as: Component = 'div', className, ...rest },
  ref,
) {
  return (
    <Component
      // The union of intrinsic elements makes the ref type unwieldy; every option is an HTMLElement.
      ref={ref as never}
      className={cx('ds-card', `ds-card--${variant}`, `ds-card--padding-${padding}`, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});
