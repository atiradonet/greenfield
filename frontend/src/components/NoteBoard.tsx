import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export const NoteBoard = (): JSX.Element => {
  const [notes, setNotes] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const res = await fetch(`${API_BASE}/notes`);
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data: string[] = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const data: string[] = await res.json();
      setNotes(data);
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note…"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit">Post</button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <ul>
        {notes.map((note, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
        ))}
      </ul>
    </section>
  );
};
