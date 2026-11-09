import { agendaStates } from '../components/utils/agenda-clock';

const day = [
  { time: '14:00', endTime: '15:00' },
  { time: '15:00', endTime: '16:30' },
  { time: '16:30' },
  { time: '17:00', endTime: '18:30' },
  { time: '18:30' },
];

// 12 November 2026 is in winter time: Amsterdam is UTC+1.
const at = (utc: string) => new Date(`2026-11-12T${utc}:00Z`);

describe('agendaStates', () => {
  it('marks everything upcoming before the event day', () => {
    expect(agendaStates(day, '2026-11-12', new Date('2026-11-11T20:00:00Z'))).toEqual(Array(5).fill('upcoming'));
  });

  it('marks everything past after the event day', () => {
    expect(agendaStates(day, '2026-11-12', new Date('2026-11-13T09:00:00Z'))).toEqual(Array(5).fill('past'));
  });

  it('reads the times as Amsterdam time, not the viewer’s', () => {
    // 14:10 UTC is 15:10 in Amsterdam.
    expect(agendaStates(day, '2026-11-12', at('14:10'))).toEqual(['past', 'current', 'upcoming', 'upcoming', 'upcoming']);
  });

  it('ends an item without an end time where the next one starts', () => {
    // 15:45 UTC is 16:45 in Amsterdam: the break, which has no end time.
    expect(agendaStates(day, '2026-11-12', at('15:45'))).toEqual(['past', 'past', 'current', 'upcoming', 'upcoming']);
  });

  it('keeps the last open-ended item current until the day ends', () => {
    expect(agendaStates(day, '2026-11-12', at('21:30'))).toEqual(['past', 'past', 'past', 'past', 'current']);
  });

  it('switches at the exact start time', () => {
    // 14:00 UTC is 15:00 in Amsterdam, 13:59 UTC is 14:59.
    expect(agendaStates(day, '2026-11-12', at('14:00')).slice(0, 2)).toEqual(['past', 'current']);
    expect(agendaStates(day, '2026-11-12', at('13:59')).slice(0, 2)).toEqual(['current', 'upcoming']);
  });

  it('leaves an item with a time that is not HH:MM upcoming', () => {
    expect(agendaStates([{ time: 'Evening' }], '2026-11-12', at('20:00'))).toEqual(['upcoming']);
  });
});
