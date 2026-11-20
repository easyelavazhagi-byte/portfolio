import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    question: 'Which React hook is used to manage mutable local component state?',
    options: ['useEffect', 'useState', 'useRef', 'useContext'],
    answer: 1,
    explanation: 'useState declares a state variable and a setter function for updating state in functional components.'
  },
  {
    question: 'In CSS Flexbox, which property aligns flex items along the main axis?',
    options: ['align-items', 'justify-content', 'align-content', 'flex-direction'],
    answer: 1,
    explanation: 'justify-content aligns items along the primary main axis (horizontal in row mode).'
  },
  {
    question: 'Which method converts a JavaScript object into a JSON string?',
    options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'Object.toJSON()'],
    answer: 1,
    explanation: 'JSON.stringify() serializes a JavaScript value or object into a formatted JSON string.'
  }
];

export default function QuizAppDemo() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (showResult || isAnswered) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, isAnswered]);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === QUESTIONS[currentIdx].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setShowResult(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setIsAnswered(false);
  };

  const currentQ = QUESTIONS[currentIdx];

  if (showResult) {
    return (
      <div style={{
        background: '#0f172a',
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center',
        border: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Award size={36} color="#38bdf8" />
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>Quiz Completed!</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          You scored <strong style={{ color: '#38bdf8' }}>{score}</strong> out of <strong>{QUESTIONS.length}</strong>!
        </p>
        <div style={{
          padding: '0.4rem 1.25rem',
          borderRadius: '9999px',
          background: score >= 2 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: score >= 2 ? '#10b981' : '#ef4444',
          fontWeight: 600,
          fontSize: '0.85rem'
        }}>
          {score === 3 ? '🌟 Excellent! Frontend Master!' : score === 2 ? '👍 Good Job!' : 'Keep practicing!'}
        </div>
        <button
          onClick={restartQuiz}
          style={{
            marginTop: '0.5rem',
            padding: '0.6rem 1.5rem',
            borderRadius: '9999px',
            background: '#0ea5e9',
            color: '#fff',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <RotateCcw size={16} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header with progress & timer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Question {currentIdx + 1} of {QUESTIONS.length}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: timeLeft <= 5 ? '#ef4444' : '#38bdf8',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          <Clock size={15} /> {timeLeft}s
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
          transition: 'width 0.3s'
        }}></div>
      </div>

      {/* Question Card */}
      <div style={{
        background: '#0f172a',
        borderRadius: '0.85rem',
        padding: '1.25rem',
        border: '1px solid #1e293b'
      }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc', marginBottom: '1rem', lineHeight: 1.4 }}>
          {currentQ.question}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {currentQ.options.map((opt, idx) => {
            let borderColor = '#334155';
            let bg = 'rgba(15, 23, 42, 0.6)';
            let textColor = '#cbd5e1';

            if (isAnswered) {
              if (idx === currentQ.answer) {
                borderColor = '#10b981';
                bg = 'rgba(16, 185, 129, 0.15)';
                textColor = '#10b981';
              } else if (idx === selectedOption) {
                borderColor = '#ef4444';
                bg = 'rgba(239, 68, 68, 0.15)';
                textColor = '#ef4444';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${borderColor}`,
                  background: bg,
                  color: textColor,
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s'
                }}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQ.answer && <CheckCircle2 size={16} color="#10b981" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.answer && <XCircle size={16} color="#ef4444" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: '#1e293b', fontSize: '0.8rem', color: '#94a3b8' }}>
            💡 <strong style={{ color: '#f8fafc' }}>Explanation:</strong> {currentQ.explanation}
          </div>
        )}
      </div>

      {isAnswered && (
        <button
          onClick={handleNext}
          style={{
            alignSelf: 'flex-end',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            background: '#0ea5e9',
            color: '#fff',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          {currentIdx + 1 < QUESTIONS.length ? 'Next Question →' : 'View Results 🎉'}
        </button>
      )}
    </div>
  );
}
