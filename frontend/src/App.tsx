import { NoteBoard } from './components/NoteBoard';

export const App = (): JSX.Element => {
  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Housing Notes</h1>
      <p>Post a note for other residents.</p>
      <NoteBoard />
    </main>
  );
};
