// 3D floating particles background with parallax mouse effect
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
let particles = [];
const PCOUNT = 38;
function resizeCanvas() {
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w; canvas.height = h;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function genParticle() {
  const r = 32 + Math.random()*44;
  return {
    x: Math.random()*w,
    y: Math.random()*h,
    z: 0.2 + Math.random()*0.8,
    r,
    color: `rgba(${Math.round(70+60*Math.random())},${Math.round(130+120*Math.random())},255,${0.13+0.17*Math.random()})`,
    dx: (Math.random()-0.5)*.15,
    dy: (Math.random()-0.5)*.15,
    swing: Math.random()*Math.PI*2
  }
}
particles = Array.from({length:PCOUNT}, genParticle);

let mouse = {x: w/2, y: h/2};
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
function render() {
  ctx.clearRect(0,0,w,h);
  for (let p of particles) {
    // 3D parallax
    let px = p.x + (mouse.x-w/2)*p.z*0.14 + Math.cos(p.swing)*14*p.z;
    let py = p.y + (mouse.y-h/2)*p.z*0.10 + Math.sin(p.swing)*11*p.z;
    ctx.beginPath();
    ctx.arc(px, py, p.r*p.z, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = "#3bb5ff";
    ctx.shadowBlur = 32*p.z;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Move a bit
    p.x += p.dx*p.z;
    p.y += p.dy*p.z;
    p.swing += 0.012*p.z;
    if (p.x<-80) p.x = w+80;
    if (p.x>w+80) p.x = -80;
    if (p.y<-80) p.y = h+80;
    if (p.y>h+80) p.y = -80;
  }
  requestAnimationFrame(render);
}
render();
