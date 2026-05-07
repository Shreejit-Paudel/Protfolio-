(function () {

  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  const PARTICLE_COUNT = 80;
  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function Particle() {
    this.reset = function () {
      this.x  = rand(0, W);
      this.y  = rand(0, H);
      this.vx = rand(-0.22, 0.22);
      this.vy = rand(-0.22, 0.22);
      this.r  = rand(0.6, 2.2);
      this.a  = rand(0.07, 0.42);
    };
    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    };
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56,189,248,' + this.a + ')';
      ctx.fill();
    };
    this.reset();
  }

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function connect() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 118) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(56,189,248,' + (0.09 * (1 - d / 118)) + ')';
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function (p) { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  }

  loop();

})();

(function () {

  var phrases = [
    'Frontend Developer',
    'Creative UI Designer',
    'Student from Nepal 🇳🇵',
    'Login UI Builder',
    'CSS Animator'
  ];

  var el  = document.getElementById('typed');
  var pi  = 0;
  var ci  = 0;
  var del = false;

  function tick() {
    var word = phrases[pi];

    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        del = true;
        setTimeout(tick, 1900);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
      }
    }

    setTimeout(tick, del ? 46 : 88);
  }

  tick();

})();

(function () {

  var nav      = document.getElementById('nav');
  var links    = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);

    var cur = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 170) cur = s.id;
    });

    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });

})();

var hbg     = document.getElementById('hbg');
var mobMenu = document.getElementById('mob-menu');

hbg.addEventListener('click', function () {
  hbg.classList.toggle('open');
  mobMenu.classList.toggle('open');
  document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMob() {
  hbg.classList.remove('open');
  mobMenu.classList.remove('open');
  document.body.style.overflow = '';
}

(function () {

  var els = document.querySelectorAll('.reveal');

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');

        var bar = e.target.querySelector('.skill-bar');
        var pct = e.target.getAttribute('data-pct');
        if (bar && pct) {
          setTimeout(function () {
            bar.style.width = pct + '%';
          }, 240);
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  els.forEach(function (el) { obs.observe(el); });

})();

document.querySelectorAll('.project-card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var r    = card.getBoundingClientRect();
    var x    = e.clientX - r.left;
    var y    = e.clientY - r.top;
    var midX = r.width  / 2;
    var midY = r.height / 2;
    var rX   = ((y - midY) / midY) * -5;
    var rY   = ((x - midX) / midX) *  5;
    card.style.transform = 'translateY(-8px) perspective(700px) rotateX(' + rX + 'deg) rotateY(' + rY + 'deg)';
  });

  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
  });
});

(function () {

  var form    = document.getElementById('contact-form');
  var sendBtn = document.getElementById('send-btn');
  var sendTxt = document.getElementById('send-txt');
  var formOk  = document.getElementById('form-ok');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendTxt.textContent = 'Sending...';
    sendBtn.disabled = true;

    setTimeout(function () {
      form.reset();
      sendTxt.textContent = 'Send Message';
      sendBtn.disabled = false;
      formOk.classList.add('show');
      setTimeout(function () {
        formOk.classList.remove('show');
      }, 4500);
    }, 1600);
  });

})();