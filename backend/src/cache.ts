const notes: string[] = [];

export const getNotes = (): string[] => {
  return [...notes];
};

export const addNote = (text: string): string[] => {
  notes.push(text);
  return getNotes();
};
