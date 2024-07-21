import React, { useState } from 'react';
import './FaqPage.css';

const faqs = {
  en: [
    { question: "What is SaxFlow?", answer: "SaxFlow is an online application and learning community for saxophone players that allows user access to features such as a Metronome and a Tuner, provides comprehensive tutorials at the user's preferred pace as well as a large library of music sheets." },
    { question: "How can I sign up?", answer: "Click on the 'Sign Up' button on the top right corner and fill out the form." },
    { question: "How to use the Tuner?", answer: "The Tuner offers a wide range of features. The most simple way to use it is to choose the transposition and click on start. The animation would change color ranging from red for out of tune to green for perfectly tuned. A clue would also be given on whether you should be tuning higher or lower." },
    { question: "How to use the Metronome?", answer: "The metronome feature is usable through setting a bpm, a time signature as well as a rhythmic subdivision. On the side, there is an animation of a metronome that gives visual clues when it comes to the rhythm." },
    { question: "How to use the tutorials page?", answer: "Start by selecting a music piece you want to play along to, then start the animation and play the keys exactly as they are displayed on the screen." }
  ],
  it: [
    { question: "Cos'è SaxFlow?", answer: "SaxFlow è una piattaforma online per gli appassionati di sassofono che consente agli utenti di accedere a funzionalità come un metronomo e un accordatore, fornisce tutorial completi al ritmo preferito dall'utente e una vasta biblioteca di spartiti musicali." },
    { question: "Come posso iscrivermi?", answer: "Clicca sul pulsante 'Iscriviti' in alto a destra e compila il modulo." },
    { question: "Come usare l'accordatore?", answer: "L'accordatore offre una vasta gamma di funzionalità. Il modo più semplice per usarlo è scegliere la trasposizione e fare clic su start. L'animazione cambierà colore dal rosso per non accordato al verde per perfettamente accordato. Viene anche fornito un suggerimento su se devi accordare più alto o più basso." },
    { question: "Come usare il metronomo?", answer: "La funzione del metronomo è utilizzabile impostando un bpm, una firma del tempo e una suddivisione ritmica. Sul lato c'è un'animazione di un metronomo che fornisce indizi visivi sul ritmo." },
    { question: "Come usare la pagina dei tutorial?", answer: "Inizia selezionando un brano musicale che vuoi suonare, quindi avvia l'animazione e suona le note esattamente come sono visualizzate sullo schermo." }
  ],
};

const FaqPage = () => {
  const [language, setLanguage] = useState('en');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'it' : 'en'));
  };

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessage(language === 'en' ? 'You will hear from us soon!' : 'Presto riceverai nostre notizie!');
    } else {
      setMessage(language === 'en' ? 'Invalid Email' : 'Email non valida');
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="faq-page">
      <button onClick={toggleLanguage} aria-label="Toggle language">
        {language === 'en' ? 'Italiano' : 'English'}
      </button>
      <h1 className='faqhead'>{language === 'en' ? 'Frequently Asked Questions' : 'Domande Frequenti'}</h1>
      <ul>
        {faqs[language].map((faq, index) => (
          <li key={index}>
            <button
              onClick={() => toggleAnswer(index)}
              aria-expanded={expandedIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
            </button>
            <div
              id={`faq-answer-${index}`}
              style={{ display: expandedIndex === index ? 'block' : 'none' }}
              aria-hidden={expandedIndex !== index}
            >
              {faq.answer}
            </div>
          </li>
        ))}
      </ul>
      <div className="faq-form">
        <h2>{language === 'en' ? 'Ask a Question' : 'Fai una domanda'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">{language === 'en' ? 'Email:' : 'Email:'}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="question">{language === 'en' ? 'Question:' : 'Domanda:'}</label>
          <textarea
            id="question"
            value={question}
            onChange={handleQuestionChange}
            required
          />
          <button type="submit">{language === 'en' ? 'Submit' : 'Invia'}</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default FaqPage;
