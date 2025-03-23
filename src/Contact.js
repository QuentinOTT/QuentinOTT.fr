import React, { useState, useEffect } from 'react'
import './Contact.css'
import { supabase } from './supabaseClient'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    plan: '',
    message: ''
  })

  const [formStep, setFormStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Options pour le sujet
  const subjectOptions = [
    { value: 'site-web', label: 'Création d\'un site web' },
    { value: 'maintenance', label: 'Maintenance d\'un site existant' },
    { value: 'conseil', label: 'Conseil en développement web' },
    { value: 'autre', label: 'Autre demande' }
  ]

  // Options pour les formules
  const planOptions = [
    { value: 'essentiel', label: 'Formule Essentiel' },
    { value: 'business', label: 'Formule Business' },
    { value: 'premium', label: 'Formule Premium' },
    { value: 'unsure', label: 'Je ne sais pas encore' }
  ]

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  // Passer à l'étape suivante
  const nextStep = () => {
    if (formStep < 3) {
      setIsAnimating(true)
      setTimeout(() => {
        setFormStep(prev => prev + 1)
        setIsAnimating(false)
      }, 500)
    }
  }

  // Revenir à l'étape précédente
  const prevStep = () => {
    if (formStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setFormStep(prev => prev - 1)
        setIsAnimating(false)
      }, 500)
    }
  }

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      console.log('Tentative d\'envoi du message:', formData)
      
      // Créer l'objet de données à envoyer
      const messageData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null, // Gérer le cas où le téléphone est vide
        subject: formData.subject,
        plan: formData.subject === 'site-web' ? formData.plan : null,
        message: formData.message,
        created_at: new Date().toISOString() // Ajouter un timestamp
      }
      
      console.log('Données à envoyer:', messageData)
      
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([messageData])
        .select()
      
      console.log('Réponse de Supabase:', { data, error })

      if (error) {
        console.error('Erreur détaillée:', error)
        throw error
      }

      console.log('Message envoyé avec succès:', data)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        plan: '',
        message: ''
      })
      setFormStep(4)
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      
      // Message d'erreur plus détaillé pour aider au diagnostic
      if (error.code) {
        switch(error.code) {
          case '42P01': // Table inexistante
            setError('Erreur: La table de messages n\'existe pas dans la base de données')
            break
          case '42501': // Problème de permission
            setError('Erreur: Permissions insuffisantes pour envoyer le message')
            break
          case '23502': // Violation de contrainte NOT NULL
            setError('Erreur: Des champs obligatoires sont manquants')
            break
          case '23505': // Violation de contrainte d'unicité
            setError('Erreur: Ce message semble être un doublon')
            break
          default:
            setError(`Erreur (${error.code}): ${error.message || 'Une erreur est survenue lors de l\'envoi du message'}`)
        }
      } else {
        setError(`Erreur: ${error.message || 'Une erreur est survenue lors de l\'envoi du message'}`)
      }
    }
  }

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

  // Validation de l'étape actuelle
  const validateCurrentStep = () => {
    switch (formStep) {
      case 0: // Étape 1: Nom et Email
        return formData.name.trim() !== '' && formData.email.trim() !== ''
      case 1: // Étape 2: Sujet
        return formData.subject !== ''
      case 2: // Étape 3: Plan (si site web) ou Message
        if (formData.subject === 'site-web') {
          return formData.plan !== ''
        }
        return true
      case 3: // Étape 4: Message
        return formData.message.trim() !== ''
      default:
        return false
    }
  }

  return (
    <section className="contact-section">
      <div className="stars-container">
        {stars.map(star => (
          <div 
            key={star.id} 
            className="star" 
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>
      
      <div className="contact-container">
        <h2 className="contact-title">Contactez-moi</h2>
        
        <div className="form-progress">
          {[0, 1, 2, 3].map(step => (
            <div 
              key={step} 
              className={`progress-step ${formStep >= step ? 'active' : ''} ${formStep === step ? 'current' : ''}`}
              onClick={() => formStep > step && setFormStep(step)}
            >
              {step + 1}
            </div>
          ))}
        </div>

        <form className={`contact-form ${isAnimating ? 'animating' : ''}`} onSubmit={handleSubmit}>
          {/* Étape 1: Informations personnelles */}
          {formStep === 0 && (
            <div className="form-step">
              <h3 className="step-title">Vos informations</h3>
              
              <div className={`floating-input ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required 
                />
                <label htmlFor="name">Votre nom</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className={`floating-input ${focusedField === 'email' || formData.email ? 'focused' : ''}`}>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required 
                />
                <label htmlFor="email">Votre email</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className={`floating-input ${focusedField === 'phone' || formData.phone ? 'focused' : ''}`}>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                />
                <label htmlFor="phone">Votre téléphone (optionnel)</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-navigation">
                <button 
                  type="button" 
                  className="form-button next-button" 
                  onClick={nextStep}
                  disabled={!validateCurrentStep()}
                >
                  Suivant <span className="button-icon">→</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Étape 2: Sujet */}
          {formStep === 1 && (
            <div className="form-step">
              <h3 className="step-title">Votre demande</h3>
              
              <div className="subject-options">
                {subjectOptions.map(option => (
                  <div 
                    key={option.value} 
                    className={`subject-option ${formData.subject === option.value ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, subject: option.value})}
                  >
                    <div className="option-icon">
                      {option.value === 'site-web' && '💻'}
                      {option.value === 'maintenance' && '🔧'}
                      {option.value === 'conseil' && '💬'}
                      {option.value === 'autre' && '❓'}
                    </div>
                    <div className="option-label">{option.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="form-navigation">
                <button type="button" className="form-button prev-button" onClick={prevStep}>
                  <span className="button-icon">←</span> Précédent
                </button>
                <button 
                  type="button" 
                  className="form-button next-button" 
                  onClick={nextStep}
                  disabled={!validateCurrentStep()}
                >
                  Suivant <span className="button-icon">→</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Étape 3: Formule (si site web) */}
          {formStep === 2 && (
            <div className="form-step">
              {formData.subject === 'site-web' ? (
                <>
                  <h3 className="step-title">Formule souhaitée</h3>
                  
                  <div className="plan-options">
                    {planOptions.map(option => (
                      <div 
                        key={option.value} 
                        className={`plan-option ${formData.plan === option.value ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, plan: option.value})}
                      >
                        <div className="option-icon">
                          {option.value === 'essentiel' && '💻'}
                          {option.value === 'business' && '🚀'}
                          {option.value === 'premium' && '💾'}
                          {option.value === 'unsure' && '🤔'}
                        </div>
                        <div className="option-label">{option.label}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h3 className="step-title">Continuons</h3>
              )}
              
              <div className="form-navigation">
                <button type="button" className="form-button prev-button" onClick={prevStep}>
                  <span className="button-icon">←</span> Précédent
                </button>
                <button 
                  type="button" 
                  className="form-button next-button" 
                  onClick={nextStep}
                  disabled={!validateCurrentStep()}
                >
                  Suivant <span className="button-icon">→</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Étape 4: Message */}
          {formStep === 3 && (
            <div className="form-step">
              <h3 className="step-title">Votre message</h3>
              
              <div className={`floating-textarea ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                ></textarea>
                <label htmlFor="message">Décrivez votre projet ou votre demande...</label>
                <div className="input-highlight"></div>
              </div>
              
              {error && <p className="error-message">{error}</p>}
              <div className="form-navigation">
                <button type="button" className="form-button prev-button" onClick={prevStep}>
                  <span className="button-icon">←</span> Précédent
                </button>
                <button 
                  type="submit" 
                  className="form-button submit-button"
                  disabled={!validateCurrentStep()}
                >
                  Envoyer <span className="button-icon">✔</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Étape de confirmation */}
          {formStep === 4 && (
            <div className="form-step success-step">
              <div className="success-icon">✔</div>
              <h3 className="success-title">Message envoyé avec succès !</h3>
              <p className="success-message">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
              {error && <p className="error-message">{error}</p>}
              <button 
                type="button" 
                className="form-button reset-button"
                onClick={() => {
                  setFormStep(0)
                  setSuccess(false)
                }}
              >
                Nouveau message
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
