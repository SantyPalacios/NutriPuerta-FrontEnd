import { useNavigate } from 'react-router-dom';

const professionals = [
  {
    id: 'prof-1',
    name: 'Lic. María Luz Fernández',
    title: 'Nutrición Clínica & Salud Hormonal',
    specialties: ['Enfermedades metabólicas', 'Nutrición vegetariana/vegana', 'Trastornos digestivos'],
    registration: 'M.N. 8421',
    contactWhatsapp: 'https://wa.me/5491111111111?text=Hola%20Lic.%20Fernandez,%20vengo%20desde%20NutriPuerta...',
    instagram: '@marialuz.nutri',
    avatarText: 'ML',
    bgColor: 'bg-primary-container/30 text-primary',
  },
  {
    id: 'prof-2',
    name: 'Lic. Tomás Rossi',
    title: 'Nutrición Deportiva & Composición Corporal',
    specialties: ['Entrenamiento de fuerza', 'Hipertrofia y pérdida de grasa', 'Suplementación deportiva'],
    registration: 'M.N. 9173',
    contactWhatsapp: 'https://wa.me/5491122222222?text=Hola%20Lic.%20Rossi,%20vengo%20desde%20NutriPuerta...',
    instagram: '@tomasrossi.nutri',
    avatarText: 'TR',
    bgColor: 'bg-secondary-container text-secondary',
  },
  {
    id: 'prof-3',
    name: 'Lic. Sofía Bianchi',
    title: 'Alimentación Consciente & Psiconutrición',
    specialties: ['Relación con la comida', 'Alimentación intuitiva', 'Trastornos de la conducta alimentaria'],
    registration: 'M.N. 7539',
    contactWhatsapp: 'https://wa.me/5491133333333?text=Hola%20Lic.%20Bianchi,%20vengo%20desde%20NutriPuerta...',
    instagram: '@sofiabianchi.nutricion',
    avatarText: 'SB',
    bgColor: 'bg-tertiary-fixed/30 text-tertiary',
  }
];

export default function Profesionales() {
  const navigate = useNavigate();

  const handleContactRedirect = (profName) => {
    // Save chosen professional to localStorage to pre-select in Page 4
    localStorage.setItem('selected_professional', profName);
    navigate('/contact');
  };

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl flex flex-col gap-lg relative">
      {/* Decorative Background Element */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-md">
        <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          group
        </span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-xs">
          Nuestros Profesionales Colaboradores
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Ponte en contacto con nutricionistas matriculados y especializados. Encuentra el acompañamiento ideal para tus metas de bienestar.
        </p>
      </div>

      {/* Grid of Professionals */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-md relative z-10">
        {professionals.map((prof) => (
          <div key={prof.id} className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 p-md flex flex-col border border-outline-variant/10">
            {/* Header info */}
            <div className="flex items-center gap-sm mb-md">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-headline-md text-headline-md font-bold ${prof.bgColor}`}>
                {prof.avatarText}
              </div>
              <div>
                <h2 className="font-headline-md text-[18px] leading-snug text-on-surface font-bold">{prof.name}</h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant/70">{prof.registration}</span>
              </div>
            </div>

            {/* Specialty tag/title */}
            <div className="mb-sm">
              <span className="font-label-md text-label-md text-primary block mb-xs">{prof.title}</span>
              <div className="flex flex-wrap gap-xs mt-xs">
                {prof.specialties.map((spec, i) => (
                  <span key={i} className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm px-xs py-1 rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-grow my-sm"></div>

            {/* Contact channels */}
            <div className="flex flex-col gap-sm pt-sm border-t border-surface-variant/40">
              <a 
                href={prof.contactWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-xs rounded-lg flex justify-center items-center gap-xs hover:shadow-md transition-shadow"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp Directo
              </a>

              <button 
                onClick={() => handleContactRedirect(prof.name)}
                className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-xs rounded-lg flex justify-center items-center gap-xs hover:shadow-md transition-shadow"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Enviar Consulta por Email
              </button>

              <div className="text-center font-label-sm text-label-sm text-on-surface-variant/60">
                Instagram: <span className="text-primary font-semibold">{prof.instagram}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Info bottom card */}
      <div className="bg-surface-container-low rounded-xl p-md max-w-3xl mx-auto mt-md border border-outline-variant/10 text-center">
        <h4 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Nota de Transparencia</h4>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          NutriPuerta facilita la visualización y estimación de parámetros iniciales de manera gratuita. Las consultas, turnos y honorarios posteriores se coordinan de forma directa y autónoma con cada profesional matriculado.
        </p>
      </div>
    </main>
  );
}
