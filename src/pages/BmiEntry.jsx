import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BmiEntry() {
  const navigate = useNavigate();
  
  // State for form
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('female');
  const [activity, setActivity] = useState('3'); // default: moderado (1.75)

  // State for calculation results
  const [results, setResults] = useState(null);

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('nutri_calculations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWeight(parsed.weight || '');
        setHeight(parsed.height || '');
        setAge(parsed.age || '');
        setSex(parsed.sex || 'female');
        setActivity(parsed.activity || '3');
        setResults(parsed);
      } catch (e) {
        console.error("Error loading saved calculations:", e);
      }
    }
  }, []);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!weight || !height || !age) return;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    // 1. Calculate IMC
    const heightInMeters = h / 100;
    const imc = parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
    
    let imcCategory = 'Normal';
    let imcDescription = 'Tu IMC está en un rango saludable. ¡Sigue cuidándote!';
    let imcColor = 'text-secondary bg-secondary-container';
    
    if (imc < 18.5) {
      imcCategory = 'Bajo Peso';
      imcDescription = 'Tu peso está por debajo de lo sugerido para tu altura. Considera consultarlo con un profesional.';
      imcColor = 'text-primary bg-primary-fixed-dim/20';
    } else if (imc >= 25 && imc <= 29.9) {
      imcCategory = 'Sobrepeso';
      imcDescription = 'Tu IMC indica sobrepeso. Pequeños hábitos cotidianos pueden hacer la diferencia.';
      imcColor = 'text-tertiary bg-tertiary-container';
    } else if (imc >= 30) {
      imcCategory = 'Obesidad';
      imcDescription = 'Tu IMC indica obesidad. Te sugerimos acompañar tu camino con asesoría especializada.';
      imcColor = 'text-error bg-error-container';
    }

    // 2. Calculate RED (Mifflin-St Jeor)
    let bmr = 10 * w + 6.25 * h - 5 * a;
    if (sex === 'male') {
      bmr += 5;
    } else if (sex === 'female') {
      bmr -= 161;
    } else {
      bmr -= 78; // General/Other
    }

    // Activity multiplier
    let multiplier = 1.75;
    switch (activity) {
      case '1': multiplier = 1.3; break;   // Sedentario
      case '2': multiplier = 1.5; break;   // Ligero
      case '3': multiplier = 1.75; break;  // Moderado
      case '4': multiplier = 2.0; break;   // Muy activo
    }

    let rawRed = bmr * multiplier;
    
    // Rounding to nearest 50 kcal
    let hundredBase = Math.floor(rawRed / 100) * 100;
    let remainder = rawRed % 100;
    let red = hundredBase;
    if (remainder >= 25 && remainder < 75) {
      red += 50;
    } else if (remainder >= 75) {
      red += 100;
    }

    // 3. Calculate Macronutrient Ranges & Grams
    // Carbs: 45 - 65% of RED (4 kcal/g)
    const carbsMin = Math.round((red * 0.45) / 4);
    const carbsMax = Math.round((red * 0.65) / 4);

    // Proteins: 10 - 35% of RED (4 kcal/g)
    const proteinMin = Math.round((red * 0.10) / 4);
    const proteinMax = Math.round((red * 0.35) / 4);

    // Fats: 20 - 35% of RED (9 kcal/g)
    const fatsMin = Math.round((red * 0.20) / 9);
    const fatsMax = Math.round((red * 0.35) / 9);

    const calculations = {
      weight: w,
      height: h,
      age: a,
      sex,
      activity,
      imc,
      imcCategory,
      imcDescription,
      imcColor,
      red,
      carbs: { min: carbsMin, max: carbsMax },
      protein: { min: proteinMin, max: proteinMax },
      fats: { min: fatsMin, max: fatsMax }
    };

    setResults(calculations);
    localStorage.setItem('nutri_calculations', JSON.stringify(calculations));
  };

  const handleClear = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setSex('female');
    setActivity('3');
    setResults(null);
    localStorage.removeItem('nutri_calculations');
  };

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl flex flex-col gap-lg relative">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-md relative z-10">
        <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          calculate
        </span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-xs">
          Calculadora Nutricional Inteligente
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Obtén de forma instantánea tu Índice de Masa Corporal (IMC), tu Requerimiento Energético Diario (RED) y la distribución óptima de macronutrientes para tu cuerpo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg relative z-10 items-start">
        {/* Form Column */}
        <section className="lg:col-span-5 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md md:p-lg flex flex-col gap-md">
          <h2 className="font-headline-md text-headline-md text-on-surface border-b border-surface-variant pb-sm flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary">person</span>
            Tus Datos Corporales
          </h2>
          
          <form className="flex flex-col gap-md" onSubmit={handleCalculate}>
            {/* Weight & Height Row */}
            <div className="grid grid-cols-2 gap-sm">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="weight">
                  Peso (kg)
                </label>
                <div className="relative bg-primary/5 rounded-lg border border-transparent transition-all duration-200 input-focus-ring flex items-center px-sm py-xs">
                  <input 
                    className="bg-transparent border-none w-full font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/40 focus:ring-0 p-0" 
                    id="weight" max="300" min="20" placeholder="Ej. 70" required step="0.1" type="number" 
                    value={weight} onChange={(e) => setWeight(e.target.value)} 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="height">
                  Altura (cm)
                </label>
                <div className="relative bg-primary/5 rounded-lg border border-transparent transition-all duration-200 input-focus-ring flex items-center px-sm py-xs">
                  <input 
                    className="bg-transparent border-none w-full font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/40 focus:ring-0 p-0" 
                    id="height" max="250" min="50" placeholder="Ej. 170" required type="number" 
                    value={height} onChange={(e) => setHeight(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Age & Sex Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="age">
                  Edad (años)
                </label>
                <div className="relative bg-primary/5 rounded-lg border border-transparent transition-all duration-200 input-focus-ring flex items-center px-sm py-xs">
                  <input 
                    className="bg-transparent border-none w-full font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/40 focus:ring-0 p-0" 
                    id="age" max="120" min="1" placeholder="Ej. 28" required type="number" 
                    value={age} onChange={(e) => setAge(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Sexo Biológico
                </label>
                <div className="grid grid-cols-3 gap-xs">
                  {['female', 'male', 'other'].map((item) => (
                    <label key={item} className="cursor-pointer relative">
                      <input 
                        className="peer sr-only" name="sex" type="radio" value={item}
                        checked={sex === item}
                        onChange={() => setSex(item)}
                      />
                      <div className="text-center py-xs px-xs rounded-lg border border-outline-variant/30 bg-surface-container-low peer-checked:bg-primary peer-checked:text-on-primary font-label-sm text-label-sm text-on-surface-variant transition-all capitalize">
                        {item === 'female' ? 'Mujer' : item === 'male' ? 'Varón' : 'Otro'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Level */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="activity">
                Nivel de Actividad Física
              </label>
              <select 
                className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface transition-all duration-200 appearance-none cursor-pointer" 
                id="activity" 
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="1">Sedentario (Poco o nada de ejercicio)</option>
                <option value="2">Ligero (1-3 días de ejercicio suave/semana)</option>
                <option value="3">Moderado (3-5 días de ejercicio/semana)</option>
                <option value="4">Muy Activo (6-7 días de entrenamiento intenso)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-sm pt-sm">
              <button 
                type="submit" 
                className="flex-grow bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-[1px] active:scale-95 transition-all duration-200 flex justify-center items-center gap-xs"
              >
                Calcular Todo
                <span className="material-symbols-outlined text-sm">bolt</span>
              </button>
              {results && (
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md px-md py-sm rounded-lg hover:bg-surface-variant active:scale-95 transition-all duration-200"
                >
                  Limpiar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Results Column */}
        <section className="lg:col-span-7 flex flex-col gap-md min-h-[400px]">
          {results ? (
            <div className="flex flex-col gap-md animate-fade-in">
              {/* Top Bento Row: IMC & RED */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {/* IMC Card */}
                <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-sm border border-outline-variant/10 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Índice de Masa Corporal</span>
                    <span className={`font-label-sm text-label-sm px-xs py-1 rounded-full ${results.imcColor}`}>
                      {results.imcCategory}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-xs my-xs">
                    <span className="font-headline-xl text-headline-xl text-primary">{results.imc}</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">kg/m²</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {results.imcDescription}
                  </p>
                </div>

                {/* RED Card */}
                <div className="bg-primary-container text-on-primary-container rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md flex flex-col justify-between relative overflow-hidden">
                  <span className="material-symbols-outlined absolute right-[-20px] bottom-[-20px] text-[120px] opacity-10" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
                  <div>
                    <span className="font-label-md text-label-md opacity-80 uppercase tracking-wider block mb-sm">Gasto Energético Diario (RED)</span>
                    <div className="flex items-baseline gap-xs">
                      <span className="font-headline-xl text-headline-xl">{results.red}</span>
                      <span className="font-body-md text-body-md">kcal / día</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md opacity-80 mt-md">
                    Tu energía de mantenimiento sugerida en base a tu nivel de actividad física diaria.
                  </p>
                </div>
              </div>

              {/* Macros Container Card */}
              <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md md:p-lg border border-outline-variant/10 flex flex-col gap-md">
                <div className="flex justify-between items-center border-b border-surface-variant pb-xs">
                  <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-xs">
                    <span className="material-symbols-outlined text-secondary">restaurant</span>
                    Distribución de Macronutrientes
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant/70">Valores diarios estimados</span>
                </div>

                {/* Macros Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                  {/* Carbs */}
                  <div className="p-sm rounded-lg bg-tertiary-fixed/20 border-l-4 border-tertiary flex flex-col gap-xs">
                    <div className="flex justify-between items-center text-tertiary">
                      <span className="font-label-md text-label-md font-bold">Carbohidratos</span>
                      <span className="font-label-sm text-label-sm opacity-80">45-65%</span>
                    </div>
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {results.carbs.min} - {results.carbs.max}
                      <span className="font-body-md font-normal text-on-surface-variant/80 ml-xs">g</span>
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Principal fuente de energía rápida.</p>
                  </div>

                  {/* Protein */}
                  <div className="p-sm rounded-lg bg-secondary-container/30 border-l-4 border-secondary flex flex-col gap-xs">
                    <div className="flex justify-between items-center text-secondary">
                      <span className="font-label-md text-label-md font-bold">Proteínas</span>
                      <span className="font-label-sm text-label-sm opacity-80">10-35%</span>
                    </div>
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {results.protein.min} - {results.protein.max}
                      <span className="font-body-md font-normal text-on-surface-variant/80 ml-xs">g</span>
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Construcción y reparación muscular.</p>
                  </div>

                  {/* Fats */}
                  <div className="p-sm rounded-lg bg-primary-fixed/20 border-l-4 border-primary flex flex-col gap-xs">
                    <div className="flex justify-between items-center text-primary">
                      <span className="font-label-md text-label-md font-bold">Grasas</span>
                      <span className="font-label-sm text-label-sm opacity-80">20-35%</span>
                    </div>
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {results.fats.min} - {results.fats.max}
                      <span className="font-body-md font-normal text-on-surface-variant/80 ml-xs">g</span>
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Regulación hormonal y absorción celular.</p>
                  </div>
                </div>
              </div>

              {/* Call to action to page 4 */}
              <div className="bg-surface-container-low rounded-xl p-md flex flex-col md:flex-row items-center justify-between gap-md border border-outline-variant/10">
                <div className="flex gap-sm items-start">
                  <span className="material-symbols-outlined text-primary text-3xl mt-xs">mail</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">¿Quieres consultar con un profesional?</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Puedes enviar este cálculo y tus dudas por email a nuestros profesionales.</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-primary-container text-on-primary-container hover:bg-primary-container/85 font-label-md text-label-md px-md py-xs rounded-lg active:scale-95 transition-all flex items-center gap-xs self-stretch md:self-auto justify-center"
                >
                  Enviar por Email
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-surface-container-low rounded-xl border border-dashed border-outline-variant/40 flex flex-col items-center justify-center p-lg text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl opacity-30 mb-sm">bar_chart</span>
              <h3 className="font-headline-md text-headline-md opacity-60">Resultados del cálculo</h3>
              <p className="font-body-md text-body-md max-w-sm opacity-50 mt-xs">
                Ingresa tus datos corporales en el formulario de la izquierda y haz clic en "Calcular Todo" para ver tu informe completo aquí.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
