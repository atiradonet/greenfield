import { addNote, getNotes } from './cache.js';

describe('cache', () => {
  it('appends a note to the cache', () => {
    const before = getNotes().length;
    addNote('hello world');
    const after = getNotes();
    expect(after.length).toBe(before + 1);
    expect(after).toContain('hello world');
  });

  it('de-duplicates repeated notes', () => {
    addNote('same note');
    const lengthAfterFirst = getNotes().length;
    addNote('same note');
    expect(getNotes().length).toBe(lengthAfterFirst);
  });
});
