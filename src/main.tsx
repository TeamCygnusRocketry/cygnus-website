import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './assets.css';
import './site.css';
import './overrides.css';
import './team.css';

const nav = [
  ['ABOUT', 'about'],
  ['ACHIEVEMENTS', 'achievements'],
  ['PROJECTS', 'projects'],
  ['SUBSYSTEMS', 'subsystems'],
  ['GALLERY', 'gallery'],
  ['SPONSORS', 'sponsors'],
  ['CONTACT', 'contact'],
] as const;

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

const subsystems = [
  ['01', 'STRUCTURES', 'Airframe design, integration and flight-ready fabrication.'],
  ['02', 'AVIONICS', 'Onboard electronics, sensors and data systems.'],
  ['03', 'PAYLOAD', 'Mission-driven experiments and instrument integration.'],
  ['04', 'RECOVERY', 'Safe return systems and post-flight recovery planning.'],
  ['05', 'PROPULSION', 'Propulsion research, testing and performance work.'],
  ['06', 'OPERATIONS', 'Documentation, logistics, outreach and launch readiness.'],
];

const gallery = [
  ['Rocket exploded view', asset('rocket/rocket-exploded-cad.png')],
  ['Rocket nose cone', asset('rocket/nose-cone-cad.png')],
  ['Rocket fin assembly', asset('rocket/fin-assembly-cad.png')],
  ['CanSat radial mount', asset('cansat/radial-deployment-cad.png')],
  ['CanSat assembly', asset('cansat/cansat-assembly-cad.png')],
  ['CanSat structural shell', asset('cansat/structural-shell-cad.png')],
] as const;

function Mark() {
  return <div className="mark" aria-label="Team Cygnus mark placeholder"><i /><i /><i /></div>;
}
function Logo({ className = '' }: { className?: string }) {
  return <img className={`cygnus-logo ${className}`} src={asset('branding/cygnus-wordmark.png')} alt="Cygnus" />;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="nav site-nav">
    <a href="#top" className="brand"><Logo /></a>
    <nav className={open ? 'open' : ''} aria-label="Primary navigation">
      {nav.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><span /><span /></button>
  </header>;
}

function RecoveryScrollIndicator() {
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  useEffect(() => {
    let lastY = window.scrollY;
    const updateProgress = () => {
      const currentY = window.scrollY;
      const nextDirection = currentY < lastY ? 'up' : 'down';
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      const arc = Math.sin(Math.PI * progress);
      const tilt = -28 + progress * 56;
      document.documentElement.style.setProperty('--page-scroll', String(progress));
      document.documentElement.style.setProperty('--recovery-y', `${86 + progress * (window.innerHeight - 86 - 160)}px`);
      document.documentElement.style.setProperty('--flight-x', `${-10 + progress * 116}vw`);
      document.documentElement.style.setProperty('--flight-y', `${74 - arc * 47}vh`);
      document.documentElement.style.setProperty('--flight-angle', `${tilt}deg`);
      if (Math.abs(currentY - lastY) > 1) setDirection(nextDirection);
      lastY = currentY;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);
  return <><div className="trajectory-rocket" aria-hidden="true"><img src={asset('rocket/trajectory-cartoon.png')} alt="" /></div><div className="recovery-scroll" aria-hidden="true">{direction === 'up' ? <img className="scroll-launch" src={asset('rocket/launch-scroll-indicator.png')} alt="" /> : <img className="scroll-parachute" src={asset('rocket/parachute-recovery.png')} alt="" />}</div></>;
}

function Hero() {
  return <section className="team-hero" id="top">
    <div className="hero-galaxy" aria-hidden="true"><i /><i /><i /></div>
    <div className="hero-wordmark"><h1>TEAM<br /><em>CYGNUS</em></h1></div>
  </section>;
}

function About() {
  return <section className="about-section" id="about">
    <div className="section-title"><p>01 / ABOUT THE TEAM</p><h2>ENGINEERING<br />TO <em>LEARN.</em></h2></div>
    <div className="about-intro"><p>Team Cygnus is a student aerospace engineering team. We build practical knowledge by working together on rockets, CanSats and the systems that support flight.</p><p>Our work moves through the full engineering loop: research, design, fabrication, testing, review and iteration.</p></div>
    <h3 className="team-photo-heading">THE TEAM</h3><figure className="team-photo"><img src={asset('team/team-members.png')} alt="Team Cygnus members" /></figure>
  </section>;
}

function Achievements() {
  return <section className="achievements-section" id="achievements">
    <div className="section-title"><p>02 / ACHIEVEMENTS</p><h2><em>ACHIEVEMENTS.</em></h2></div>
    <div className="achievement-track" aria-label="Team Cygnus achievements">
      <article className="achievement-panel"><img src={asset('achievements/cygnus-award-team.png')} alt="Team Cygnus holding awards and its team flag" /><div><span>01 / TECHNOXIAN 2025</span><h3>1ST RUNNERS-UP</h3><p>WATER ROCKETRY</p></div></article>
      <article className="achievement-panel achievement-placeholder-panel"><div><span>02 / NEXT ACHIEVEMENT</span><h3>TO BE<br />ANNOUNCED.</h3><p>Add the next competition result, award or milestone here.</p></div></article>
    </div>
  </section>;
}

const projectMissions = {
  rocketry: [
    { title: 'MISSION AARAMBHA', status: 'IN DEVELOPMENT', image: asset('rocket/rocket-exploded-cad.png'), alt: 'Rocket exploded CAD view' },
    { title: 'THE TRIAD', status: 'RESERVED FOR NEXT VEHICLE', image: asset('rocket/fin-assembly-cad.png'), alt: 'Rocket fin assembly CAD view' },
    { title: 'IN-SPACe', status: 'RESERVED FOR FUTURE MISSION', image: asset('rocket/nose-cone-cad.png'), alt: 'Rocket nose cone CAD view' },
  ],
  satellites: [
    { title: 'INSPACE CAN 7U', status: 'IN DEVELOPMENT', image: asset('cansat/radial-deployment-cad.png'), alt: 'CanSat radial mount CAD view' },
  ],
} as const;

function Projects() {
  const [active, setActive] = useState<'rocketry' | 'satellites'>('rocketry');
  const label = active === 'rocketry' ? 'ROCKETRY' : 'SATELLITES';
  return <section className="projects-section" id="projects">
    <div className="section-title"><p>03 / PROJECTS</p><h2><em>PROJECTS.</em></h2></div>
    <div className="project-tabs" role="tablist" aria-label="Cygnus projects">
      <button className={active === 'rocketry' ? 'active' : ''} onClick={() => setActive('rocketry')} role="tab" aria-selected={active === 'rocketry'}>01 / ROCKETRY</button>
      <button className={active === 'satellites' ? 'active' : ''} onClick={() => setActive('satellites')} role="tab" aria-selected={active === 'satellites'}>02 / SATELLITES</button>
    </div>
    <p className="mission-collection-title">{label} / MISSION COLLECTION</p>
    <div className="mission-collection" key={active}>{projectMissions[active].map((mission, index) => <article className="mission-card" key={mission.title}><div className="mission-card-image"><img src={mission.image} alt={mission.alt} /></div><span>0{index + 1} / {mission.status}</span><h3>{mission.title}</h3><a href="#gallery">MISSION DETAILS →</a></article>)}</div>
  </section>;
}

function Subsystems() {
  return <section className="subsystems-section" id="subsystems">
    <div className="section-title"><p>04 / SUBSYSTEMS</p><h2>ONE TEAM.<br /><em>MANY SYSTEMS.</em></h2></div>
    <p className="subsystems-intro">Each discipline contributes to the same outcome: a well-considered system ready to test, document and improve.</p>
    <div className="subsystem-grid">
      {subsystems.map(([num, title, text]) => <article key={title}><span>{num}</span><h3>{title}</h3><p>{text}</p><i>+</i></article>)}
    </div>
  </section>;
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return <section className="gallery-section" id="gallery">
    <div className="section-title"><p>05 / GALLERY</p><h2><em>GALLERY.</em></h2></div>
    <div className="gallery-grid">
      {gallery.map(([label, src], index) => <button className={`gallery-tile tile-${index}`} key={label} onClick={() => setSelected(index)}><img src={src} alt={label} /><span>{label}</span><i>OPEN ↗</i></button>)}
    </div>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[selected][0]} onClick={() => setSelected(null)}><button aria-label="Close gallery image" onClick={() => setSelected(null)}>×</button><img src={gallery[selected][1]} alt={gallery[selected][0]} /><p>{gallery[selected][0]}</p></div>}
  </section>;
}

const sponsors = [
  ['ADVANCED TEAM LEASE CO.', asset('sponsors/advanced-team-lease.png')],
  ['ABDULRAHMAN GHAZAY ALSUBAIE CONT. EST.', asset('sponsors/abdulrahman-ghazay.png')],
  ['VIGYAN BHARATI', asset('sponsors/vigyan-bharati.png')],
  ['SOLIDWORKS', asset('sponsors/solidworks.png')],
  ['ANSYS', asset('sponsors/ansys.png')],
] as const;

function Sponsors() {
  return <section className="sponsors-section" id="sponsors">
    <div className="section-title"><p>06 / SPONSORS</p><h2>FUEL THE<br /><em>MISSION.</em></h2></div>
    <div className="sponsor-layout"><div className="sponsor-intro"><p>Partner with Team Cygnus and help students turn aerospace ambition into practical engineering experience.</p><p>Your support can contribute to materials, testing, fabrication, travel and mission operations.</p><a className="benefits-download" href={asset('sponsors/cygnus-sponsorship-benefits.pdf')} download>DOWNLOAD SPONSORSHIP BENEFITS PDF ↓</a><a className="sponsor-contact" href="mailto:teamcygnusdsce01@gmail.com">BECOME A SPONSOR →</a></div><div className="sponsor-slots">{sponsors.map(([name, logo], index) => <article className="sponsor-card" key={name}><span>0{index + 1} / {name}</span><img src={logo} alt={name} /></article>)}</div></div>
  </section>;
}

function Footer() {
  return <footer className="site-footer" id="contact"><div className="footer-nebula" aria-hidden="true" />
    <p>07 / CONTACT</p><h2>BUILD.<br />TEST.<br /><em>FLY.</em></h2>
    <div className="footer-grid"><div className="footer-team"><Logo className="footer-logo" /></div><div><span>teamcygnusdsce01@gmail.com</span><a href="https://www.instagram.com/cygnusrocketry" target="_blank" rel="noreferrer">INSTAGRAM</a><a href="https://www.linkedin.com/company/cygnus-technical/posts/?feedView=all" target="_blank" rel="noreferrer">LINKEDIN</a></div><span>COLLEGE / TO BE CONFIRMED<br />LOCATION / TO BE CONFIRMED<br /><br />© 2026 TEAM CYGNUS</span></div>
  </footer>;
}

function App() { return <><Navigation /><RecoveryScrollIndicator /><main><Hero /><About /><Achievements /><Projects /><Subsystems /><Gallery /><Sponsors /></main><Footer /></>; }
createRoot(document.getElementById('root')!).render(<App />);
