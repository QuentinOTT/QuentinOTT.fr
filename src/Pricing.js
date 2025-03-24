import React, { useState, useEffect, useRef } from 'react'
import './Pricing.css'

function Pricing() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  // Détecter si l'appareil est un mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Ajuster la hauteur du carrousel en fonction de la carte active
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      // Laisser le CSS gérer la hauteur pour plus de simplicité
      setTimeout(() => {
        // Force re-render après un court délai pour garantir que tout est bien chargé
        setCurrentSlide(prev => prev);
      }, 100);
    }
  }, [isMobile]);

  // Générer des étoiles pour l'arrière-plan
  const [stars, setStars] = useState([])
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 2 + 1}px`,
          duration: `${Math.random() * 5 + 5}s`
        })
      }
      setStars(newStars)
    }
    
    generateStars()
  }, [])

  // Fonction pour naviguer vers la slide précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev === 0 ? pricingPlans.length - 1 : prev - 1;
      return newSlide;
    });
  };

  // Fonction pour naviguer vers la slide suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev === pricingPlans.length - 1 ? 0 : prev + 1;
      return newSlide;
    });
  };
  
  // Effet pour défiler automatiquement les slides toutes les 10 secondes
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextSlide();
      }, 10000); // Ralenti à 10 secondes au lieu de 5
      
      return () => clearInterval(interval);
    }
  }, [isMobile]); // Dépendance uniquement sur isMobile pour éviter les re-rendus inutiles

  // Données des formules de prix
  const pricingPlans = [
    {
      id: 1,
      title: 'Essentiel',
      price: '499€',
      originalPrice: '699€',
      features: [
        'Site vitrine responsive',
        'Jusqu\'à 5 pages',
        'Formulaire de contact',
        'Optimisation SEO de base',
        'Hébergement pour 1 an',
        'Maintenance mensuelle',
        'Tableau de bord admin',
        'Mentions légales'
      ],
      color: '#33179C',
      icon: '💻',
      popular: false,
      promotion: true
    },
    {
      id: 2,
      title: 'Business',
      price: '999€',
      features: [
        'Site web dynamique',
        'Jusqu\'à 10 pages',
        'Mise en place API',
        'Formulaire avancé',
        'Optimisation SEO complète',
        'Hébergement pour 1 an',
        'Nom de domaine Offert',
        'Maintenance mensuelle',
        'Tableau de bord admin',
        'Support 24/7',
        'Mentions légales',
      ],
      color: '#f70131',
      icon: '🚀',
      popular: true
    },
    {
      id: 3,
      title: 'Premium',
      price: 'Sur Devis',
      features: [
        'Site web sur mesure',
        'Pages illimitées',
        'E-commerce intégré',
        'Mise en place API illimitées',
        'SEO avancé + Analytics',
        'Hébergement pour 2 ans',
        'Nom de Domaine Offert',
        'Maintenance prioritaire',
        'Formation utilisateur',
        'Support 7j/7',
        'Mentions légales',
      ],
      color: '#921212',
      icon: '🖥️',
      popular: false
    }
  ];

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <h2 className="pricing-title">Formules de<br/>Prestations</h2>
        
        {isMobile ? (
          <div className="pricing-carousel-container">
            <div className="pricing-carousel" ref={carouselRef}>
              {pricingPlans.map((plan, index) => (
                <div 
                  className={`pricing-card carousel-item ${plan.popular ? 'popular' : ''} ${index === currentSlide ? 'active' : ''}`}
                  key={plan.id}
                  style={{
                    '--card-color': plan.color,
                    '--card-shadow-color': `${plan.color}40`
                  }}
                  // Ajouter un data-index pour faciliter le débogage
                  data-index={index}
                >
                  {plan.popular && <div className="popular-badge">Populaire</div>}
                  <div className="pricing-icon">{plan.icon}</div>
                  <h3 className="pricing-plan-title">{plan.title}</h3>
                  {plan.promotion && (
                    <div className="promotion-badge">
                      <span className="promotion-text">Promotion</span>
                    </div>
                  )}
                  <div className="pricing-price-container">
                    {plan.originalPrice && <div className="original-price">{plan.originalPrice}</div>}
                    <div className="current-price">{plan.price}</div>
                  </div>
                  <ul className="pricing-features">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="pricing-feature">
                        <span className="feature-check">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="pricing-button">Sélectionner</button>
                </div>
              ))}
            </div>
            
            <div className="carousel-controls">
              <button className="carousel-control prev" onClick={prevSlide}>←</button>
              <div className="carousel-indicators">
                {pricingPlans.map((_, index) => (
                  <span 
                    key={index} 
                    className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button className="carousel-control next" onClick={nextSlide}>→</button>
            </div>
          </div>
        ) : (
          <div className="pricing-grid">
            {pricingPlans.map(plan => (
              <div 
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${hoveredCard === plan.id ? 'hovered' : ''}`}
                key={plan.id}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  '--card-color': plan.color,
                  '--card-shadow-color': `${plan.color}40`
                }}
              >
                {plan.popular && <div className="popular-badge">Populaire</div>}
                <div className="pricing-icon">{plan.icon}</div>
                <h3 className="pricing-plan-title">{plan.title}</h3>
                {plan.promotion && (
                  <div className="promotion-badge">
                    <span className="promotion-text">Promotion</span>
                  </div>
                )}
                <div className="pricing-price-container">
                  {plan.originalPrice && <div className="original-price">{plan.originalPrice}</div>}
                  <div className="current-price">{plan.price}</div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="pricing-feature">
                      <span className="feature-check">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className="pricing-button">Sélectionner</button>
              </div>
            ))}
          </div>
        )}
        <div className="pricing-note">
          <span className="pricing-note-icon">⚠️</span>
          <span className="pricing-note-text">Les tarifs sont négociables selon le volume et la complexité du projet.</span>
        </div>
      </div>
      {stars.map(star => (
        <div key={star.id} className="star" style={{
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          animationDuration: star.duration
        }} />
      ))}
    </section>
  )

}


export default Pricing
