import React, { useState } from 'react';
import './FaqPage.css';

const faqs = {
  en: [
    { question: "What is SaxFlow?", answer: "SaxFlow is an online application and learning community for saxophone players. It offers features such as a metronome, tuner, comprehensive tutorials at the user's preferred pace, and a large library of music sheets." },
    { question: "How do I use the Tuner?", answer: "The tuner offers a wide range of features. The simplest way to use it is to choose the transposition and click on 'Start'. The animation will change color from red (out of tune) to green (perfectly tuned), with a hint indicating whether you should tune higher or lower." },
    { question: "How do I use the Metronome?", answer: "The metronome feature can be used by setting a BPM, time signature, and rhythmic subdivision. Additionally, there is an animation of a metronome on the side that provides visual cues for the rhythm." },
    { question: "How do I use the Tutorials page?", answer: "Start by selecting a music piece you want to play along to. Then, start the animation and play the keys exactly as they are displayed on the screen." },
  ],
  it: [
    { question: "Cos'è SaxFlow?", answer: "SaxFlow è un'applicazione online e una comunità di apprendimento per sassofonisti. Offre funzionalità come un metronomo, un accordatore, tutorial completi al ritmo preferito dall'utente e una vasta biblioteca di spartiti musicali." },
    { question: "Come si usa l'accordatore?", answer: "L'accordatore offre una vasta gamma di funzionalità. Il modo più semplice per utilizzarlo è scegliere la trasposizione e fare clic su 'Start'. L'animazione cambierà colore dal rosso (stonato) al verde (perfettamente accordato), con un'indicazione se è necessario accordare più alto o più basso." },
    { question: "Come si usa il metronomo?", answer: "La funzionalità del metronomo può essere utilizzata impostando un BPM, una firma temporale e una suddivisione ritmica. Inoltre, c'è un'animazione di un metronomo sul lato che fornisce indicazioni visive per il ritmo." },
    { question: "Come si usa la pagina dei tutorial?", answer: "Inizia selezionando un brano musicale che vuoi suonare. Successivamente, avvia l'animazione e suona le note esattamente come vengono visualizzate sullo schermo." },
  ],
};

const FaqPage = () => {
  const [language, setLanguage] = useState('en');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'it' : 'en'));
  };

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-page">
      <button onClick={toggleLanguage} aria-label="Toggle language">
        {language === 'en' ? 'Italiano' : 'English'}
      </button>
      <h1>{language === 'en' ? 'Frequently Asked Questions' : 'Domande Frequenti'}</h1>
      <ul>
        {faqs[language].map((faq, index) => (
          <li key={index}>
            <button
              onClick={() => toggleAnswer(index)}
              aria-expanded={expandedIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {faq.question}
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              style={{ display: expandedIndex === index ? 'block' : 'none' }}
              aria-hidden={expandedIndex !== index}
            >
              {faq.answer}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqPage;
