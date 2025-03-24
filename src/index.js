import { render } from 'react-dom'
import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useProgress, Html } from '@react-three/drei'
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'

import Scene1 from './Scene1'
import Scene2 from './Scene2'
import Scene3 from './Scene3'
import Projects from './Projects'
import Pricing from './Pricing'
import Contact from './Contact'
import Footer from './Footer'

import "./base.css"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

function App(props) {
  const { scene = 1 } = props
  return (
    <Canvas concurrent shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={['#000']} />
      <Suspense fallback={<Loader />}>
        {scene === 1 && <Scene1 />}
        {scene === 2 && <Scene2 />}
        {scene === 3 && <Scene3 />}
      </Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  )
}

function Body() {
  return (
    <>
      <title>Portfolio - Quentin OTT | Développeur Web & Designer</title>
      <meta name="description" content="Portfolio de Quentin OTT, développeur et designer web spécialisé dans la création de sites web modernes, responsives et optimisés pour le référencement." />
      <meta name="keywords" content="Quentin OTT, développeur web, web design, création site internet, développement web, portfolio, site web professionnel, intégration web, responsive design, UX/UI design, Three.js, React, freelance, site vitrine, e-commerce, SEO" />
      <meta name="author" content="Quentin OTT" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Portfolio - Quentin OTT | Développeur Web & Designer" />
      <meta property="og:description" content="Découvrez mes projets de développement web et web design. Création de sites web sur mesure, intégration, responsive design et optimisation SEO." />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <Router>
      <main>
        <div className="frame">
            <a href='https://adminportfolio-t04x.onrender.com' target="_blank">ADMIN</a>
          <div className="frame__links">
            <NavLink to="/accueil" activeClassName="frame__demo--current" className="frame__demo">
              ACCUEIL
            </NavLink>
            <NavLink to="/emmeraude" activeClassName="frame__demo--current" className="frame__demo">
              EMMERAUDE
            </NavLink>
            <NavLink to="/cube" activeClassName="frame__demo--current" className="frame__demo">
              CUBE
            </NavLink>
            <a href="https://github.com/QuentinOTT">GitHub</a>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/accueil" />
            </Route>
            <Route exact path="/accueil">
              <App scene={1} />
            </Route>
            <Route exact path="/emmeraude">
              <App scene={2} />
            </Route>
            <Route exact path="/cube">
              <App scene={3} />
            </Route>
          </Switch>
        </div>
        {/* Projects section added below the main content */}
        <Projects />
        {/* Pricing section added below the projects section */}
        <Pricing />
        {/* Contact section added below the pricing section */}
        <Contact />
        {/* Footer added below the contact section */}
        <Footer />
      </main>
    </Router>
    </>
  )
}

render(<Body />, document.querySelector('#root'))
