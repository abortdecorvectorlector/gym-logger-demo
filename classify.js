// pages/api/classify.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { imageBase64 } = req.body;
  if (!imageBase64 || imageBase64.length > 5_000_000) {
    return res.status(400).json({ error: 'Invalid or too‐large image.' });
  }

  // Candidate machine labels
  const classes = [
    'bench press', 'squat rack', 'lat pulldown',
    'treadmill', 'leg press', 'shoulder press'
  ];

  try {
    const hf = await fetch(
      'https://api-inference.huggingface.co/models/facebook/vit-base-patch16-224',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: imageBase64,
          parameters: { candidate_labels: classes }
        })
      }
    );
    const data = await hf.json();
    if (data.error) throw data;
    res.status(200).json({ label: data.labels?.[0] || 'unknown' });
  } catch (err) {
    console.error('HF inference error:', err);
    res.status(500).json({ error: 'Classification failed.' });
  }
}