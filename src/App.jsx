import React, { useState } from 'react'
import { CalendarDays, ClipboardList, Dumbbell, FlaskConical, MessageCircle, PhoneCall, Shield, Sparkles, User } from 'lucide-react'

const features = [
  { icon: <ClipboardList className="w-6 h-6"/>, title: "2‑Minute Intake Quiz", desc: "Answer 7 quick questions to get a personalized ED protocol suggestion." },
  { icon: <FlaskConical className="w-6 h-6"/>, title: "Treatment Explorer", desc: "Learn how troches, injections, and PT‑141 work—timing, dose ranges, and expectations." },
  { icon: <CalendarDays className="w-6 h-6"/>, title: "Book a Free Consult", desc: "Schedule a virtual or in‑clinic visit at a time that works for you." },
  { icon: <Dumbbell className="w-6 h-6"/>, title: "Protocol Tracker", desc: "Track usage, effects, and side‑effects. Export a summary for your clinician." },
]

const FAQ = [
  { q: "Is this medical advice?", a: "No. This app provides educational content. Protocols require a licensed provider’s evaluation and prescription." },
  { q: "Do I need labs?", a: "Baseline labs may be required depending on your history and goals. Your provider will advise during consult." },
  { q: "Is my data private?", a: "We do not collect Protected Health Information in this MVP. For PHI, enable a HIPAA-compliant backend with a BAA." },
]

export default function App(){
  const [quizOpen, setQuizOpen] = useState(false);
  const [quiz, setQuiz] = useState({ age:'', condition:'', meds:'', goals:'', contact:'' });
  const [result, setResult] = useState(null);

  // Calendly popup helper (must be OUTSIDE runQuiz)
  const openCalendly = () => {
    if (window?.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/jvcoba/new-meeting' });
    } else {
      // Fallback if script hasn't loaded
      window.open('https://calendly.com/jvcoba/new-meeting', '_blank');
    }
  };

  function runQuiz(){
    const age = parseInt(quiz.age || '0', 10);
    if (!age || !quiz.goals){
      setResult("Please answer the required questions.");
      return;
    }
    if ((quiz.condition || '').toLowerCase().includes('post-prostatectomy') ||
        (quiz.meds || '').toLowerCase().includes('nitrate')){
      setResult("Flagged for clinician review only (contraindication/complex history). Book a free consult.");
      return;
    }
    if (age < 45)
      setResult("Consider fast-acting troches + lifestyle tune-up. Discuss PT-141 if psychological component suspected.");
    else
      setResult("Start with low-dose intracavernosal protocol + optional PT-141. Titrate under clinician supervision.");
  }

  return (

      return
    }
    if ((quiz.condition||'').toLowerCase().includes('post-prostatectomy') || (quiz.meds||'').toLowerCase().includes('nitrate')){
      setResult("Flagged for clinician review only (contraindication/complex history). Book a free consult.")
      return
    }
    if (age < 45) setResult("Consider fast-acting troches + lifestyle tune-up. Discuss PT‑141 if psychological component suspected.")
    else setResult("Start with low-dose intracavernosal protocol + optional PT‑141. Titrate under clinician supervision.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-600 text-white font-bold">CM</span>
            <div className="leading-tight">
              <div className="font-semibold">Concierge Men's Wellness</div>
              <div className="text-xs text-slate-500">conciergemens.com</div>
            </div>
            <span className="badge ml-2">MVP</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="btn" onClick={()=>alert('We combine fast-acting options (troches, ICI) with neuro‑hormonal support (PT‑141, oxytocin). Protocols are individualized and supervised by clinicians.')}>
              <Shield className="w-4 h-4 mr-2"/>Why It Works
            </button>
            <a href="https://calendly.com/jvcoba/new-meeting" target="_blank" rel="noreferrer" className="btn btn-primary">
              <PhoneCall className="w-4 h-4 mr-2"/> <button onClick={openCalendly} className="btn btn-primary">
  <PhoneCall className="w-4 h-4 mr-2" /> Free Consultation
</button>

            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="container pt-10 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Stronger, Longer, <span className="text-teal-700">Confident</span>.</h1>
            <p className="mt-3 text-slate-600">Evidence‑based, prescription‑only solutions for ED and performance. Private, fast, and tailored to your goals.</p>
            <div className="mt-5 flex gap-3 flex-wrap">
              <button className="btn btn-primary" onClick={()=>setQuizOpen(true)}><ClipboardList className="w-4 h-4 mr-2"/> 2‑Minute Intake Quiz</button>
              <button onClick={openCalendly} className="btn">
  <PhoneCall className="w-4 h-4 mr-2" /> Free Consultation
</button>
            </div>
          </div>
          <div className="card p-6">
            <div className="grid gap-3">
              <div className="font-semibold">Treatments</div>
              <ul className="space-y-3 text-sm">
                <li className="p-3 rounded-xl border flex items-start gap-3"><FlaskConical className="w-5 h-5 mt-0.5"/> Troches & rapid-dissolve tablets: on-demand support with fast onset.</li>
                <li className="p-3 rounded-xl border flex items-start gap-3"><Sparkles className="w-5 h-5 mt-0.5"/> Intracavernosal injections: 10‑minute onset, long duration, effective even post‑prostatectomy or diabetes.</li>
                <li className="p-3 rounded-xl border flex items-start gap-3"><Sparkles className="w-5 h-5 mt-0.5"/> PT‑141 (Bremelanotide): boosts desire and neural pathways of arousal.</li>
                <li className="p-3 rounded-xl border flex items-start gap-3"><Sparkles className="w-5 h-5 mt-0.5"/> Oxytocin: confidence, bonding, and partner connection support.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-16">
        <div className="grid md:grid-cols-4 gap-4">
          {features.map((f, i)=>(
            <div key={i} className="card p-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">{f.icon}</div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-slate-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Modal (simple) */}
      {quizOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-lg w-full">
            <div className="font-semibold text-lg mb-3">Quick Intake</div>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input className="input" placeholder="Age *" value={quiz.age} onChange={e=>setQuiz({...quiz, age:e.target.value})}/>
                <input className="input" placeholder="Main goal (e.g., firmness, duration) *" value={quiz.goals} onChange={e=>setQuiz({...quiz, goals:e.target.value})}/>
              </div>
              <input className="input" placeholder="Relevant condition (optional)" value={quiz.condition} onChange={e=>setQuiz({...quiz, condition:e.target.value})}/>
              <input className="input" placeholder="Current meds (optional)" value={quiz.meds} onChange={e=>setQuiz({...quiz, meds:e.target.value})}/>
              <input className="input" placeholder="Email (for results) — optional" value={quiz.contact} onChange={e=>setQuiz({...quiz, contact:e.target.value})}/>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={runQuiz}><Sparkles className="w-4 h-4 mr-2"/>Get Suggestion</button>
                <button className="btn" onClick={openCalendly}>
  <PhoneCall className="w-4 h-4 mr-2" /> Book Consult
</button>
                <button className="ml-auto btn" onClick={()=>setQuizOpen(false)}>Close</button>
              </div>
              {result && <div className="border rounded-xl p-3 text-sm text-slate-700">{result}</div>}
              <p className="text-xs text-slate-500">By continuing you agree this is educational content, not medical advice.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-10 text-sm text-slate-600 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold">Concierge Men's Wellness</div>
            <div>Evidence‑based sexual wellness care for men.</div>
            <div className="mt-2">(954) 323‑8684 • Fort Lauderdale, FL</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Quick Links</div>
            <ul className="space-y-1">
              <li><a className="hover:underline" href="https://conciergemens.com/" target="_blank" rel="noreferrer">Home</a></li>
              <li><a className="hover:underline" href="https://conciergemens.com/#contact" target="_blank" rel="noreferrer">Book Consult</a></li>
              <li><a className="hover:underline" href="https://doctorcoba.com/" target="_blank" rel="noreferrer">DoctorCoba.com</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Privacy</div>
            <p>Do not enter PHI in this MVP. For medical messaging and e‑sign, we will enable a HIPAA‑compliant backend.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
