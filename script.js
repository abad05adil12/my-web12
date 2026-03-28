const cursor = document.getElementById("cursor"),
  ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
const TRAIL = 14,
  TC = ["#00e5a0", "#00c98a", "#00ad74", "#009060", "#007a50"];
const trails = Array.from({ length: TRAIL }, (_, i) => {
  const d = document.createElement("div");
  d.className = "trail-dot";
  d.style.cssText = `background:${TC[Math.min(i, TC.length - 1)]};width:${8 - i * 0.45}px;height:${8 - i * 0.45}px;`;
  document.body.appendChild(d);
  return { el: d, x: 0, y: 0 };
});
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
(function loop() {
  let lx = mx,
    ly = my;
  trails.forEach((t, i) => {
    t.x += (lx - t.x) * 0.42;
    t.y += (ly - t.y) * 0.42;
    t.el.style.left = t.x + "px";
    t.el.style.top = t.y + "px";
    t.el.style.opacity = (1 - i / TRAIL) * 0.55;
    lx = t.x;
    ly = t.y;
  });
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(loop);
})();
document
  .querySelectorAll("a,button,.service-card,.portfolio-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "var(--accent2)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.borderColor = "var(--accent)";
    });
  });

(function () {
  const c = document.getElementById("particle-canvas"),
    ctx = c.getContext("2d");
  let W,
    H,
    pts = [];
  const resize = () => {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
  };
  resize();
  addEventListener("resize", resize);
  const PC = ["#00e5a0", "#7b61ff", "#ff4e6a", "#ffffff"];
  const mk = () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.6 + 0.3,
    c: PC[0 | (Math.random() * PC.length)],
    a: Math.random() * 0.5 + 0.1,
  });
  for (let i = 0; i < 110; i++) pts.push(mk());
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p, i) => {
      pts.slice(i + 1).forEach((q) => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 140) {
          ctx.strokeStyle = `rgba(0,229,160,${0.13 * (1 - d / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      });
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = p.a;
      ctx.fill();
      ctx.globalAlpha = 1;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  })();
  addEventListener("mousemove", (e) => {
    pts.forEach((p) => {
      const d = Math.hypot(e.clientX - p.x, e.clientY - p.y);
      if (d < 100) {
        p.vx -= (e.clientX - p.x) * 0.003;
        p.vy -= (e.clientY - p.y) * 0.003;
      }
      p.vx = Math.max(-0.9, Math.min(0.9, p.vx));
      p.vy = Math.max(-0.9, Math.min(0.9, p.vy));
    });
  });
})();

/* ─── TYPEWRITER ─── */
(function () {
  const words = [
    "Websites that convert.",
    "Software that scales.",
    "Design that delights.",
    "Code that performs.",
  ];
  const el = document.getElementById("tw");
  let wi = 0,
    ci = 0,
    del = false;
  function type() {
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0, ++ci);
      if (ci === w.length) {
        del = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = w.slice(0, --ci);
      if (ci === 0) {
        del = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, del ? 48 : 88);
  }
  setTimeout(type, 1000);
})();

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll(".magnetic").forEach((b) => {
  b.addEventListener("mousemove", (e) => {
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
  });
  b.addEventListener("mouseleave", () => (b.style.transform = ""));
});

/* ─── RIPPLE ─── */
document.querySelectorAll(".ripple-btn").forEach((b) => {
  b.addEventListener("click", (e) => {
    const r = b.getBoundingClientRect(),
      d = Math.max(b.clientWidth, b.clientHeight);
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px;`;
    b.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });
});

/* ─── TILT CARDS ─── */
document.querySelectorAll(".tilt-card").forEach((c) => {
  c.addEventListener("mousemove", (e) => {
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px) scale(1.01)`;
    c.style.boxShadow = `${-x * 20}px ${-y * 20}px 50px rgba(0,0,0,.4), 0 0 40px rgba(0,229,160,.15)`;
  });
  c.addEventListener("mouseleave", () => {
    c.style.transform = "";
    c.style.boxShadow = "";
  });
});

/* ─── SCROLL REVEAL ─── */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal,.reveal-left,.reveal-right")
  .forEach((el) => io.observe(el));

/* ─── SKILL BARS ─── */
let skillsDone = false;
const skillObs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting && !skillsDone) {
        skillsDone = true;
        document
          .querySelectorAll(".skill-fill")
          .forEach((b) => (b.style.width = b.dataset.width + "%"));
      }
    }),
  { threshold: 0.3 },
);
skillObs.observe(document.getElementById("about"));

let cntDone = false;
function animCount(el, target, sfx, dur = 1600) {
  let s = null;
  (function step(ts) {
    if (!s) s = ts;
    const p = Math.min((ts - s) / dur, 1),
      e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target) + sfx;
    if (p < 1) requestAnimationFrame(step);
  })();
}
const cntObs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting && !cntDone) {
        cntDone = true;
        document
          .querySelectorAll("[data-target]")
          .forEach((el) =>
            animCount(el, +el.dataset.target, el.dataset.suffix || ""),
          );
      }
    }),
  { threshold: 0.4 },
);
cntObs.observe(document.getElementById("about"));

const nav = document.getElementById("navbar");
const sects = document.querySelectorAll("section");
const nls = document.querySelectorAll(".nav-links a");
addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 60);
  let cur = "";
  sects.forEach((s) => {
    if (scrollY >= s.offsetTop - 120) cur = s.id;
  });
  nls.forEach(
    (a) =>
      (a.style.color =
        a.getAttribute("href") === "#" + cur ? "var(--accent)" : ""),
  );
});

function handleSubmit(e) {
  e.preventDefault();
  const b = e.target.querySelector("button");
  b.textContent = "✓ Message Sent!";
  b.style.background = "var(--accent3)";
  setTimeout(() => {
    b.textContent = "Send Message →";
    b.style.background = "var(--accent)";
  }, 3000);
}
