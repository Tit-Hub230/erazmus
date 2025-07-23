import React, { useState, useEffect } from 'react';

const CasteloBrancoTourism = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    // Handle initial load with hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (sectionId) => {
    let targetScrollY = 0;
    
    switch (sectionId) {
      case 'home':
        targetScrollY = 0;
        break;
      case 'ancient-roots':
        targetScrollY = window.innerHeight + (window.innerHeight * 0);
        break;
      case 'sacred-symbolism':
        targetScrollY = window.innerHeight + (window.innerHeight * 1);
        break;
      case 'seasonal-beauty':
        targetScrollY = window.innerHeight + (window.innerHeight * 2);
        break;
      case 'cultural-heritage':
        targetScrollY = window.innerHeight + (window.innerHeight * 3);
        break;
      case 'visitor-experience':
        targetScrollY = window.innerHeight + (window.innerHeight * 4);
        break;
      case 'contact':
        targetScrollY = window.innerHeight + (window.innerHeight * 5);
        break;
      default:
        return;
    }
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const getContentTransform = (index) => {
    const sectionHeight = window.innerHeight;
    const sectionTop = sectionHeight + (index * sectionHeight); // Each section starts after the hero
    const sectionCenter = sectionTop + (sectionHeight / 2);
    const triggerStart = sectionCenter - 2000;
    const triggerEnd = sectionCenter -500;
    
    // Only animate when user is near this specific section
    const progress = Math.max(0, Math.min(1, (scrollY - triggerStart) / (triggerEnd - triggerStart)));
    const isFromLeft = index % 2 === 0;
    
    // Start completely off-screen and slide to final position slowly
    const startX = isFromLeft ? -1000 : 1000;
    const endX = 0;
    const translateX = startX + (progress * (endX - startX));
    const opacity = progress;
    
    return {
      transform: `translateX(${translateX}px)`,
      opacity: opacity,
      transition: 'none' // Pure scroll-based animation
    };
  };

  const getImageTransform = (index) => {
    const sectionHeight = window.innerHeight;
    const sectionTop = sectionHeight + (index * sectionHeight); // Each section starts after the hero
    const sectionCenter = sectionTop + (sectionHeight / 2);
    const triggerStart = sectionCenter - 2000;
    const triggerEnd = sectionCenter - 500;
    
    // Only animate when user is near this specific section
    const progress = Math.max(0, Math.min(1, (scrollY - triggerStart) / (triggerEnd - triggerStart)));
    const isFromRight = index % 2 === 0; // Opposite of content
    
    // Start completely off-screen and slide to final position slowly
    const startX = isFromRight ? 1000 : -1000;
    const endX = 0;
    const translateX = startX + (progress * (endX - startX));
    const opacity = progress;
    
    return {
      transform: `translateX(${translateX}px)`,
      opacity: opacity,
      transition: 'none' // Pure scroll-based animation
    };
  };

  const treeOfLifeContent = [
    {
      id: 'ancient-roots',
      title: "Ancient Roots",
      description: "Discover the mystical Tree of Life, an ancient olive tree that has stood for over 800 years in the heart of Castelo Branco. This magnificent specimen represents the eternal connection between earth and sky, serving as a living monument to the region's rich agricultural heritage and spiritual significance.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
    },
    {
      id: 'sacred-symbolism',
      title: "Sacred Symbolism",
      description: "The Tree of Life holds deep meaning for locals and visitors alike, symbolizing growth, strength, and renewal. Legend says that those who touch its ancient bark while making a wish will find their dreams fulfilled. The tree's massive canopy provides shelter and inspiration to all who gather beneath it.",
      image: "https://images.unsplash.com/photo-1574263867128-ae32eaa8b262?w=600&h=400&fit=crop"
    },
    {
      id: 'seasonal-beauty',
      title: "Seasonal Beauty",
      description: "Throughout the year, the Tree of Life transforms with the seasons, offering visitors a different experience each time they visit. In spring, delicate blossoms crown its branches, while autumn brings a spectacular display of golden leaves that shimmer in the Portuguese sunlight.",
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop"
    },
    {
      id: 'cultural-heritage',
      title: "Cultural Heritage",
      description: "The tree has witnessed centuries of Portuguese history, from medieval times to the present day. Local festivals and ceremonies often take place in its shadow, and it serves as a meeting point for the community, embodying the timeless spirit of Castelo Branco's people.",
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop"
    },
    {
      id: 'visitor-experience',
      title: "Visitor Experience",
      description: "Come experience the Tree of Life for yourself - walk the peaceful paths that lead to this natural wonder, enjoy guided tours that reveal its secrets, and participate in traditional ceremonies held throughout the year. Photography enthusiasts will find endless inspiration in its majestic presence.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="relative">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&h=1080&fit=crop')`,
          zIndex: -2
        }}
      />
      
      {/* Green Overlay */}
      <div 
        className="fixed inset-0 bg-green-600 opacity-60"
        style={{ zIndex: -1 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Castelo Branco</h1>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
              <a href="#ancient-roots" className="text-gray-700 hover:text-green-600 transition-colors">Ancient Roots</a>
              <a href="#sacred-symbolism" className="text-gray-700 hover:text-green-600 transition-colors">Sacred Symbolism</a>
              <a href="#seasonal-beauty" className="text-gray-700 hover:text-green-600 transition-colors">Seasonal Beauty</a>
              <a href="#cultural-heritage" className="text-gray-700 hover:text-green-600 transition-colors">Cultural Heritage</a>
              <a href="#visitor-experience" className="text-gray-700 hover:text-green-600 transition-colors">Visitor Experience</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-white min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Discover the Sacred
              <span className="text-green-600 block">Tree of Life</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience the mystical power of Castelo Branco's most revered natural monument. This ancient olive tree, standing for over 800 years, represents the eternal connection between earth and sky, offering visitors a profound spiritual and cultural journey.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
              Start Your Journey
            </button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1574263867128-ae32eaa8b262?w=800&h=600&fit=crop"
              alt="Tree of Life - Castelo Branco"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg">
              <p className="font-semibold">800+ Years Old</p>
              <p className="text-sm opacity-90">Sacred Monument</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Content Sections */}
      <div className="relative z-10">
        {treeOfLifeContent.map((content, index) => {
          const isFromLeft = index % 2 === 0;
          const contentStyle = getContentTransform(index);
          const imageStyle = getImageTransform(index);
          
          return (
            <section key={index} id={content.id} className="py-20 min-h-screen flex items-center relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 w-full relative">
                
                {/* Content Rectangle */}
                <div 
                  style={contentStyle}
                  className={`relative w-3/5 bg-white rounded-2xl shadow-2xl z-20 ${
                    isFromLeft 
                      ? 'ml-5 mr-auto' // Left side positioning
                      : 'ml-auto mr-5' // Right side positioning  
                  }`}
                >
                  <div className={`p-8 ${isFromLeft ? 'pr-80' : 'pl-80'}`}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {content.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {content.description}
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div 
                  style={imageStyle}
                  className={`absolute top-1/2 transform -translate-y-1/2 w-80 h-80 z-30 ${
                    isFromLeft 
                      ? 'right-20' // Image on right when content is from left
                      : 'left-20'  // Image on left when content is from right
                  }`}
                >
                  <img 
                    src={content.image}
                    alt={content.title}
                    className="rounded-2xl shadow-2xl w-full h-full object-cover"
                  />
                </div>
                
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer */}
      <footer id="contact" className="relative z-10 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tree of Life Experience</h3>
              <p className="text-gray-600">
                Discover the sacred Tree of Life and its 800-year legacy in Castelo Branco.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Attractions</a></li>
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Events</a></li>
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Accommodations</a></li>
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Restaurants</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-600">
                <p>📍 Castelo Branco, Portugal</p>
                <p>📞 +351 272 330 339</p>
                <p>✉️ info@visit-castelobranco.pt</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CasteloBrancoTourism;