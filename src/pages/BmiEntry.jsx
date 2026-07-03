import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BmiEntry() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleCalculate = () => {
    if (!weight || !height) return;
    
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      const bmiValue = parseFloat(calculatedBmi);
      
      setBmi(calculatedBmi);
      
      if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setStatus('Peso Saludable');
        // Navigate to the result page immediately if healthy
        navigate('/result', { state: { bmi: calculatedBmi, weight: weightInKg, height: heightInMeters * 100 } });
      } else if (bmiValue < 18.5) {
        setStatus('Bajo Peso');
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setStatus('Sobrepeso');
      } else {
        setStatus('Obesidad');
      }
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center py-xl px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* BMI Calculator Card */}
      <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl p-md md:p-[40px] ambient-shadow relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-lg">
          <span className="material-symbols-outlined text-primary text-4xl mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-xs">
            Conoce tu punto de partida
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Calcula tu Índice de Masa Corporal (IMC) de forma rápida y sencilla. Recuerda, es solo un número, no define tu bienestar total.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-md">
          {/* Weight Input */}
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="weight">
              Peso (kg)
            </label>
            <div className="relative bg-primary/5 rounded-lg border border-transparent transition-all duration-200 input-focus-ring flex items-center px-sm py-sm">
              <span className="material-symbols-outlined text-on-surface-variant mr-sm">
                scale
              </span>
              <input className="bg-transparent border-none w-full font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/50 focus:ring-0 p-0" id="weight" max="300" min="20" name="weight" placeholder="Ej. 65" required step="0.1" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="height">
              Altura (cm)
            </label>
            <div className="relative bg-primary/5 rounded-lg border border-transparent transition-all duration-200 input-focus-ring flex items-center px-sm py-sm">
              <span className="material-symbols-outlined text-on-surface-variant mr-sm">
                height
              </span>
              <input className="bg-transparent border-none w-full font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/50 focus:ring-0 p-0" id="height" max="250" min="50" name="height" placeholder="Ej. 165" required type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>

          {/* Subtle Reminder */}
          <div className="bg-surface-container-low rounded-lg p-sm flex items-start gap-sm">
            <span className="material-symbols-outlined text-tertiary mt-1" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>
              info
            </span>
            <p className="font-label-sm text-label-sm text-on-surface-variant m-0">
              Esta herramienta proporciona una estimación general. Para una evaluación completa, te recomendamos consultar a un profesional de la salud.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-sm">
            <button className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-sm rounded-lg ambient-shadow-hover active:scale-95 transition-all flex justify-center items-center gap-xs" type="button" onClick={handleCalculate}>
              Calculate
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        </form>

        {/* Result Placeholder */}
        {bmi && status !== 'Peso Saludable' && (
          <div className="mt-lg pt-lg border-t border-surface-variant text-center" id="result-container">
            <h2 className="font-headline-md text-headline-md text-primary mb-xs">Tu IMC es {bmi}</h2>
            <span className="inline-block bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-sm py-1 rounded-full mb-sm">
              {status}
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Esta es una estimación. Te recomendamos consultar a un profesional de la salud.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
