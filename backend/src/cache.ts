import _ from 'lodash';

const notes: string[] = [];

export function getNotes(): string[] {
  return notes;
}

export function addNote(text: string): string[] {
  notes.push(text);
  // De-duplicate so the board never shows the same note twice.
  const deduped = _.uniq(notes);
  notes.length = 0;
  notes.push(...deduped);
  return notes;
}
