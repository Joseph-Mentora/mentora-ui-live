
import React, { useState } from 'react';
import translations from './translations';

const languageOptions = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'ru', label: '🇷🇺 Русский' },
  { code: 'he', label: '🇮🇱 עברית' }
];

export default function MentoraChatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [lang, setLang] = useState('en');

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

  const t = translations[lang];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '700px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t.header}</h1>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ fontSize: '1rem', padding: '5px' }}
        >
          {languageOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>{opt.label}</option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={t.placeholder}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleAsk}
        style={{ marginTop: '1rem', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {t.ask}
      </button>
      <div style={{ marginTop: '2rem', fontSize: '18px', minHeight: '100px', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
        <strong>Answer:</strong> <br />{answer}
      </div>
    </div>
  );
}
