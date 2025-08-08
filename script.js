document.addEventListener('DOMContentLoaded', function() {
  // Inicializar animaciones
  initHearts();
  initFloatingFlowers();
  initFloatingHearts();
  initTravelCarousels();
  initConfetti();
  initQuotes();
  initMusicPlayer();
  initTypingEffect();
  
  // Efecto al hacer clic en la polaroid
  window.shakePolaroid = function() {
    const polaroid = document.querySelector('.polaroid');
    polaroid.classList.add('shake');
    setTimeout(() => polaroid.classList.remove('shake'), 500);
    triggerConfetti();
  };
  
  // Mostrar mensaje especial con confeti
  window.mostrarMensaje = function() {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = `
      <h3>Querida Estefanía</h3>
      <p>Sé que hemos pasado por mucho este año, muchas aventuras, muchos recuerdos y sobre todo muchos momentos juntos.</p>
      <p>No te quiero perder Estefanía. Perdón por cómo te hice sentir esos días, no era mi intención.</p>
      <p>Dame la oportunidad de demostrarte lo mucho que te quiero y te necesito. Tú me haces un bien.</p>
      <p>Ya hicimos lo más difícil de todo esto que fue encontrarnos entre un millón de gente, ahora hagamos lo más fácil que es quedarnos.</p>
      <p>Te hice esta página porque no dejo de pensar en ti.</p>
      <hr>
      <p>Cada momento a tu lado es un regalo que atesoro en mi corazón. Tu sonrisa ilumina mis días y tu amor llena mi vida de alegría.</p>
      <p>Eres mi inspiración, mi paz y mi mayor felicidad. Gracias por ser quien eres y por permitirme compartir esta vida contigo.</p>
      <p>Te amo más de lo que las palabras pueden expresar.</p>
    `;
    triggerConfetti();
    
    // Animación especial para el mensaje
    mensaje.style.animation = 'pulse 2s ease';
    setTimeout(() => {
      mensaje.style.animation = '';
    }, 2000);
  };
  
  // Control de música
  const musicControl = document.querySelector('.music-control');
  const audio = document.getElementById('background-music');
  
  musicControl.addEventListener('click', function() {
    if (audio.paused) {
      audio.play().catch(e => console.log("La reproducción automática fue prevenida:", e));
      musicControl.innerHTML = '<i class="fas fa-music"></i> <span>Música ON</span>';
    } else {
      audio.pause();
      musicControl.innerHTML = '<i class="fas fa-music"></i> <span>Música OFF</span>';
    }
  });
});

// Efecto de máquina de escribir
function initTypingEffect() {
  const typingLines = document.querySelectorAll('.typing-line');
  let currentLine = 0;
  
  function typeNextLine() {
    if (currentLine >= typingLines.length) {
      currentLine = 0;
      setTimeout(typeNextLine, 5000);
      return;
    }
    
    const line = typingLines[currentLine];
    const text = line.textContent;
    line.textContent = '';
    line.style.display = 'block';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        line.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        currentLine++;
        setTimeout(typeNextLine, 3000);
      }
    }, 50);
  }
  
  setTimeout(typeNextLine, 2000);
}

// Corazones flotantes
function initHearts() {
  setInterval(() => {
    const container = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤', '💖', '💗', '💓', '💘', '💝', '💞'][Math.floor(Math.random() * 7)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

// Flores flotantes adicionales
function initFloatingFlowers() {
  const flowers = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹', '🌻'];
  const container = document.querySelector('.floating-flowers');
  
  for (let i = 0; i < 10; i++) {
    const flower = document.createElement('div');
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.position = 'fixed';
    flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
    flower.style.opacity = Math.random() * 0.6 + 0.2;
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = Math.random() * 100 + 'vh';
    flower.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out ${Math.random() * 5}s`;
    flower.style.zIndex = '-1';
    container.appendChild(flower);
  }
}

// Corazones flotantes adicionales
function initFloatingHearts() {
  const hearts = ['❤', '💖', '💗', '💓', '💘'];
  const container = document.querySelector('.floating-hearts');
  
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.4 + 0.3;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.animation = `float ${Math.random() * 8 + 8}s infinite ease-in-out ${Math.random() * 3}s`;
    heart.style.zIndex = '-1';
    container.appendChild(heart);
  }
}

// Carruseles automáticos de viajes
function initTravelCarousels() {
  const travelCarousels = {
    cozumel: { index: 0, interval: null, itemCount: document.querySelectorAll('#cozumel-travel .travel-media-item').length },
    cdmx: { index: 0, interval: null, itemCount: document.querySelectorAll('#cdmx-travel .travel-media-item').length }
  };
  
  // Iniciar carruseles
  function startCarousel(city) {
    clearInterval(travelCarousels[city].interval);
    travelCarousels[city].interval = setInterval(() => {
      moveTravelMedia(1, city);
    }, 5000);
  }
  
  // Mostrar viaje seleccionado
  window.showTravel = function(city) {
    // Detener todos los carruseles
    Object.keys(travelCarousels).forEach(c => {
      clearInterval(travelCarousels[c].interval);
      document.getElementById(`${c}-travel`).classList.remove('active');
      document.getElementById(`${c}-travel`).setAttribute('hidden', 'true');
      document.querySelector(`button[onclick="showTravel('${c}')"]`).classList.remove('active');
      document.querySelector(`button[onclick="showTravel('${c}')"]`).setAttribute('aria-selected', 'false');
    });
    
    // Activar el seleccionado
    document.getElementById(`${city}-travel`).classList.add('active');
    document.getElementById(`${city}-travel`).removeAttribute('hidden');
    document.querySelector(`button[onclick="showTravel('${city}')"]`).classList.add('active');
    document.querySelector(`button[onclick="showTravel('${city}')"]`).setAttribute('aria-selected', 'true');
    
    // Reiniciar índice y puntos
    travelCarousels[city].index = 0;
    updateDots(city);
    
    // Iniciar carrusel automático
    startCarousel(city);
  };
  
  // Mover medios en el carrusel
  window.moveTravelMedia = function(direction, city) {
    const wrapper = document.querySelector(`#${city}-travel .travel-media-wrapper`);
    const items = wrapper.querySelectorAll('.travel-media-item');
    
    travelCarousels[city].index += direction;
    
    if (travelCarousels[city].index >= travelCarousels[city].itemCount) travelCarousels[city].index = 0;
    if (travelCarousels[city].index < 0) travelCarousels[city].index = travelCarousels[city].itemCount - 1;
    
    wrapper.style.transform = `translateX(-${travelCarousels[city].index * 100}%)`;
    
    // Actualizar items activos
    items.forEach(item => item.classList.remove('active'));
    items[travelCarousels[city].index].classList.add('active');
    
    // Actualizar puntos
    updateDots(city);
    
    // Reiniciar intervalo
    startCarousel(city);
  };
  
  // Actualizar puntos indicadores
  function updateDots(city) {
    const dotsContainer = document.querySelector(`#${city}-travel .travel-dots`);
    const items = document.querySelectorAll(`#${city}-travel .travel-media-item`);
    
    // Crear puntos si no existen
    if (!dotsContainer.hasChildNodes()) {
      dotsContainer.innerHTML = '';
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('travel-dot');
        if (i === travelCarousels[city].index) dot.classList.add('active');
        dot.addEventListener('click', () => {
          travelCarousels[city].index = i;
          moveTravelMedia(0, city);
        });
        dot.setAttribute('aria-label', `Mostrar imagen ${i + 1}`);
        dotsContainer.appendChild(dot);
      });
    } else {
      // Actualizar puntos existentes
      const dots = dotsContainer.querySelectorAll('.travel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === travelCarousels[city].index);
      });
    }
  }
  
  // Iniciar el primer carrusel
  showTravel('cozumel');
}

// Ciclo de citas de amor
function initQuotes() {
  const quotes = document.querySelectorAll('.quote');
  let currentQuote = 0;
  
  setInterval(() => {
    quotes[currentQuote].classList.remove('active');
    currentQuote = (currentQuote + 1) % quotes.length;
    quotes[currentQuote].classList.add('active');
  }, 5000);
}

// Reproductor de música
function initMusicPlayer() {
  const audio = document.getElementById('background-music');
  const progressBar = document.querySelector('.progress-bar');
  const player = document.querySelector('.music-player');
  const playBtn = document.querySelector('.play-btn');
  const songInfo = document.querySelector('.song-info');
  
  const songs = {
    'CHIHIRO': {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Billie Eilish - CHIHIRO'
    },
    'Bacalar': {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'Siddhartha - Bacalar'
    },
    'Perfect': {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'Ed Sheeran - Perfect'
    }
  };
  
  window.playSong = function(songName) {
    player.classList.remove('hidden');
    
    if(songs[songName]) {
      audio.src = songs[songName].url;
      songInfo.textContent = songs[songName].title;
    }
    
    audio.play().catch(e => console.log("La reproducción automática fue prevenida:", e));
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  };
  
  window.togglePlay = function() {
    if (audio.paused) {
      audio.play().catch(e => console.log("La reproducción automática fue prevenida:", e));
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  };
  
  window.skipForward = function() {
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  };
  
  window.skipBackward = function() {
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };
  
  audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
  });
  
  document.querySelector('.progress-container').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  });
  
  audio.addEventListener('ended', function() {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  });
}

// Confeti
function initConfetti() {
  window.triggerConfetti = function() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff00aa', '#ff5500', '#ffaa00', '#ffff00', '#ff69b4', '#ff1493'],
      shapes: ['circle', 'heart'],
      scalar: 1.2
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff00aa', '#ff5500']
      });
      
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#ffaa00', '#ffff00', '#ff69b4']
      });
    }, 300);
  };
}

// Funciones para el ramo de flores
window.showPhotoModal = function(src, caption) {
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const modalCaption = document.getElementById('modalCaption');
  
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false');
  document.body.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = "hidden";
  
  modalImg.src = src;
  modalImg.style.display = "block";
  modalVideo.style.display = "none";
  modalVideo.pause();
  modalCaption.textContent = caption;
  
  // Efecto de confeti al abrir la foto
  triggerConfetti();
};

window.showVideoModal = function(src, caption) {
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const modalCaption = document.getElementById('modalCaption');
  
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false');
  document.body.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = "hidden";
  
  modalVideo.src = src;
  modalVideo.style.display = "block";
  modalImg.style.display = "none";
  modalCaption.textContent = caption;
  
  // Intentar reproducir el video
  setTimeout(() => {
    modalVideo.play().catch(e => console.log("La reproducción automática fue prevenida:", e));
  }, 300);
  
  // Efecto de confeti al abrir el video
  triggerConfetti();
};

window.closeModal = function() {
  const modal = document.getElementById('photoModal');
  const modalVideo = document.getElementById('modalVideo');
  
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
  document.body.removeAttribute('aria-hidden');
  document.body.style.overflow = "auto";
  modalVideo.pause();
};

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById('photoModal');
  if (event.target == modal) {
    closeModal();
  }
};

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
// Añade esto al final de tu script.js

// Manejar redimensionamiento para el ramo de flores
function handleResize() {
  const bouquet = document.querySelector('.flower-bouquet');
  const viewportWidth = window.innerWidth;
  
  if (viewportWidth < 480) {
    // Ajustar distancias para móviles pequeños
    document.querySelectorAll('.flower-secondary').forEach((flower, index) => {
      const angles = [0, 72, 144, 216, 288];
      flower.style.setProperty('--distance', '110px');
      flower.style.setProperty('--angle', `${angles[index]}deg`);
    });
  } else if (viewportWidth < 768) {
    // Ajustar para tablets
    document.querySelectorAll('.flower-secondary').forEach((flower, index) => {
      const angles = [0, 72, 144, 216, 288];
      flower.style.setProperty('--distance', '120px');
      flower.style.setProperty('--angle', `${angles[index]}deg`);
    });
  } else {
    // Tamaño de escritorio
    document.querySelectorAll('.flower-secondary').forEach((flower, index) => {
      const angles = [0, 72, 144, 216, 288];
      flower.style.setProperty('--distance', '140px');
      flower.style.setProperty('--angle', `${angles[index]}deg`);
    });
  }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);


// Lista de canciones con rutas a tus archivos
const songs = {
  'music1': {
    url: 'assets/music/music1.mp3', // Ajusta la extensión (.mp3 o .mp4)
    title: 'chihiro',      // Cambia por el nombre real
    duration: '5:04'                // Cambia por la duración real
  },
  'music2': {
    url: 'assets/music/music2.mp3', // Ajusta la extensión (.mp3 o .mp4)
    title: 'Bacalar',      // Cambia por el nombre real
    duration: '4:10'                // Cambia por la duración real
  }
};

// Variables globales
let currentSong = null;
let progressInterval;

// Inicializar el reproductor
function initMusicPlayer() {
  const audioPlayer = document.getElementById('audio-player');
  const progressBar = document.querySelector('.progress-bar');
  const player = document.querySelector('.music-player');
  const playBtn = document.querySelector('.play-btn');
  const songInfo = document.querySelector('.song-info');
  
  // Función para reproducir una canción
  window.playSong = function(songName) {
    if (!songs[songName]) return;
    
    currentSong = songName;
    player.classList.remove('hidden');
    audioPlayer.src = songs[songName].url;
    songInfo.textContent = songs[songName].title;
    
    // Intenta reproducir (con manejo de error para móviles)
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevenido: ", error);
        // Muestra instrucción para el usuario
        songInfo.textContent = "Toca el botón de play para reproducir";
      });
    }
    
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Actualizar iconos de todas las canciones
    document.querySelectorAll('.song').forEach(songEl => {
      const icon = songEl.querySelector('.play-icon');
      icon.textContent = songEl.getAttribute('onclick').includes(songName) ? '⏸️' : '▶️';
    });
  };
  
  // Alternar entre play/pause
  window.togglePlay = function() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      document.querySelector('.play-btn').innerHTML = '<i class="fas fa-pause"></i>';
      startProgressTimer();
    } else {
      audioPlayer.pause();
      document.querySelector('.play-btn').innerHTML = '<i class="fas fa-play"></i>';
      clearInterval(progressInterval);
    }
  };
  
  // Retroceder 10 segundos
  window.skipBackward = function() {
    audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
  };
  
  // Adelantar 10 segundos
  window.skipForward = function() {
    audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration);
  };
  
  // Actualizar barra de progreso
  function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
  }
  
  function startProgressTimer() {
    clearInterval(progressInterval);
    progressInterval = setInterval(updateProgressBar, 1000);
  }
  
  // Click en la barra de progreso para saltar
  document.querySelector('.progress-container').addEventListener('click', function(e) {
    if (!currentSong) return;
    
    const rect = this.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = pos * audioPlayer.duration;
  });
  
  // Cuando termina la canción
  audioPlayer.addEventListener('ended', function() {
    document.querySelector('.play-btn').innerHTML = '<i class="fas fa-play"></i>';
    document.querySelectorAll('.song .play-icon').forEach(icon => {
      icon.textContent = '▶️';
    });
  });
  
  // Habilitar audio en móviles (requiere interacción del usuario)
  document.addEventListener('click', function enableAudio() {
    // Solo se ejecuta una vez
    document.removeEventListener('click', enableAudio);
    
    // Reproduce y pausa inmediatamente para desbloquear audio
    audioPlayer.play().then(() => {
      audioPlayer.pause();
    }).catch(e => console.log("Error al habilitar audio:", e));
  }, { once: true });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initMusicPlayer);