import React, { useState, useEffect } from 'react'
import './Projects.css'

function Projects() {
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

  // Sample project data - you can modify this with your own projects
  const projects = [
    {
      id: 1,
      title: 'Plaisir Permis',
      description: 'site web moderne pour une auto-école, offrant une gestion complète des élèves et des demandes de contacts. Interface intuitive avec système de réservation en ligne et suivi des progrès.',
      image: '/images/plaisir-permis.png',
      technologies: ['Three.js', 'HTML', 'CSS', 'JavaScript'],
      link: 'https://plaisirpermis.fr'
    },
    {
      id: 2,
      title: 'Indian Palace 78',
      description: 'Site web moderne pour un restaurant Indien, offrant une gestion complète des plats et des commandes. Interface intuitive avec système de panier.',
      image: '/images/indianpalace78.png',
      technologies: ['HTML', 'MySQL', 'JavaScript', 'CSS'],
      link: 'https://indianpalace78.fr'
    },
    {
      id: 3,
      title: 'Bruleurs de gommes',
      description: 'Projet scolaire de vente de voiture, création d événements avec page administateurs',
      image: '/images/BDG.png',
      technologies: ['PHP', 'Symfony', 'HTML', 'CSS', 'JavaScript'],
      nolink: '#'
    },
    {
      id: 4,
      title: 'Escadron de l armée de l air',
      description: 'Création d un site vitrine pour un escadron de l armée de l air qui est en veille.',
      image: '/images/avion.png',
      technologies: ['React Native', 'html', 'javascript'],
      creationlink: true
    },
    {
      id: 5,
      title: 'Portfolio',
      description: "Portfolio moderne pour une élève d architecture d interieur et de design.",
      image: '/images/angelica-portfolio.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: '#'
    },
    {
      id: 6,
      title: 'Site vitrine paysagiste',
      description: "Site vitrine élégant pour un paysagiste, mettant en valeur ses réalisations avec une galerie photo interactive. Design moderne et responsive avec animations fluides.",
      image: '/images/hugo-paysagiste.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: '#'
    }
  ]

  return (
    <section className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Mes Projets</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link ? (
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      Voir le projet
                    </a>
                  ) : project.creationlink ? (
                    <button className="project-link" disabled>
                      En cours de publication
                    </button>
                  ) : (
                    <button className="project-link" disabled>
                      Projet en local (disponible sous demandes)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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

export default Projects
