document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialise Wave Heading split spans
  initWaveHeadings();

  // 2. Initialise Stats Counters count-up animations
  initStatsCounters();

  // 3. Initialise Scroll Reveal observer
  initScrollReveals();

  // 4. Initialise Hero Carousel
  initHeroCarousel();

  // 5. Initialise Megamenu dropdown interactions
  initMegamenu();
});

function initWaveHeadings() {
  document.querySelectorAll('.wave-heading').forEach((heading) => {
    // Preserve raw text inside a cache attribute
    let rawText = heading.getAttribute('data-raw-text');
    if (!rawText) {
      rawText = heading.innerHTML.trim();
      heading.setAttribute('data-raw-text', rawText);
    }
    
    // Set aria-label to clean text
    const cleanText = heading.textContent.trim();
    heading.setAttribute('aria-label', cleanText);
    heading.setAttribute('role', 'text');
    
    // Create wrapper for visual spans
    const animWrapper = document.createElement('span');
    animWrapper.setAttribute('aria-hidden', 'true');
    
    let waveIndex = 0;
    
    // Parse nodes to split text while preserving <strong> or <span> tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawText;
    
    Array.from(tempDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split('').forEach((char) => {
          const span = document.createElement('span');
          span.className = 'inline-block';
          if (char === ' ') {
            span.innerHTML = '&nbsp;';
          } else {
            span.textContent = char;
            span.style.animationDelay = `${waveIndex * 0.035}s`;
            span.className += ' animate-letter-wave';
            waveIndex++;
          }
          animWrapper.appendChild(span);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const wrapperSpan = document.createElement('span');
        if (node.tagName === 'STRONG' || node.classList.contains('accent') || node.tagName === 'SPAN') {
          wrapperSpan.className = 'text-[#F59E0B]';
        }
        
        node.textContent.split('').forEach((char) => {
          const span = document.createElement('span');
          span.className = 'inline-block';
          if (char === ' ') {
            span.innerHTML = '&nbsp;';
          } else {
            span.textContent = char;
            span.style.animationDelay = `${waveIndex * 0.035}s`;
            span.className += ' animate-letter-wave';
            waveIndex++;
          }
          wrapperSpan.appendChild(span);
        });
        animWrapper.appendChild(wrapperSpan);
      }
    });
    
    heading.innerHTML = '';
    heading.appendChild(animWrapper);
  });
}

function initStatsCounters() {
  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();
    
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing quadratic
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);
      el.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-value').forEach((el) => {
    observer.observe(el);
  });
}

function initScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.scroll-reveal-section, .scroll-reveal-card').forEach((el) => {
    observer.observe(el);
  });
}

function initHeroCarousel() {
  const carousel = document.querySelector('.hero-carousel-section');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-bg-slide');
  const contentSlides = carousel.querySelectorAll('.carousel-content-slide');
  const countDisplay = carousel.querySelector('.carousel-counter-display');
  const playPauseBtn = carousel.querySelector('.carousel-play-pause-btn');
  const prevBtn = carousel.querySelector('.carousel-prev-btn');
  const nextBtn = carousel.querySelector('.carousel-next-btn');

  let currentSlide = 0;
  let isPlaying = true;
  let timer = null;

  function showSlide(index) {
    // Hide current slides
    slides[currentSlide].classList.remove('opacity-100');
    slides[currentSlide].classList.add('opacity-0', 'pointer-events-none');
    
    contentSlides[currentSlide].classList.remove('flex');
    contentSlides[currentSlide].classList.add('hidden');

    const prevVideo = slides[currentSlide].querySelector('video');
    if (prevVideo) prevVideo.pause();

    // Set new index
    currentSlide = index;

    // Show new slides
    slides[currentSlide].classList.remove('opacity-0', 'pointer-events-none');
    slides[currentSlide].classList.add('opacity-100');
    
    contentSlides[currentSlide].classList.remove('hidden');
    contentSlides[currentSlide].classList.add('flex');

    const nextVideo = slides[currentSlide].querySelector('video');
    if (nextVideo && isPlaying) {
      nextVideo.play().catch(err => console.log(err));
    }

    // Refresh Heading Splitting Spans for active slide so animations re-trigger!
    const activeHeading = contentSlides[currentSlide].querySelector('.wave-heading');
    if (activeHeading) {
      initWaveHeadingsElement(activeHeading);
    }

    // Update Counter Display
    if (countDisplay) {
      countDisplay.textContent = `0${currentSlide + 1} / 0${slides.length}`;
    }
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function startAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  // Handle Play/Pause toggling
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      const activeVideo = slides[currentSlide].querySelector('video');
      
      if (isPlaying) {
        playPauseBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/></svg>';
        if (activeVideo) activeVideo.play().catch(err => console.log(err));
        startAutoplay();
      } else {
        playPauseBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>';
        if (activeVideo) activeVideo.pause();
        stopAutoplay();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
      if (isPlaying) startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      if (isPlaying) startAutoplay();
    });
  }

  function initWaveHeadingsElement(heading) {
    const rawText = heading.getAttribute('data-raw-text');
    if (rawText) {
      heading.innerHTML = rawText;
    }
    initWaveHeadings();
  }

  startAutoplay();
  
  const firstVideo = slides[0].querySelector('video');
  if (firstVideo) {
    firstVideo.play().catch(err => console.log(err));
  }
}

function initMegamenu() {
  const trigger = document.querySelector('.mega-menu-trigger');
  const panel = document.querySelector('.mega-menu-panel');
  if (!trigger || !panel) return;
  
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    panel.classList.toggle('active');
  });
}
