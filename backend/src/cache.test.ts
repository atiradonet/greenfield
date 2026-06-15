import { addNote, getNotes } from './cache.js';

describe('cache', () => {
  it('appends a note to the cache', () => {
    const before = getNotes().length;
    const result = addNote('hello world');

    expect(result.length).toBe(before + 1);
    expect(result[result.length - 1]).toBe('hello world');
  });

  it('returns a copy that does not mutate internal state', () => {
    const snapshot = getNotes();
    snapshot.push('not persisted');

    expect(getNotes()).not.toContain('not persisted');
  });
});
