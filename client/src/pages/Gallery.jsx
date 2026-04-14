import { useState, useEffect } from 'react';

const galleryData = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Hack the Flame 2024",
    category: "hackathon",
    description: "Our annual hackathon where students build innovative solutions"
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Web Development Workshop",
    category: "workshop",
    description: "Students learning modern web development techniques"
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Team Building Session",
    category: "meetup",
    description: "Team members collaborating on new ideas"
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Inferno Fest Stage",
    category: "fest",
    description: "Main stage at our annual tech and cultural festival"
  },
  {
    src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "AI & ML Workshop",
    category: "workshop",
    description: "Hands-on session on artificial intelligence and machine learning"
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Coding Competition",
    category: "hackathon",
    description: "Students competing in our coding challenge"
  },
  {
    src: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Inferno Fest Crowd",
    category: "fest",
    description: "Participants enjoying our annual festival"
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-0a740d43b90c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Group Learning Session",
    category: "workshop",
    description: "Students collaborating and learning together"
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    title: "Project Discussion",
    category: "meetup",
    description: "Team members discussing project ideas and strategies"
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  const filteredData = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.gallery-item', { delay: 200, interval: 100 });
    }
  }, [filter]);

  const openLightbox = (index) => {
    setLightbox({ isOpen: true, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    let newIndex = lightbox.index + direction;
    if (newIndex < 0) newIndex = filteredData.length - 1;
    if (newIndex >= filteredData.length) newIndex = 0;
    setLightbox({ ...lightbox, index: newIndex });
  };

  return (
    <section className="gallery-container">
      <div className="section-header">
        <h2>Our <span>Gallery</span></h2>
        <div className="underline"></div><br /><br />
        <p>A glimpse into our events and activities which we did recently and it was our best experience to organized </p>
      </div>
      
      <div className="gallery-filters">
        {['all', 'hackathon', 'workshop', 'fest', 'meetup'].map(f => (
          <button 
            key={f} 
            className={`filter-btn ${filter === f ? 'active' : ''}`} 
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="gallery-grid">
        {filteredData.map((item, idx) => (
          <div key={idx} className="gallery-item" onClick={() => openLightbox(idx)}>
            <img src={item.src} alt={item.title} className="gallery-image" />
            <div className="gallery-overlay">
              <h3 className="gallery-title">{item.title}</h3>
              <p className="gallery-category">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox.isOpen && (
        <div className="lightbox" style={{ display: 'flex' }} onClick={(e) => e.target.className === 'lightbox' && closeLightbox()}>
          <div className="lightbox-content">
            <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
            <img className="lightbox-img" src={filteredData[lightbox.index].src} alt="" />
            <div className="lightbox-caption">{filteredData[lightbox.index].description}</div>
            <div className="lightbox-nav">
              <div className="lightbox-prev" onClick={() => navigateLightbox(-1)}>&#10094;</div>
              <div className="lightbox-next" onClick={() => navigateLightbox(1)}>&#10095;</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
