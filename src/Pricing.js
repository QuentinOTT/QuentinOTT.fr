import React, { useState, useEffect } from 'react'
import './Pricing.css'

function Pricing() {
  const [hoveredCard, setHoveredCard] = useState(null);

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

  // Données des formules de prix
  const pricingPlans = [
    {
      id: 1,
      title: 'Essentiel',
      price: '699€',
      features: [
        'Site vitrine responsive',
        'Jusqu\'à 5 pages',
        'Formulaire de contact',
        'Optimisation SEO de base',
        'Hébergement pour 1 an',
        'Maintenance mensuelle',
        'Tableau de bord admin',
      ],
      color: '#14CEFF',
      icon: '💻',
      popular: false
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
              <div className="pricing-price">{plan.price}</div>
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
