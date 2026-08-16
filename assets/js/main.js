// -------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // -------------------------------------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // -------------------------------------------------------------
    // 2. Hero Background Canvas Particles & Ambient Sparks
    // -------------------------------------------------------------
    const heroCanvas = document.getElementById('hero-particles');
    const hCtx = heroCanvas.getContext('2d');
    let hParticles = [];

    function resizeHeroCanvas() {
      heroCanvas.width = window.innerWidth;
      heroCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeHeroCanvas);
    resizeHeroCanvas();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = -(Math.random() * 0.8 + 0.3);
        this.color = Math.random() > 0.5 ? '#00d2ff' : '#ffd700';
        this.alpha = Math.random() * 0.7 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0 || this.x < 0 || this.x > heroCanvas.width) {
          this.reset();
          this.y = heroCanvas.height + 10;
        }
      }
      draw() {
        hCtx.save();
        hCtx.globalAlpha = this.alpha;
        hCtx.fillStyle = this.color;
        hCtx.shadowBlur = 8;
        hCtx.shadowColor = this.color;
        hCtx.beginPath();
        hCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        hCtx.fill();
        hCtx.restore();
      }
    }

    for (let i = 0; i < 45; i++) {
      hParticles.push(new Particle());
    }

    function animateHero() {
      hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      hParticles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateHero);
    }
    animateHero();

    // -------------------------------------------------------------
    // 3. Playable Kyiv Runner Mini Arcade Game Canvas
    // -------------------------------------------------------------
    const gCanvas = document.getElementById('mini-game-canvas');
    const gCtx = gCanvas.getContext('2d');
    let gameRunning = false;
    let gameLoopId;
    let gScore = 0;

    let runner = {
      x: 60,
      y: 130,
      width: 24,
      height: 36,
      vy: 0,
      gravity: 0.7,
      jumpStrength: -11,
      isGrounded: false
    };

    let obstacles = [];
    let chestNuts = [];
    let frameCount = 0;
    const groundLevel = 175;

    function resizeGameCanvas() {
      gCanvas.width = 480;
      gCanvas.height = 270;
    }
    resizeGameCanvas();

    function jumpMiniGame() {
      if (runner.isGrounded) {
        runner.vy = runner.jumpStrength;
        runner.isGrounded = false;
      }
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !document.getElementById('demo-modal').classList.contains('hidden')) {
        e.preventDefault();
        jumpMiniGame();
      }
    });

    gCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      jumpMiniGame();
    });

    function startMiniGame() {
      runner.y = 130;
      runner.vy = 0;
      obstacles = [];
      chestNuts = [];
      gScore = 0;
      frameCount = 0;
      gameRunning = true;
      document.getElementById('game-over-screen').classList.add('hidden');
      document.getElementById('game-score').innerText = '0';
      loopGame();
    }

    function restartMiniGame() {
      startMiniGame();
    }

    function loopGame() {
      if (!gameRunning) return;
      updateGame();
      drawGame();
      gameLoopId = requestAnimationFrame(loopGame);
    }

    function updateGame() {
      frameCount++;
      gScore += 1;
      document.getElementById('game-score').innerText = Math.floor(gScore / 5);

      // Runner physics
      runner.vy += runner.gravity;
      runner.y += runner.vy;
      if (runner.y + runner.height >= groundLevel) {
        runner.y = groundLevel - runner.height;
        runner.vy = 0;
        runner.isGrounded = true;
      }

      // Spawn Obstacles (Bogdan buses / road barriers)
      if (frameCount % 100 === 0) {
        obstacles.push({
          x: gCanvas.width + 20,
          y: groundLevel - 28,
          width: 22,
          height: 28,
          speed: 4.5
        });
      }

      // Update Obstacles & Collision Check
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacles[i].speed;

        // Hitbox collision
        if (
          runner.x < obstacles[i].x + obstacles[i].width &&
          runner.x + runner.width > obstacles[i].x &&
          runner.y < obstacles[i].y + obstacles[i].height &&
          runner.y + runner.height > obstacles[i].y
        ) {
          endMiniGame();
          return;
        }

        if (obstacles[i].x + obstacles[i].width < 0) {
          obstacles.splice(i, 1);
        }
      }
    }

    function drawGame() {
      gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

      // Sky Background
      gCtx.fillStyle = '#0a0f1d';
      gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);

      // Kyiv Distant Skyline silhouette
      gCtx.fillStyle = '#141d33';
      gCtx.fillRect(80, 80, 40, 95);
      gCtx.fillRect(160, 50, 60, 125);
      gCtx.fillRect(280, 70, 50, 105);
      gCtx.fillRect(380, 90, 45, 85);

      // Ground (Khreshchatyk pavement)
      gCtx.fillStyle = '#1e293b';
      gCtx.fillRect(0, groundLevel, gCanvas.width, gCanvas.height - groundLevel);

      // Glowing Ground line
      gCtx.fillStyle = '#00d2ff';
      gCtx.fillRect(0, groundLevel, gCanvas.width, 2);

      // Obstacles
      obstacles.forEach(obs => {
        gCtx.fillStyle = '#ffaa00'; // Yellow Barrier
        gCtx.fillRect(obs.x, obs.y, obs.width, obs.height);
        gCtx.fillStyle = '#000';
        gCtx.fillRect(obs.x + 3, obs.y + 4, obs.width - 6, 6);
      });

      // Runner (Andriy)
      gCtx.save();
      gCtx.fillStyle = '#00d2ff';
      gCtx.shadowColor = '#00d2ff';
      gCtx.shadowBlur = 10;
      // Head
      gCtx.beginPath();
      gCtx.arc(runner.x + runner.width/2, runner.y + 7, 7, 0, Math.PI*2);
      gCtx.fill();
      // Body
      gCtx.fillStyle = '#ffd700';
      gCtx.fillRect(runner.x + 4, runner.y + 14, runner.width - 8, 14);
      // Legs
      gCtx.fillStyle = '#00d2ff';
      gCtx.fillRect(runner.x + 4, runner.y + 28, 5, 8);
      gCtx.fillRect(runner.x + runner.width - 9, runner.y + 28, 5, 8);
      gCtx.restore();
    }

    function endMiniGame() {
      gameRunning = false;
      cancelAnimationFrame(gameLoopId);
      document.getElementById('final-score-text').innerText = 'Final Score: ' + Math.floor(gScore / 5);
      document.getElementById('game-over-screen').classList.remove('hidden');
    }

    // Modal Triggers
    function openDemoModal() {
      document.getElementById('demo-modal').classList.remove('hidden');
      startMiniGame();
    }
    function closeDemoModal() {
      document.getElementById('demo-modal').classList.add('hidden');
      gameRunning = false;
      cancelAnimationFrame(gameLoopId);
    }

    function openTrailerModal() {
      document.getElementById('trailer-modal').classList.remove('hidden');
    }
    function closeTrailerModal() {
      document.getElementById('trailer-modal').classList.add('hidden');
    }

    function openLightbox(title, desc) {
      document.getElementById('lightbox-title').innerText = title;
      document.getElementById('lightbox-desc').innerText = desc;
      document.getElementById('lightbox-modal').classList.remove('hidden');
    }
    function closeLightbox() {
      document.getElementById('lightbox-modal').classList.add('hidden');
    }

    function triggerNotify() {
      document.getElementById('download').scrollIntoView({ behavior: 'smooth' });
    }

    function handlePreRegister(e) {
      e.preventDefault();
      document.getElementById('pre-reg-success').classList.remove('hidden');
      e.target.reset();
    }

    // Navbar Scroll Background Transition
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (window.scrollY > 40) {
        header.classList.add('py-2', 'shadow-2xl', 'bg-slate-950/95');
      } else {
        header.classList.remove('py-2', 'shadow-2xl', 'bg-slate-950/95');
      }
    });

