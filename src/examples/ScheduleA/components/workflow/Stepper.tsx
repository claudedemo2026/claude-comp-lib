import { useScheduleA } from '../../hooks/useScheduleA';
import { CheckIcon, StepIcons } from '../../icons';

/** Left-hand workflow navigation: overall progress and the five steps. */
export function Stepper() {
  const { state, d, actions } = useScheduleA();
  return (
    <nav className="sa-steps" aria-label="Schedule A workflow">
      <div className="sa-progress">
        <div className="sa-row sa-row--between sa-row--nowrap">
          <span className="sa-progress__label">Your scope of work</span>
          <span className="sa-progress__value">{d.progressPct}%</span>
        </div>
        <div className="sa-progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={d.progressPct} aria-label="Workflow progress">
          <i style={{ width: `${Math.max(d.progressPct, 4)}%` }} />
        </div>
        <span className="sa-progress__next">{d.nextHint}</span>
      </div>
      <ol className="sa-stepper">
        {d.steps.map((step) => {
          const current = state.screen === step.key;
          const Icon = StepIcons[step.key];
          return (
            <li key={step.key} className={`sa-step${step.done ? ' sa-step--done' : ''}${current ? ' sa-step--current' : ''}`}>
              <button type="button" className="sa-step__btn" aria-current={current ? 'step' : undefined}
                onClick={() => actions.ui.go(step.key)}>
                <span className="sa-step__num">{step.done ? <CheckIcon strokeWidth={3} /> : <Icon size={18} />}</span>
                <span className="sa-step__text">
                  <span className="sa-step__label">
                    <b>{step.label}</b>
                    {step.count && <span className={`sa-count sa-count--${step.countTone}`}>{step.count}</span>}
                  </span>
                  <span>{step.sub}</span>
                  {step.done && <span className="sa-visually-hidden">Done</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
