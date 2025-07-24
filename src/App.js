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
        // Add a small delay to ensure DOM is ready
        setTimeout(() => scrollToSection(hash), 100);
      }
    };

    // Handle initial load with hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (sectionId) => {
    // Try to find the actual element first
      // Fallback to calculated positions if element not found
      let targetScrollY = 0;
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      
      // Adjust section calculations for mobile vs desktop
      const sectionHeight = isMobile ? viewportHeight : viewportHeight;
      
      switch (sectionId) {
        case 'home':
          targetScrollY = 0;
          break;
        case 'birds':
          targetScrollY = viewportHeight;
          break;
        case 'carnations-roses':
          targetScrollY = viewportHeight + sectionHeight;
          break;
        case 'hearts':
          targetScrollY = viewportHeight + (sectionHeight * 2);
          break;
        case 'pomegranates':
          targetScrollY = viewportHeight + (sectionHeight * 3);
          break;
        case 'vines':
          targetScrollY = viewportHeight + (sectionHeight * 4);
          break;
        case 'contact':
          // For contact, scroll to the footer which is after all content sections
          targetScrollY = viewportHeight + (sectionHeight * 5);
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
    const triggerEnd = sectionCenter - 500;
    
    // Only animate when user is near this specific section
    const progress = Math.max(0, Math.min(1, (scrollY - triggerStart) / (triggerEnd - triggerStart)));
    const isFromLeft = index % 2 === 0;
    
    // Disable horizontal animation on mobile, use vertical instead
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const translateY = -50 + (progress * 50);
      return {
        transform: `translateY(${translateY}px)`,
        opacity: progress,
        transition: 'none'
      };
    }
    
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
    
    // Disable horizontal animation on mobile, use vertical instead
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const translateY = 50 + (progress * -50);
      return {
        transform: `translateY(${translateY}px)`,
        opacity: progress,
        transition: 'none'
      };
    }
    
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
      id: 'birds',
      title: "Birds",
      description: "Birds are a prominent element in Castelo Branco Embroidery, perched amid the intricate foliage of the Tree of Life. They bring color and movement to the compositions and often reflect exotic or familiar species, perhaps inspired by domesticated poultry or local birds. The two-headed bird, particularly the double-headed eagle, carries heraldic and spiritual symbolism, referencing imperial authority and resurrection.",
      image: "/tree/bird.png"
    },
    {
      id: 'carnations-roses',
      title: "Carnations and Roses",
      description: "The carnation is a central motif in the embroidery, typically shown front-facing or in profile, with jagged petals. Symbolizing provocation, strength, and virility, it stands out as a resilient and erect flower. Although roses are not explicitly mentioned in the text, carnations serve a similar expressive and symbolic function within this tradition.",
      image: "/tree/flower.png"
    },
    {
      id: 'hearts',
      title: "Hearts",
      description: "The heart motif is deeply embedded in both religious and secular symbolism. In the embroidery, hearts appear on the chests of double-headed eagles or harmoniously integrated with other motifs. Traditionally, they represent love-secular and divine-charity, friendship, and moral integrity, bridging personal sentiment with cultural and spiritual meaning.",
      image: "/tree/heart.png"
    },
    {
      id: 'pomegranates',
      title: "Pomegranates",
      description: "Pomegranates, richly detailed in the embroidery, symbolize love and the promise of abundant life. Their presence aligns with the broader fertility themes in Castelo Branco Embroidery and reflects the symbolic richness of fruit in the tradition.",
      image: "/tree/pomagranates.png"
    },
    {
      id: 'vines',
      title: "Vines",
      description: "Although vines are not mentioned directly, the embroidery frequently includes undulating branches covered in foliage—elements visually and thematically akin to vines. These motifs enhance the organic flow of the composition and reinforce the themes of growth, vitality, and interconnected life.",
      image: "/tree/vines.png"
    }
  ];

  return (
    <div className="relative">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/irl-tree.jpeg')`,
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
            {/* Navigation menu can be added here */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-white min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Discover the
              <span className="text-green-600 block">Tree of Life</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              In Castelo Branco Embroidery, the Tree of Life symbolizes survival, renewal, eternity, and resurrection. When flanked by a man and a woman, it represents the continuity of life; when paired with a peacock, it takes on spiritual symbolism, evoking eternal life and resurrection. Artistically, it is depicted with a central, asymmetrical structure emerging from mounded branches teeming with foliage, flowers, fruits, and birds. This theme, often enriched with exotic and local motifs, reveals the embroiderers' creativity and imaginative interpretation of natural forms.
            </p>
          </div>
          <div className="relative justify-self-center lg:justify-self-end">
            <img 
              src="/tree/tree.png"
              alt="Tree of Life - Castelo Branco"
              className="rounded-2xl shadow-2xl w-full max-w-sm lg:w-94 h-64 sm:h-80 lg:h-[32rem] object-cover"
            />
            <div className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-12 -right-4 sm:-right-8 lg:-right-14 bg-green-600 text-white p-2 sm:p-3 lg:p-4 rounded-lg shadow-lg">
              <p className="font-semibold text-sm sm:text-base">Tree of Life</p>
              <p className="text-xs sm:text-sm opacity-90">Embroidery</p>
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
            <section key={content.id} id={content.id} className="py-12 sm:py-16 lg:py-20 min-h-screen flex items-center relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                
                {/* Mobile Layout */}
                <div className="block md:hidden">
                  <div 
                    style={contentStyle}
                    className="relative w-full bg-white rounded-2xl shadow-2xl mb-6"
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {content.title}
                      </h2>
                      <p className="text-base text-gray-600 leading-relaxed mb-4">
                        {content.description}
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    style={imageStyle}
                    className="w-full max-w-sm mx-auto"
                  >
                    <img 
                      src={content.image}
                      alt={content.title}
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                  {/* Content Rectangle */}
                  <div 
                    style={contentStyle}
                    className={`relative w-3/5 bg-white rounded-2xl shadow-2xl z-20 ${
                      isFromLeft 
                        ? 'ml-5 mr-auto' // Left side positioning
                        : 'ml-auto mr-5' // Right side positioning  
                    }`}
                  >
                    <div className={`p-6 lg:p-8 ${isFromLeft ? 'pr-60 lg:pr-80' : 'pl-60 lg:pl-80'}`}>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                        {content.title}
                      </h2>
                      <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                        {content.description}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div 
                    style={imageStyle}
                    className={`absolute top-1/2 transform -translate-y-1/2 w-64 lg:w-80 h-64 lg:h-80 z-30 ${
                      isFromLeft 
                        ? 'right-10 lg:right-20' // Image on right when content is from left
                        : 'left-10 lg:left-20'  // Image on left when content is from right
                    }`}
                  >
                    <img 
                      src={content.image}
                      alt={content.title}
                      className="rounded-2xl shadow-2xl w-full h-full object-cover"
                    />
                  </div>
                </div>
                
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer */}
      <footer id="contact" className="relative z-10 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Tree of Life Experience</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Discover the sacred Tree of Life and its 800-year legacy in Castelo Branco.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 lg:mb-4 text-sm lg:text-base">Quick Links</h4>
              <ul className="space-y-1 lg:space-y-2 text-sm lg:text-base text-gray-600">
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Attractions</a></li>
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Events</a></li>
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Accommodations</a></li>
                <li><a href="google.com" className="hover:text-green-600 transition-colors">Restaurants</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 lg:mb-4 text-sm lg:text-base">Contact Info</h4>
              <div className="space-y-1 lg:space-y-2 text-sm lg:text-base text-gray-600">
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