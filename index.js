// pages/index.js (simplified)
import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  const [machine, setMachine] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [motivation, setMotivation] = useState(5);
  const [energy, setEnergy] = useState(5);

  const now = new Date().toLocaleTimeString();

  const output = `
Machine: ${machine}
Time: ${now}
Sets × Reps: ${sets} × ${reps}
Motivation: ${motivation}/10
Energy: ${energy}/10
  `.trim();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Gym Logger</h1>
      {!machine && (
        <ImageUploader onClassified={label => setMachine(label)} />
      )}
      {machine && (
        <>
          <p>✔️ Detected: <strong>{machine}</strong></p>
          <label>Sets:
            <input
              type="number"
              value={sets}
              onChange={e => setSets(+e.target.value)}
            />
          </label>
          <label>Reps:
            <input
              type="number"
              value={reps}
              onChange={e => setReps(+e.target.value)}
            />
          </label>
          <label>Motivation (1–10):
            <input
              type="range"
              min="1" max="10"
              value={motivation}
              onChange={e => setMotivation(+e.target.value)}
            />
          </label>
          <label>Energy (1–10):
            <input
              type="range"
              min="1" max="10"
              value={energy}
              onChange={e => setEnergy(+e.target.value)}
            />
          </label>
          <textarea
            readOnly
            rows={6}
            className="w-full mt-4 p-2 border"
            value={output}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => navigator.clipboard.writeText(output)}
          >
            Copy to Clipboard
          </button>
        </>
      )}
    </div>
  );
}