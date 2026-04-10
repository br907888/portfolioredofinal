/* ============================================================
   BROCK ADAMS PORTFOLIO — script.js
   ============================================================ */

/* ====== STAR FIELD (canvas) ====== */
(function initStarField() {
    const canvas = document.getElementById('starField');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function spawn() {
        stars = [];
        const n = Math.floor((canvas.width * canvas.height) / 5500);
        for (let i = 0; i < n; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.4 + 0.3,
                alpha: Math.random() * 0.55 + 0.2,
                vy: Math.random() * 0.25 + 0.04,
                vx: (Math.random() - 0.5) * 0.07,
                phase: Math.random() * Math.PI * 2,
                phaseSpeed: Math.random() * 0.018 + 0.004,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.phase += s.phaseSpeed;
            s.y += s.vy;
            s.x += s.vx;
            if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
            if (s.x < 0)  s.x = canvas.width;
            if (s.x > canvas.width) s.x = 0;

            const twinkle = 0.55 + 0.45 * Math.sin(s.phase);
            const a = s.alpha * twinkle;
            const hue = 210 + Math.floor(s.alpha * 50);

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue},55%,92%,${a})`;
            ctx.fill();

            if (s.r > 1.1) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 2.8, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue},70%,85%,${a * 0.12})`;
                ctx.fill();
            }
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); spawn(); });
    resize(); spawn(); draw();
})();


/* ====== TYPEWRITER ====== */
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Developer. Designer. Artist.',
        'UI/UX Experience Creator.',
        'Educational Tech Builder.',
        'Digital World Crafter.',
    ];

    let pi = 0, ci = 0, deleting = false;

    function tick() {
        const phrase = phrases[pi];
        if (!deleting) {
            el.textContent = phrase.slice(0, ++ci);
            if (ci === phrase.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
        } else {
            el.textContent = phrase.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
        }
        setTimeout(tick, deleting ? 48 : 95);
    }
    setTimeout(tick, 1400);
})();


/* ====== NAV SCROLL BEHAVIOR ====== */
(function initNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();


/* ====== MOBILE MENU ====== */
(function initMobileMenu() {
    const btn   = document.getElementById('hamburger');
    const menu  = document.getElementById('mobileMenu');
    const close = document.getElementById('mobileClose');

    function openMenu()  { menu.classList.add('open');    document.body.style.overflow = 'hidden'; }
    function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }

    btn.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();


/* ====== SMOOTH SCROLL ====== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
});


/* ====== SCROLL REVEAL ====== */
(function initReveal() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el    = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => el.classList.add('visible'), delay);
            io.unobserve(el);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.reveal, .project-card, .skill-orb').forEach(el => io.observe(el));
})();


/* ====== COUNTER ANIMATION ====== */
(function initCounters() {
    const statsEl = document.querySelector('.about__stats');
    if (!statsEl) return;

    function run(el, target) {
        let val = 0;
        const step = target / 36;
        const iv = setInterval(() => {
            val = Math.min(val + step, target);
            el.textContent = Math.floor(val);
            if (val >= target) clearInterval(iv);
        }, 38);
    }

    const io = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        statsEl.querySelectorAll('.stat__n').forEach(el =>
            run(el, parseInt(el.dataset.target, 10))
        );
        io.unobserve(statsEl);
    }, { threshold: 0.5 });

    io.observe(statsEl);
})();


/* ====== ACTIVE NAV LINK ====== */
(function initActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav__link');

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
            });
        });
    }, { threshold: 0.35 });

    sections.forEach(s => io.observe(s));
})();


/* ====== CASE STUDY DATA ====== */
const CASES = {
    'comet-tales': {
        title:       'Comet Tales Prototype',
        tagLine:     'UI/UX Design · Project Management · Educational Tech',
        bannerClass: 'cs-banner--space',
        role:        'Project Manager & Lead UI/UX Designer',
        timeline:    'January-April 2025',
        platform:    'Mobile (iOS / Android) and Web',

        overview: `Comet Tales is a dyanmic, interactive learning experience blending exploratory learning with narrative engagement to strengthen the connection between students and astrological concepts. 
A project based on the relationship between digital platforms and improved informal learning, Comet Tales incorporated market and user research, rigorous user testing, and a detailed high-fidelity prototype into a wholisitic approach to educational interface.`,

        challenge: `A market analysis and initial research indicated that there was a significant lack of mobile content for students that incorporated educational elements while still ensuring an entertaining experience. Market competitors were either focused solely on entertainment — with a lack of substantial hierarchy, or based entirely in education, with no strong means to maintain user focus. Many of these competitors also noticeably lacked any foundational strcuture that encouraged students to retain the information they were enaging with, leading to aimless experiences that left users wanting stronger connections with the educational material. Essentially,these applications either felt too much like play or school, without a healthy balance between the two.`,
        
        solution: `To provide a meaningful solution, I organized a mutli-faceted research phase for my team. We collected user surveys and interviews, conducted think-aloud protocols, explored literature reviews, and synthesized our findings into visualized data.
Our research and user data indicated that students desired the opportunity to explore astrological concepts at their own pace but requested somewhat of a guided structure to facilitate educational navigation. In response to my data visaulization, my team and I developed a dynamic framework that integrated multiple academic approaches into a streamlined experience. Our prototype utilizes exploratory modules complete with mini-game knowledge checks, interactive AR simulations detailing astronomical models like planets, and discussion boards for users to track and share what they learn with others. `,

        image:        'assets/comettales.jpg',
        imageCaption: 'Wireframes exploring the visual presentation of Comet Tales.',

        tools: [
            'Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe Aero'
        ],

        outcome: `User data post-prototype release saw immense user satisfaction, with students feeling a sense of agency and control over their learning. This excited them and ecnouraged the students to learn more about their natural world. Discovery using the application was reported to feel sleek and exploratory in nature — as users with the freedom of modular interaction and the colorful graphical interface of the platform.
 Users felt satisfaction in being able to track their learning and felt a sense of pride in being able to showcase their knowledge. 
 
 Students were overjoyed and inspired by the fact that they were able to witness their mastery over the topic presented to them. 
Next steps for the prototype involve implementing full mobile functionality leveraging React and potential collaboration with eductational entities like the Kennedy Space Center.`,
    },

    'dust-buddies': {
        title:       'Dust Buddies Prototype',
        tagLine:     'UI/UX Design · Platform Architecture · Gamification',
        bannerClass: 'cs-banner--green',
        role:        'UI/UX Designer & Platform Architect',
        timeline:    'Ongoing',
        platform:    'Mobile (iOS / Android)',

        overview: `Dust Buddies is a dynamic mobile application blending both game-based content and interactive features to assist roommates in chore delegation and conflict mediation while living together. The app – currently in its final prototype, allows users to group with their roommates and schedule tasks.
The platform also encourages a sense of interactivity and collaboration by transforming each task into a game-like challenge, complete with custmoizable avatars and unique artwork. The app also provied various messaging and announcement features so roommates can communicate with each other and promote a sense of accountabilty.`,

        challenge: `Based on my experience working in higher education and alongside market research, there was a noticeable gap in terms of platforms designed to facilitate living with roommates. Most chore-based trackers on the market are tailored only for families of small children and lack robust features needed for young adults living with each other for the first time. It was also evident that due to rising housing costs, more adults will be adopting a lifestyle involving roommates.`,

        solution: `Under my lead, my team and I conducted rigorous think-aloud protocols with various users based on a methodology I designed. The tests compared market competitors with our framework and the results indicated that our approach to communication and direct interaction between roommates was the optimal strategy. I visualized our data and used it to construct a platform architecture based on intuitive dialogue and consolidation.
Our key design strategy was to have all of the core features of the app centralized in a central area centered around the avatar the user controls to engage in tasks and "gameified" content. The avatar, or "dust buddy",can be customized and upgraded based on rewards users receive for completing tasks. Each completed score corresponds to fighting against a monster that a group of roommates must defeat together. The app also features anonymous voting for users to ensure that their fellow roommates are completing tasks in a satisfactory manner. Along with this, built-in messaging features enable steady coordination and collaboration between roommates.`,

        image:        'assets/dustbuddies.jpg',
        imageCaption: 'Initial character and icon design.',

        tools: [
            'Figma', 'Adobe Illustrator', 'React Native', 'Firebase', 'JavaScript',
        ],

        outcome: `Additional user data was collected following the development of the final Dust Buddies prototype. Feedback indicated that the collaborative approach to roommate mediation based on "gameified" content led to a greater sense of accountability when enaging with tasks. Users also felt more eager to particpate with the interface when avatar personalization and a strong visual aesthetic was introduced
We have transitioned into full mobile development, leveraging React Native for our front-end and Firebase for our back-end/database structure. We are currently in the testing and debugging phase of our project and have an estimated release window of April 2026.`,
    },
};


/* ====== CASE STUDY MODAL ====== */
window.openCase = function(id) {
    const data    = CASES[id];
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('modalContent');
    if (!data) return;

    const toolChips = data.tools.map(t => `<span class="cs-tool-chip">${t}</span>`).join('');

    content.innerHTML = `
        <div class="cs-banner ${data.bannerClass}">
            <div class="cs-banner-bg"></div>
            <div class="cs-banner-text">
                <span class="cs-banner-tag">${data.tagLine}</span>
                <h2 class="cs-banner-title" id="modalTitle">${data.title}</h2>
            </div>
        </div>

        <div class="cs-meta">
            <div>
                <span class="cs-meta-label">My Role</span>
                <span class="cs-meta-value">${data.role}</span>
            </div>
            <div>
                <span class="cs-meta-label">Timeline</span>
                <span class="cs-meta-value">${data.timeline}</span>
            </div>
            <div>
                <span class="cs-meta-label">Platform</span>
                <span class="cs-meta-value">${data.platform}</span>
            </div>
        </div>

        <div class="cs-section">
            <div class="cs-section-title">Overview</div>
            <p>${data.overview}</p>
        </div>

        <div class="cs-section">
            <div class="cs-section-title">Problem/Market Gaps</div>
            <p>${data.challenge}</p>
        </div>

        <div class="cs-section">
            <div class="cs-section-title">Design Solution</div>
            <p>${data.solution}</p>
        </div>

        <div class="cs-image-block">
            ${data.image
                ? `<img src="${data.image}" alt="${data.title} preview" class="cs-image" onerror="this.closest('.cs-image-block').classList.add('cs-image-block--placeholder')">`
                : `<div class="cs-image-placeholder"><span>Image Coming Soon</span></div>`
            }
            <p class="cs-image-caption">${data.imageCaption || ''}</p>
        </div>

        <div class="cs-section">
            <div class="cs-section-title">Outcome & Reflection</div>
            <p>${data.outcome}</p>
        </div>

        <div class="cs-section cs-section--tools">
            <div class="cs-section-title">Tools Used</div>
            <div class="cs-tools">${toolChips}</div>
        </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('modal').scrollTop = 0;
};

window.closeCase = function() {
    document.getElementById('overlay').classList.remove('open');
    document.body.style.overflow = '';
};

document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeCase(); });


/* ====== CONTACT FORM ====== */
(function initForm() {
    const form = document.getElementById('contactForm');
    const btn  = document.getElementById('submitBtn');
    if (!form || !btn) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const orig = btn.innerHTML;
        btn.innerHTML    = '✓ Message Sent!';
        btn.style.background = '#007A72';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML    = orig;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3500);
    });
})();


/* ====== CASE STUDY BANNER STYLES (injected) ====== */
(function addBannerStyles() {
    const s = document.createElement('style');
    s.textContent = `
        .cs-banner--space .cs-banner-bg {
            background: linear-gradient(140deg, #050D22 0%, #0F2050 55%, #071830 100%);
        }
        .cs-banner--space .cs-banner-bg::before {
            content:'';
            position: absolute; inset:0;
            background-image:
                radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.5), transparent),
                radial-gradient(1px 1px at 38% 58%, rgba(255,255,255,0.35), transparent),
                radial-gradient(2px 2px at 70% 18%, rgba(180,210,255,0.3), transparent),
                radial-gradient(1px 1px at 85% 72%, rgba(255,255,255,0.4), transparent);
        }
        .cs-banner--green .cs-banner-bg {
            background: linear-gradient(140deg, #071A10 0%, #0B3820 55%, #051510 100%);
        }
        .cs-banner--green .cs-banner-bg::before {
            content:'';
            position: absolute; inset:0;
            background-image:
                linear-gradient(rgba(0,200,130,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,200,130,0.06) 1px, transparent 1px);
            background-size: 24px 24px;
        }
    `;
    document.head.appendChild(s);
})();
