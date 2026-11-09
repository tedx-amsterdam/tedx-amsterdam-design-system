// Marks which agenda item is running, in Amsterdam time. Shared by the
// Agenda component (through AgendaClock) and the Webflow site, which loads
// the build of this file as a plain script (scripts/build-dist.js).

export type AgendaState = 'past' | 'current' | 'upcoming';
export type AgendaSlot = { time: string; endTime?: string };

const CLOCK_TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const TIME_ZONE = 'Europe/Amsterdam';

/** The date as YYYY-MM-DD and the time as HH:MM on the wall clocks in Amsterdam. */
function amsterdamNow(now: Date): { date: string; time: string } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}

/**
 * The state of each slot at `now`. An item without an end time ends where the
 * next one starts; the last one stays current until the day is over.
 */
export function agendaStates(slots: AgendaSlot[], date: string, now: Date): AgendaState[] {
  const today = amsterdamNow(now);
  if (today.date < date) return slots.map(() => 'upcoming');
  if (today.date > date) return slots.map(() => 'past');

  return slots.map(({ time, endTime }, index) => {
    if (!CLOCK_TIME.test(time)) return 'upcoming';
    const next = slots.slice(index + 1).find((slot) => CLOCK_TIME.test(slot.time))?.time;
    const end = endTime && CLOCK_TIME.test(endTime) ? endTime : next;
    if (today.time < time) return 'upcoming';
    if (end && today.time >= end) return 'past';
    return 'current';
  });
}

/**
 * Keeps the state of every row of an agenda list up to date: `aria-current="time"`
 * on the running row and `data-agenda-state` on every row. The list carries the
 * event date in `data-agenda-date`; in each row the first `<time datetime>` is
 * the start and a second one, if any, the end. Returns a function that stops it.
 */
export function startAgendaClock(list: HTMLElement, interval = 30_000): () => void {
  const update = () => {
    const date = list.dataset.agendaDate;
    if (!date) return;
    const rows = Array.from(list.children) as HTMLElement[];
    const slots = rows.map((row) => {
      const [start, end] = Array.from(row.querySelectorAll('time[datetime]')).map((time) => time.getAttribute('datetime') ?? '');
      return { time: start ?? '', endTime: end || undefined };
    });
    agendaStates(slots, date, new Date()).forEach((state, index) => {
      const row = rows[index];
      row.dataset.agendaState = state;
      if (state === 'current') row.setAttribute('aria-current', 'time');
      else row.removeAttribute('aria-current');
    });
  };
  update();
  const timer = setInterval(update, interval);
  document.addEventListener('visibilitychange', update);
  return () => {
    clearInterval(timer);
    document.removeEventListener('visibilitychange', update);
  };
}
