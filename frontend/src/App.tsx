import { NoteBoard } from './components/NoteBoard';

export const App = (): JSX.Element => {
  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Housing Notes</h1>
      <p>Share a note with the rest of the building.</p>
      <NoteBoard />
    </main>
  );
};
