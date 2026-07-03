export default function MitosAlimentarios() {
  const scrollLeft = () => {
    document.getElementById('myths-carousel').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.getElementById('myths-carousel').scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <main className="flex-grow flex flex-col items-center py-lg px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto">
      <div className="text-center mb-xl w-full max-w-3xl">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-sm">Desmintiendo Mitos</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Descubre la verdad detrás de los alimentos más incomprendidos. Nutrición basada en evidencia, sin culpas ni restricciones innecesarias.</p>
      </div>

      {/* Carousel Container */}
      <div className="w-full relative">
        <div className="flex overflow-x-auto gap-md pb-lg pt-sm hide-scrollbar snap-x snap-mandatory scroll-smooth" id="myths-carousel">
          
          {/* Card 1: Huevo */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-surface-container-lowest rounded-xl soft-shadow p-md card-hover transition-all duration-300">
            <div className="h-48 w-full rounded-lg mb-md bg-surface-container overflow-hidden relative">
              <img className="w-full h-full object-cover" alt="A beautifully lit close-up of a perfectly cooked sunny-side-up egg on a minimalist ceramic plate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpPnhUB4U-cm_6ZiuRQ_k39qyErgRzSiMbBuEzCb9M8L1I5t0K7Np9R3MtIRIu516mRQl6CRH9L6zUZn2JSohLTKSgoZTvI5h11NZGKmKhvA31tmgl678ijGz7osazsLWQGREBDpX_e-x7PScBLt4yqL7mBa2Pfi0C25P4UWwJDkgT3YJvXP998mmuU6PuFYpXzZ__ASKvNqSN5yB6mbmAdAXKhWiFgb9QRo-uWnpDiKCSKInbRmuL1bJP9NzPOEtg1tCCyr4iCKm5"/>
            </div>
            <div className="mb-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">El Huevo</h2>
              <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-sm py-xs rounded-full">Colesterol Bueno</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              "Comer huevo todos los días es malo para el corazón." <br/>
              <strong>Falso.</strong> Múltiples estudios demuestran que el consumo moderado de huevos no eleva significativamente el colesterol en la sangre en la mayoría de las personas, siendo una excelente fuente de proteína.
            </p>
            {/* Macro Bar Chart */}
            <div className="w-full bg-surface-container-high rounded-full h-3 mb-xs overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: '35%' }} title="Proteína"></div>
              <div className="bg-secondary h-full" style={{ width: '60%' }} title="Grasas"></div>
              <div className="bg-tertiary h-full" style={{ width: '5%' }} title="Carbohidratos"></div>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>Proteína 35%</span>
              <span>Grasas 60%</span>
            </div>
          </div>

          {/* Card 2: Pollo */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-surface-container-lowest rounded-xl soft-shadow p-md card-hover transition-all duration-300">
            <div className="h-48 w-full rounded-lg mb-md bg-surface-container overflow-hidden relative">
              <img className="w-full h-full object-cover" alt="Grilled chicken breast slices" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoQeMfqpAzcIp2BbXjBh8KMzouEe-gqXiVQUHoXMXkB_ZoCvtr0dqRPxiSgK0bW3LymqjOX7uWBWB4XHSDOE6alp7GCa5ipkwJKymVA8F8-1d_51_F9z-eQEiSuqBUKgtssOxaZVqjqnfSY4WxOBJX35KMeDw21Ng-_-MdJkccGcCXBZMTOgjMzEiVt11qFN_D1Z9eigl1hLClgizBQkLE6iWvCoLg-o41ZLLxZ4ajiKqlBTJ13O46y9dW1uEvTLEhWKUqs7IuWe04"/>
            </div>
            <div className="mb-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">El Pollo</h2>
              <span className="inline-block bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-sm py-xs rounded-full">Proteína Magra</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              "El pollo tiene hormonas que te hacen daño." <br/>
              <strong>Falso.</strong> El uso de hormonas en la cría de aves de corral está estrictamente prohibido en muchos países (incluyendo Argentina). El crecimiento rápido de los pollos modernos se debe a la selección genética y mejor nutrición, no a hormonas inyectadas.
            </p>
            {/* Macro Bar Chart */}
            <div className="w-full bg-surface-container-high rounded-full h-3 mb-xs overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: '80%' }} title="Proteína"></div>
              <div className="bg-secondary h-full" style={{ width: '20%' }} title="Grasas"></div>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>Proteína 80%</span>
              <span>Grasas 20%</span>
            </div>
          </div>

          {/* Card 3: Pan */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-surface-container-lowest rounded-xl soft-shadow p-md card-hover transition-all duration-300">
            <div className="h-48 w-full rounded-lg mb-md bg-surface-container overflow-hidden relative">
              <img className="w-full h-full object-cover" alt="Freshly baked artisanal bread" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqx_-lCz0sNd4B5QObxkE5S4hqacM5M72Vv1PWDfZr9vOO0HDH40xY63xKoFwkniK59L7Qtstw94zHKusp_9HYyYMjQmgT7375JHp4VfCQDPMMD_DFMYSqA_gcG1Nx9e9zUL9XDtdUVQWu4nGdGXGNmGy9taot2jzRprI4xT3Cnmt52dJ7BiaYt_Bi4BMJs7sIqjSjyD36eTB8R4RUghg0BpGlRgxjcmzxmc4JeqUFLt_BN53c3U-fouMu49PtbSpGnOTyW5IB3Ua4"/>
            </div>
            <div className="mb-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">El Pan</h2>
              <span className="inline-block bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-sm py-xs rounded-full">Energía Necesaria</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              "El pan engorda y debes eliminarlo." <br/>
              <strong>Falso.</strong> El pan no es tu enemigo. Ningún alimento por sí solo te hace ganar peso. El pan, especialmente el integral, aporta carbohidratos complejos esenciales para obtener energía y fibra que ayuda a la saciedad. Disfrútalo en tu rutina diaria.
            </p>
            {/* Macro Bar Chart */}
            <div className="w-full bg-surface-container-high rounded-full h-3 mb-xs overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: '10%' }} title="Proteína"></div>
              <div className="bg-secondary h-full" style={{ width: '5%' }} title="Grasas"></div>
              <div className="bg-tertiary h-full" style={{ width: '85%' }} title="Carbohidratos"></div>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>Carbohidratos 85%</span>
              <span>Proteína 10%</span>
            </div>
          </div>

          {/* Card 4: Banana */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-surface-container-lowest rounded-xl soft-shadow p-md card-hover transition-all duration-300">
            <div className="h-48 w-full rounded-lg mb-md bg-surface-container overflow-hidden relative">
              <img className="w-full h-full object-cover" alt="Yellow banana" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_d3wVn5gU-dH1I6PtcmY4CDA4w96KGpbgO8k2IK9Oqn2OwvN3oAeR87lRwRvlFV2Yzte3yH3LMX449CkiKHULXg-O_n4wqjsAOa8TKuuv2NbKoqdKVCX4gJ8NdJ9aNpn6OJsV2UdQbPO0-okgninVYAVdbqOBWjs5z2ssAXI-Rgl_8wl35Oixfdq1LnqG9LFEgDv5FjEo_m61uF0ZpXFZre_YV7IJ_5Hn0KwNiuIRvfpnvYnGX5bhHLQ2T9X8-_QeNaai6MrOwaRM"/>
            </div>
            <div className="mb-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">La Banana</h2>
              <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm px-sm py-xs rounded-full">Potasio & Alegría</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              "Comer banana de noche es malo para la digestión." <br/>
              <strong>Falso.</strong> La banana es fácil de digerir a cualquier hora. De hecho, contiene triptófano y magnesio, que pueden ayudar a relajar los músculos y promover un mejor descanso nocturno. Un snack excelente.
            </p>
            {/* Macro Bar Chart */}
            <div className="w-full bg-surface-container-high rounded-full h-3 mb-xs overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: '5%' }} title="Proteína"></div>
              <div className="bg-secondary h-full" style={{ width: '2%' }} title="Grasas"></div>
              <div className="bg-tertiary h-full" style={{ width: '93%' }} title="Carbohidratos"></div>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>Carbohidratos 93%</span>
              <span>Potasio Alto</span>
            </div>
          </div>

        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center gap-sm mt-md">
          <button 
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors soft-shadow" 
            onClick={scrollLeft}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors soft-shadow" 
            onClick={scrollRight}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
  );
}
