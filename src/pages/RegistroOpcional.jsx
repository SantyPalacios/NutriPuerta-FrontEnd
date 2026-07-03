export default function RegistroOpcional() {
  return (
    <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-xl">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-md md:p-xl soft-shadow hover-lift relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 text-center mb-lg">
          <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Bienvenido a NutriPuerta</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Guarda tus datos para futuras consultas con profesionales. Sin prisas, a tu propio ritmo.
          </p>
        </div>
        
        <form className="relative z-10 space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="name">Nombre</label>
              <input className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-200" id="name" placeholder="Ej. Ana García" type="text"/>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Correo Electrónico</label>
              <input className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-200" id="email" placeholder="ana@ejemplo.com" type="email"/>
            </div>
          </div>
          
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant">Áreas de Interés <span className="text-sm font-normal text-on-surface-variant/70">(Opcional)</span></label>
            <div className="flex flex-wrap gap-sm">
              <label className="cursor-pointer group">
                <input className="peer sr-only" type="checkbox"/>
                <div className="px-md py-sm rounded-full bg-surface-container border border-outline-variant text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary transition-all duration-200 flex items-center gap-xs font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>restaurant</span>
                  Alimentación Consciente
                </div>
              </label>
              <label className="cursor-pointer group">
                <input className="peer sr-only" type="checkbox"/>
                <div className="px-md py-sm rounded-full bg-surface-container border border-outline-variant text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary transition-all duration-200 flex items-center gap-xs font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>psychology</span>
                  Relación con la Comida
                </div>
              </label>
              <label className="cursor-pointer group">
                <input className="peer sr-only" type="checkbox"/>
                <div className="px-md py-sm rounded-full bg-surface-container border border-outline-variant text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary transition-all duration-200 flex items-center gap-xs font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>local_hospital</span>
                  Nutrición Clínica
                </div>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="source">¿Cómo te enteraste de nosotros? <span className="text-sm font-normal text-on-surface-variant/70">(Opcional)</span></label>
            <select className="w-full bg-primary/5 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-sm font-body-md text-body-md text-on-surface transition-all duration-200 appearance-none" id="source" defaultValue="">
              <option disabled value="">Selecciona una opción</option>
              <option value="social">Redes Sociales</option>
              <option value="friend">Recomendación de un amigo</option>
              <option value="search">Búsqueda en Google</option>
              <option value="other">Otro</option>
            </select>
          </div>
          
          <div className="pt-sm flex justify-end">
            <button className="bg-primary text-on-primary font-label-md text-label-md px-xl py-sm rounded-lg hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-200 flex items-center gap-sm" type="button">
              <span>Guardar mis datos</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
