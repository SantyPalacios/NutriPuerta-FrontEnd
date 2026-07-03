export default function RecomendacionPersonalizada() {
  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl flex flex-col gap-xl">
      {/* Hero / Message Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-lg items-center">
        {/* Empathetic Message */}
        <div className="col-span-1 md:col-span-6 flex flex-col gap-md">
          <div className="inline-flex items-center gap-xs bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full w-fit">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="font-label-sm text-label-sm">Nutrición Gentil</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Tu bienestar es mucho más que un simple resultado.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Entendemos que dar el primer paso para conocer tu estado de salud puede generar dudas. Lo importante no son los números de una fórmula, sino cómo te sentís en tu día a día y cómo podemos acompañarte para que alcances tu mejor versión de forma amable y respetuosa con tu cuerpo.
          </p>
          <div className="pt-sm">
            <a className="inline-flex items-center justify-center gap-sm bg-primary-container text-on-primary-container font-label-md text-label-md px-lg py-[16px] rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_30px_rgba(0,0,0,0.08)] transition-all duration-300" href="#">
              Buscar un nutricionista
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
        
        {/* Warm Lifestyle Visual */}
        <div className="col-span-1 md:col-span-6 h-full min-h-[300px]">
          <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
            <img alt="Persona disfrutando de un momento relajado en su cocina" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn6TXdPkHbYaAu7_b8oOAneBtM8MhO3t76z0bTBq1VTQ3NxSA0ypbJELP8YfeIvmTecHmdMwaI3Nw5TTNubveY0lm_4xevsIg685kbM19ks_Jlq1086kKUck_yxOgQEuMnUyEISO7iFtqk5utGPVx2LVSlwJjySsfMdDlkzP56tBE5Rel5gN3I78PpMzC0CPSjv9CmHhpUnXA8cLhbha-1k4aQyzap-kUaRizfx-GtGfLP3BvOubJJJ680MsCkCcko4iK0q7jO1qb3"/>
          </div>
        </div>
      </section>

      {/* Preparation Card Section */}
      <section className="max-w-3xl mx-auto w-full">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 p-md md:p-lg flex flex-col gap-md">
          <div className="flex items-center gap-sm border-b border-surface-variant pb-sm">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_clock</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Cómo prepararte para tu primera consulta</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Nuestros profesionales están para escucharte, no para juzgarte. Acá te dejamos algunos consejos para que tu primera experiencia sea lo más cómoda posible:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
            {/* Tip 1 */}
            <div className="flex items-start gap-sm p-sm bg-surface-container rounded-lg">
              <div className="bg-secondary-container text-on-secondary-container p-xs rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">medical_information</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-[2px]">Análisis previos</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Si tenés estudios de laboratorio recientes (de los últimos 6 meses), llevalos. Ayudan a entender tu contexto.</p>
              </div>
            </div>
            
            {/* Tip 2 */}
            <div className="flex items-start gap-sm p-sm bg-surface-container rounded-lg">
              <div className="bg-tertiary-container text-on-tertiary-container p-xs rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-[2px]">Anotá tus dudas</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Es normal olvidarse cosas en el momento. Llevá un listado de preguntas, hábitos o molestias que quieras charlar.</p>
              </div>
            </div>
            
            {/* Tip 3 */}
            <div className="flex items-start gap-sm p-sm bg-surface-container rounded-lg">
              <div className="bg-primary-container text-on-primary-container p-xs rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-[2px]">Mente abierta</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">No hay "alimentos prohibidos" ni retos inalcanzables. Vení con ganas de iniciar un proceso gradual.</p>
              </div>
            </div>
            
            {/* Tip 4 */}
            <div className="flex items-start gap-sm p-sm bg-surface-container rounded-lg">
              <div className="bg-secondary-fixed text-on-secondary-fixed p-xs rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">self_improvement</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-[2px]">Ropa cómoda y sinceridad</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Relajate, es una charla de conocimento. La honestidad es clave para armar un plan que realmente se adapte a tu vida.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
