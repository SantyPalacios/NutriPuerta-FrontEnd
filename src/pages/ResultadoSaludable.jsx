import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultadoSaludable() {
  const location = useLocation();
  const { bmi, weight, height } = location.state || { bmi: 22.4, weight: 65, height: 170 };

  const [age, setAge] = useState(28);
  const [sex, setSex] = useState('female');
  const [activity, setActivity] = useState(3);
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [red, setRed] = useState(0);

  const calculateRED = () => {
    // Mifflin-St Jeor Equation
    let base = (10 * weight) + (6.25 * height) - (5 * age);
    if (sex === 'male') {
      base += 5;
    } else if (sex === 'female') {
      base -= 161;
    } else {
      base -= 78; // Promedio para "Otro"
    }

    let multiplier = 1.5;
    switch (parseInt(activity)) {
      case 1: multiplier = 1.3; break; // Sedentario
      case 2: multiplier = 1.5; break; // Ligeramente activo
      case 3: multiplier = 1.75; break; // Moderadamente activo
      case 4: multiplier = 2.0; break; // Muy activo
      default: multiplier = 1.5;
    }

    let baseRed = Math.round(base * multiplier);
    
    // Rounding logic:
    // < 25 => 00
    // 25 - 74 => 50
    // >= 75 => 100
    let hundredBase = Math.floor(baseRed / 100) * 100;
    let remainder = baseRed % 100;
    let finalRed = hundredBase;
    
    if (remainder >= 25 && remainder < 75) {
      finalRed += 50;
    } else if (remainder >= 75) {
      finalRed += 100;
    }

    setRed(finalRed);
    setIsCalculated(true);
  };

  const carbsMin = Math.round((red * 0.45) / 4);
  const carbsMax = Math.round((red * 0.55) / 4);
  
  const proteinMin = Math.round(weight * 1.5);
  const proteinMax = Math.round(weight * 2.0);
  
  const fatsMin = Math.round((red * 0.25) / 9);
  const fatsMax = Math.round((red * 0.30) / 9);

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-xl max-w-[1000px] mx-auto w-full flex flex-col gap-lg">
      {/* BMI Result Celebration Card */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md md:p-lg text-center flex flex-col items-center justify-center">
        <div className="bg-secondary-container text-on-secondary-container p-sm rounded-full mb-md flex items-center justify-center">
          <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
          Tu IMC es <span className="text-secondary">{bmi}</span>
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
          Tu IMC está en un rango saludable. Sigamos cuidándote.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Secondary Form */}
        <section className="md:col-span-5 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md">
          <h3 className="font-headline-md text-headline-md text-on-surface">Afinar Requerimientos</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-xs">Para calcular tu energía diaria, necesitamos unos detalles más.</p>
          
          <form className="flex flex-col gap-sm" onSubmit={(e) => { e.preventDefault(); calculateRED(); }}>
            {/* Age */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="age">Edad</label>
              <input 
                className="bg-surface-container-low border-none rounded-lg p-sm text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:outline-none transition-shadow" 
                id="age" placeholder="Años" type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            
            {/* Sex */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Sexo Biológico</label>
              <div className="grid grid-cols-3 gap-sm">
                <label className="cursor-pointer relative">
                  <input 
                    className="peer sr-only" name="sex" type="radio" value="female"
                    checked={sex === 'female'}
                    onChange={() => setSex('female')}
                  />
                  <div className="text-center p-sm rounded-lg border-2 border-transparent bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:font-bold font-body-md text-body-md text-on-surface-variant transition-all">Mujer</div>
                </label>
                <label className="cursor-pointer relative">
                  <input 
                    className="peer sr-only" name="sex" type="radio" value="male"
                    checked={sex === 'male'}
                    onChange={() => setSex('male')}
                  />
                  <div className="text-center p-sm rounded-lg border-2 border-transparent bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:font-bold font-body-md text-body-md text-on-surface-variant transition-all">Hombre</div>
                </label>
                <label className="cursor-pointer relative">
                  <input 
                    className="peer sr-only" name="sex" type="radio" value="other"
                    checked={sex === 'other'}
                    onChange={() => setSex('other')}
                  />
                  <div className="text-center p-sm rounded-lg border-2 border-transparent bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:font-bold font-body-md text-body-md text-on-surface-variant transition-all">Otro</div>
                </label>
              </div>
            </div>
            
            {/* Activity Level */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="activity">Nivel de Actividad</label>
              <select 
                className="bg-surface-container-low border-none rounded-lg p-sm text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:outline-none transition-shadow appearance-none cursor-pointer" 
                id="activity" 
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="1">Sedentario</option>
                <option value="2">Ligeramente activo</option>
                <option value="3">Moderadamente activo</option>
                <option value="4">Muy activo</option>
              </select>
            </div>
            
            <button onClick={calculateRED} className="mt-md w-full bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg hover:shadow-lg hover:shadow-[rgba(120,89,0,0.2)] hover:-translate-y-[1px] transition-all duration-300" type="button">
              Calcular
            </button>
          </form>
        </section>
        
        {/* Results Display (Bento Grid) */}
        <section className={`md:col-span-7 flex flex-col gap-md transition-opacity duration-500 ${isCalculated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {isCalculated && (
            <>
              {/* RED Card */}
              <div className="bg-primary-container text-on-primary-container rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md flex flex-col justify-center items-start h-full min-h-[160px] relative overflow-hidden">
                <span className="material-symbols-outlined absolute right-[-20px] bottom-[-20px] text-[120px] opacity-10" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
                <h3 className="font-label-md text-label-md opacity-80 uppercase tracking-wider mb-xs">Requerimiento Energético (RED)</h3>
                <div className="flex items-baseline gap-xs">
                  <span className="font-headline-xl text-headline-xl">{red}</span>
                  <span className="font-body-md text-body-md">kcal / día</span>
                </div>
                <p className="font-body-md text-body-md opacity-80 mt-xs">Mantenimiento sugerido basado en tu actividad.</p>
              </div>
              
              {/* Macros Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                {/* Carbs */}
                <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-sm border-t-4 border-tertiary-container flex flex-col">
                  <div className="flex items-center gap-xs mb-sm text-tertiary">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>grass</span>
                    <span className="font-label-md text-label-md">Carbohidratos</span>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface">{carbsMin} - {carbsMax}<span className="text-body-md font-normal">g</span></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-xs">45-55% de energía</span>
                </div>
                
                {/* Protein */}
                <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-sm border-t-4 border-secondary-container flex flex-col">
                  <div className="flex items-center gap-xs mb-sm text-secondary">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>fitness_center</span>
                    <span className="font-label-md text-label-md">Proteínas</span>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface">{proteinMin} - {proteinMax}<span className="text-body-md font-normal">g</span></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-xs">1.5 - 2.0g por kg</span>
                </div>
                
                {/* Fats */}
                <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-sm border-t-4 border-outline-variant flex flex-col">
                  <div className="flex items-center gap-xs mb-sm text-outline">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>water_drop</span>
                    <span className="font-label-md text-label-md">Grasas</span>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface">{fatsMin} - {fatsMax}<span className="text-body-md font-normal">g</span></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-xs">25-30% de energía</span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
