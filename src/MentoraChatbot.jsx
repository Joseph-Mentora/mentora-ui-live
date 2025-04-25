import { useState } from "react";

export default function MentoraChatbot() {
  const [grade, setGrade] = useState("K");
  const [subject, setSubject] = useState("English");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://mentora-backend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: grade === "K" ? 0 : parseInt(grade),
          subject,
          question,
        }),
      });

      const data = await res.json();
      if (data.answer) {
        setResponse(data.answer);
      } else {
        setResponse("Hmm, I’m not sure how to answer that yet — can you try asking another way?");
      }
    } catch (error) {
      setResponse("There was an error reaching Mentora. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h1>Mentora: Your AI Study Buddy</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Grade:
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="K">Kindergarten</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </label>

        <label>
          Subject:
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>English</option>
            <option>Math</option>
            <option>Science</option>
            <option>Social Studies</option>
            <option>Geography</option>
            <option>History</option>
            <option>Art</option>
          </select>
        </label>

        <label>
          Question:
          <textarea
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask Mentora"}
        </button>
      </form>

      {response && (
        <div className="response-box">
          <h3>Mentora says:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
