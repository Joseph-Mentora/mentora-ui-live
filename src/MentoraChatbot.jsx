import React, { useState } from 'react';

export default function MentoraChatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;

    setAnswer('Thinking...');
    try {
      const response = await fetch('https://mentora-backend.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setAnswer(data.answer || 'No answer returned.');
    } catch (error) {
      setAnswer('Error fetching answer.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1>Mentora AI Tutor</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleAsk}
        style={{ marginTop: '1rem', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Ask
      </button>
      <div style={{ marginTop: '2rem', fontSize: '18px', minHeight: '100px', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
        <strong>Answer:</strong> <br />{answer}
      </div>
    </div>
  );
}
