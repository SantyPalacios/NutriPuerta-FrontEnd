import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegistroOpcional() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [source, setSource] = useState('');
  
  // Selected areas of interest
  const [areas, setAreas] = useState({
    conscious: false,
    relationship: false,
    clinical: false
  });

  const [calculations, setCalculations] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load calculations from localStorage
    const savedCalcs = localStorage.getItem('nutri_calculations');
    if (savedCalcs) {
      try {
        setCalculations(JSON.parse(savedCalcs));
      } catch (e) {
        console.error("Error parsing saved calculations", e);
      }
    }
  }, []);

  const toggleArea = (key) => {
    setAreas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!name || !email || !question) {
      setStatus({ type: 'error', message: 'Por favor, completa todos los campos obligatorios.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    // Format selected areas
    const selectedAreasList = [];
    if (areas.conscious) selectedAreasList.push('Alimentación Consciente');
    if (areas.relationship) selectedAreasList.push('Relación con la Comida');
    if (areas.clinical) selectedAreasList.push('Nutrición Clínica');

    try {
      const payload = {
        name,
        email, // Sends the email to the user's personal email
        question,
        source: source || 'No especificado',
        areas: selectedAreasList,
        calculations: calculations || null
      };

      const targetUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact` : '/api/contact';
      const response = await axios.post(targetUrl, payload);
      
      if (response.status === 200 || response.status === 201) {
        setStatus({
          type: 'success',
          message: `¡Consulta enviada con éxito! Se envió una copia con tus datos calculados a tu correo: ${email}.`
        });
        setQuestion('');
        setSource('');
        setAreas({ conscious: false, relationship: false, clinical: false });
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'Ocurrió un error al enviar tu consulta. Por favor, intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>
      
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-md md:p-xl soft-shadow hover-lift relative overflow-hidden border border-outline-variant/10">
        
        {/* Header Section */}
        <div className="relative z-10 text-center mb-lg">
          <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
            Bienvenido a NutriPuerta
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Guarda tus datos para futuras consultas con profesionales y recibe una copia en tu casilla. Sin prisas, a tu propio ritmo.
          </p>
        </div>
        
        <form className="relative z-10 space-y-md" onSubmit={handleSendEmail}>
          
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="name">
                Nombre
              </label>
              <input 
                className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 transition-all duration-200 focus:outline-none" 
                id="name" 
                placeholder="Ej. Ana García" 
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="email">
                Correo Electrónico
              </label>
              <input 
                className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 transition-all duration-200 focus:outline-none" 
                id="email" 
                placeholder="ana@ejemplo.com" 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          {/* Areas of Interest */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
              Áreas de Interés <span className="text-sm font-normal text-on-surface-variant/70">(Opcional)</span>
            </label>
            <div className="flex flex-wrap gap-sm mt-xs">
              <button
                type="button"
                onClick={() => toggleArea('conscious')}
                className={`px-md py-sm rounded-full border transition-all duration-200 flex items-center gap-xs font-label-md text-label-md ${
                  areas.conscious 
                    ? 'bg-secondary-container text-on-secondary-container border-secondary font-bold' 
                    : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: `'FILL' ${areas.conscious ? 1 : 0}` }}>restaurant</span>
                Alimentación Consciente
              </button>
              
              <button
                type="button"
                onClick={() => toggleArea('relationship')}
                className={`px-md py-sm rounded-full border transition-all duration-200 flex items-center gap-xs font-label-md text-label-md ${
                  areas.relationship 
                    ? 'bg-secondary-container text-on-secondary-container border-secondary font-bold' 
                    : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: `'FILL' ${areas.relationship ? 1 : 0}` }}>psychology</span>
                Relación con la Comida
              </button>
              
              <button
                type="button"
                onClick={() => toggleArea('clinical')}
                className={`px-md py-sm rounded-full border transition-all duration-200 flex items-center gap-xs font-label-md text-label-md ${
                  areas.clinical 
                    ? 'bg-secondary-container text-on-secondary-container border-secondary font-bold' 
                    : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: `'FILL' ${areas.clinical ? 1 : 0}` }}>local_hospital</span>
                Nutrición Clínica
              </button>
            </div>
          </div>

          {/* Question or Inquiry */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="question">
              Pregunta de Interés sobre Nutrición
            </label>
            <textarea 
              className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 transition-all duration-200 min-h-[100px] focus:outline-none" 
              id="question" 
              placeholder="¿Qué dudas o metas tienes sobre alimentación? Escríbelas aquí."
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          
          {/* Source Selection */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="source">
              ¿Cómo te enteraste de nosotros? <span className="text-sm font-normal text-on-surface-variant/70">(Opcional)</span>
            </label>
            <select 
              className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface transition-all duration-200 appearance-none cursor-pointer" 
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              <option value="social">Redes Sociales</option>
              <option value="friend">Recomendación de un amigo</option>
              <option value="search">Búsqueda en Google</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Calculated data preview info */}
          {calculations && (
            <div className="bg-surface-container rounded-lg p-sm flex items-start gap-sm border border-outline-variant/10 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <p className="font-label-sm text-label-sm m-0">
                Se incluirán tus datos guardados automáticamente: <strong>IMC: {calculations.imc}</strong>, <strong>RED: {calculations.red} kcal</strong> y tus rangos de macronutrientes.
              </p>
            </div>
          )}

          {/* Status Message */}
          {status.message && (
            <div className={`p-sm rounded-lg font-label-md text-label-md text-center ${
              status.type === 'success' ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'
            }`}>
              {status.message}
            </div>
          )}
          
          {/* Submit Action */}
          <div className="pt-sm flex justify-center">
            <button 
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary font-label-md text-label-md px-xl py-sm rounded-lg hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-200 flex items-center gap-sm disabled:opacity-50"
            >
              <span>{loading ? 'Enviando...' : 'Guardar mis datos y enviar'}</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
