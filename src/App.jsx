import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  ClipboardList,
  Dumbbell,
  FlaskConical,
  MessageCircle,
  PhoneCall,
  Shield,
  Sparkles,
  User,
} from 'lucide-react';

// === Config ===
const BREVO_FORM_URL =
  'https://76a5ed9f.sibforms.com/serve/MUIFAJWroWsyQSm_vx3hEhRaD1X7l5IE7J9SQ2Q4qvjcosX4xFgjshpQkYBgAsty_bdeSd2LWF9d8hek9ScPncFoyb0G1w71ufhDPeO7u8gko6Ja_uHteFA7hI0IClAS0wwqb0Fe0jAKbblUN18ieby6LxJsxayhiQBVzJi79p_2ASgJl75D6-qDUB9ccpgda4ENlWAqP0yeLLD_';

const features = [
  { icon: <ClipboardList className="w-6 h-6" />, title: '2-Minute Intake Quiz', desc: 'Answer 7 quick questions to get a personalized ED protocol suggestion.' },
  { icon: <FlaskConical className="w-6 h-6" />, title: 'Treatment Explorer', desc: 'Learn how troches, injections, and PT-141 work—timing, dose ranges, and expectations.' },
  { icon: <CalendarDays className="w-6 h-6" />, title: 'Book a Free Consult', desc: 'Schedule a virtual or in-clinic visit at a time that works for you.' },
  { icon: <Dumbbell className="w-6 h-6" />, title: 'Protocol Tracker', desc: 'Track usage, effects, and side-effects. Export a summary for your clinician.' },
];

// no-op tracking
const track = () => {};
const trackQuiz = (stage) => track('Quiz ' + stage);

export default function App() {
  // ---- state ----
  const [quizOpen, setQuizOpen] = useState(false);
  const [quiz, setQuiz] = useState({ age: '', condition: '', meds: '', goals: '', contact: '' });
  const [result, setResult] = useState(null);

  // ---- persist quiz locally ----
  const STORAGE_KEY = 'cmw_quiz_v1';
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && typeof saved === 'object') setQuiz((q) => ({ ...q, ...saved }));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quiz));
    } catch {}
  }, [quiz]);

  // ---- Calendly script ----
  useEffect(() => {
    if (window.Calendly) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
    return () => {
      try {
        document.body.removeChild(s);
      } catch {}
    };
  }, []);

  const openCalendly = () => {
    track('Consultation Opened');
    if (window?.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/jvcoba/new-meeting' });
    } else {
      window.open('https://calendly.com/jvcoba/new-meeting', '_blank');
    }
  };

  const runQuiz = () => {
    const age = parseInt(quiz.age || '0', 10);

    if (!age || !quiz.goals) {
      setResult('Please answer the required questions.');
      trackQuiz('incomplete');
      return;
    }

    const hasFlag =
      (quiz.condition || '').toLowerCase().includes('post-prostatectomy') ||
      (quiz.meds || '').toLowerCase().includes('nitrate');

    if (hasFlag) {

