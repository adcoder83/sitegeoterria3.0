// 3D background: doux, parallax modéré
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
let particles = [];
const PCOUNT = 20;
function resizeCanvas() {
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w; canvas.height = h;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function genParticle() {
  const r = 32 + Math.random()*26;
  return {
    x: Math.random()*w,
    y: Math.random()*h,
    z: 0.18 + Math.random()*0.5,
    r,
    color: `rgba(${Math.round(80+40*Math.random())},${Math.round(170+40*Math.random())},255,${0.10+0.11*Math.random()})`,
    dx: (Math.random()-0.5)*.08,
    dy: (Math.random()-0.5)*.08,
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
    // Parallax doux
    let px = p.x + (mouse.x-w/2)*p.z*0.07 + Math.cos(p.swing)*10*p.z;
    let py = p.y + (mouse.y-h/2)*p.z*0.04 + Math.sin(p.swing)*8*p.z;
    ctx.beginPath();
    ctx.arc(px, py, p.r*p.z, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = "#67b0e5";
    ctx.shadowBlur = 9*p.z;
    ctx.fill();
    ctx.shadowBlur = 0;
    p.x += p.dx*p.z;
    p.y += p.dy*p.z;
    p.swing += 0.008*p.z;
    if (p.x<-60) p.x = w+60;
    if (p.x>w+60) p.x = -60;
    if (p.y<-60) p.y = h+60;
    if (p.y>h+60) p.y = -60;
  }
  requestAnimationFrame(render);
}
render();
