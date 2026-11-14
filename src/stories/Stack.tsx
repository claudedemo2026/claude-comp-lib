// Layout helper for stories only.
import type { CSSProperties, ReactNode } from 'react';

export function Stack({
  children,
  direction = 'column',
  gap = 16,
  align,
  style,
}: {
  children: ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  align?: CSSProperties['alignItems'];
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: direction, flexWrap: 'wrap', gap, alignItems: align, ...style }}>
      {children}
    </div>
  );
}
