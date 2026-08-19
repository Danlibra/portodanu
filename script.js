// ===== Typing effect =====
const typed = document.getElementById("typed");
const phrases = [
  "Implementing.....",
  "Securing.....",
  "troubleshooting networks...",
  "automating repetitive tasks..."
];
let phrase = 0, pos = 0, deleting = false;

function typeLoop(){
  const text = phrases[phrase];
  typed.textContent = deleting ? text.slice(0, --pos) : text.slice(0, ++pos);
  let speed = deleting ? 45 : 80;
  if(!deleting && pos === text.length){ deleting = true; speed = 1300; }
  else if(deleting && pos === 0){ deleting = false; phrase = (phrase + 1) % phrases.length; speed = 300; }
  setTimeout(typeLoop, speed);
}
typeLoop();

// ===== Terminal animation =====
const terminal = document.getElementById("terminalBody");
const lines = [
  ["> initializing portfolio...", "green"],
  ["> loading skills...", "green"],
  ["> checking systems...", "green"],
  ["> status: ONLINE", "green"],
  ["", ""],
  ["Bagusdanu@portfolio:~$ whoami", "prompt"],
  ["IT Monitoring & Security Engineer", ""],
  ["", ""],
  ["Bagusdanu@portfolio:~$ skills --list", "prompt"],
  ["- SolarWinds", ""],
  ["- AlgoSec", ""],
  ["- Gigamon", ""],
  ["- Zscaler", ""],
  ["Bagusdanu@portfolio:~$ _", "prompt"]
];
let lineIndex = 0;
function terminalLoop(){
  if(lineIndex < lines.length){
    const div = document.createElement("div");
    div.className = lines[lineIndex][1];
    div.textContent = lines[lineIndex][0];
    terminal.appendChild(div);
    lineIndex++;
    setTimeout(terminalLoop, 180);
  }
}
terminalLoop();

// ===== Scroll reveal =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== Project filter =====
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project").forEach(card => {
      card.style.display = filter === "all" || card.dataset.category === filter ? "" : "none";
    });
  });
});

// ===== Theme =====
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
});

// ===== Contact demo =====
document.getElementById("sendBtn").addEventListener("click", () => {
  document.getElementById("formStatus").textContent =
    "Demo mode: connect this form to Formspree, EmailJS, or your own backend.";
});

// ===== Back to top =====
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = scrollY > 500 ? "block" : "none";
});
topBtn.addEventListener("click", () => scrollTo({top:0, behavior:"smooth"}));

// ===== Animated particle network =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let dots = [];
function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  dots = Array.from({length: Math.min(80, Math.floor(innerWidth/16))}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx:(Math.random()-.5)*.45, vy:(Math.random()-.5)*.45
  }));
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach((d,i)=>{
    d.x += d.vx; d.y += d.vy;
    if(d.x<0||d.x>canvas.width)d.vx*=-1;
    if(d.y<0||d.y>canvas.height)d.vy*=-1;
    ctx.fillStyle="rgba(24,168,255,.7)";
    ctx.beginPath(); ctx.arc(d.x,d.y,1.5,0,Math.PI*2); ctx.fill();
    for(let j=i+1;j<dots.length;j++){
      const e=dots[j], dx=d.x-e.x, dy=d.y-e.y, dist=Math.hypot(dx,dy);
      if(dist<130){
        ctx.strokeStyle=`rgba(80,140,220,${(1-dist/130)*.18})`;
        ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(e.x,e.y);ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}
addEventListener("resize", resize); resize(); animate();
