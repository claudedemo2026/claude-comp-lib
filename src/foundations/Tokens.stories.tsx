import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

/** Read every `--ds-*` custom property from loaded stylesheets, so this page never drifts from the SCSS source. */
function readTokens(group: string) {
  const prefix = `--ds-${group}-`;
  const names = new Set<string>();

  const collect = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        for (let i = 0; i < rule.style.length; i++) {
          const prop = rule.style[i];
          if (prop.startsWith(prefix)) names.add(prop);
        }
      } else if ('cssRules' in rule) {
        collect((rule as CSSGroupingRule).cssRules);
      }
    }
  };

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      collect(sheet.cssRules);
    } catch {
      // Cross-origin stylesheet; skip.
    }
  }

  const computed = getComputedStyle(document.documentElement);
  return [...names].map((name) => ({ name, value: computed.getPropertyValue(name).trim() }));
}

const mono = { fontFamily: 'var(--ds-font-family-mono)', fontSize: 12 };
const muted = { ...mono, color: 'var(--ds-color-text-secondary)' };

function TokenTable({ group, preview }: { group: string; preview: (name: string, value: string) => ReactNode }) {
  const tokens = readTokens(group);
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 880 }}>
      <tbody>
        {tokens.map(({ name, value }) => (
          <tr key={name} style={{ borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
            <td style={{ padding: '10px 12px 10px 0', width: 140 }}>{preview(name, value)}</td>
            <td style={{ padding: '10px 12px', ...mono }}>{name}</td>
            <td style={{ padding: '10px 0', ...muted }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Colors() {
  const tokens = readTokens('color');
  const groups = new Map<string, typeof tokens>();
  for (const t of tokens) {
    const key = t.name.replace('--ds-color-', '').split('-')[0];
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[...groups].map(([group, items]) => (
        <section key={group}>
          <h3 style={{ margin: '0 0 12px', textTransform: 'capitalize', fontSize: 16 }}>{group}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {items.map(({ name, value }) => (
              <div key={name}>
                <div
                  style={{
                    height: 56,
                    borderRadius: 'var(--ds-radius-lg)',
                    background: `var(${name})`,
                    border: '1px solid var(--ds-color-border-subtle)',
                  }}
                />
                <div style={{ ...mono, marginTop: 6 }}>{name.replace('--ds-', '')}</div>
                <div style={muted}>{value}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Design Tokens',
  parameters: { controls: { disable: true }, actions: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {
  render: () => <Colors />,
};

export const Spacing: Story = {
  render: () => (
    <TokenTable
      group="space"
      preview={(name) => <div style={{ height: 12, width: `var(${name})`, background: 'var(--ds-color-accent)', borderRadius: 2 }} />}
    />
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <TokenTable group="font-size" preview={(name) => <span style={{ fontSize: `var(${name})`, lineHeight: 1.2 }}>Aa</span>} />
      <TokenTable group="font-weight" preview={(name) => <span style={{ fontWeight: `var(${name})` as never }}>Aa</span>} />
      <TokenTable group="line-height" preview={() => <span>—</span>} />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <TokenTable
      group="radius"
      preview={(name) => (
        <div style={{ width: 48, height: 48, borderRadius: `var(${name})`, background: 'var(--ds-color-accent-subtle)', border: '2px solid var(--ds-color-accent)' }} />
      )}
    />
  ),
};

export const Shadow: Story = {
  render: () => (
    <TokenTable
      group="shadow"
      preview={(name) => (
        <div style={{ width: 80, height: 48, borderRadius: 'var(--ds-radius-md)', background: 'var(--ds-color-bg-surface)', boxShadow: `var(${name})` }} />
      )}
    />
  ),
};
