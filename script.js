// ── Dados das fotos ──────────────────────────
const fotos = [
  { src: "imagem01.jpg", legenda: "Foto 1 💕" },
  { src: "imagem02.jpg", legenda: "Foto 2 🌸" },
  { src: "imagem03.jpg", legenda: "Foto 3 ✨" },
  { src: "imagem04.jpg", legenda: "Foto 4 💖" },
  { src: "imagem05.jpg", legenda: "Foto 5 🌷" },
  { src: "imagem06.jpg", legenda: "Foto 6 🥰" },
  { src: "imagem07.jpg", legenda: "Foto 7 💜" },
  { src: "imagem08.jpg", legenda: "Foto 8 🎀" },
  { src: "imagem09.jpg", legenda: "Foto 9 🌟" },
];

// ── Memes textuais (sem imagem externa) ──────
const memesTexto = [
  "💅 A Mila acorda linda. Biologia não explica, é só ela mesmo.",
  "🧠 Q.I. da Mila: 9000. Q.I. do namorado: suficiente pra saber que ela é incrível.",
  "📱 Ela tá no celular do namorado. Não como contato, como plano de fundo kkk",
  "☕ A Mila na segunda-feira vs qualquer outra pessoa na sexta = ela sempre ganha.",
  "🚀 NASA: 'Não encontramos vida perfeita no espaço.' Mila: 'Oi?'",
  "💃 Modo da Mila: ligado 24h, 7 dias por semana, mesmo dormindo.",
  "🌍 O mundo era bom. Aí a Mila apareceu e ficou MUITO melhor.",
  "🏆 Troféu de melhor pessoa do mundo: entregue pessoalmente para Camila Ferreira de Souza.",
  "🎭 Atriz? Não. Ela é real e melhor que qualquer personagem de série.",
  "💘 Algoritmo do amor: if (pessoa == Mila) return ❤️❤️❤️;",
];

// ── Frases surpresa ──────────────────────────
const surpresas = [
  "🎊 SURPRESA! Você é INCRÍVEL Mila!!!",
  "💥 BOOM! Mais um lembrete: a Mila é a melhor do mundo!",
  "🎉 Parabéns! Você clicou e ganhou... esse lembrete de que é MARAVILHOSA!",
  "🚨 ALERTA: Mila detectada sendo perfeita de novo! 🚨",
  "🏅 Medalha de ouro em: existir e ser incrível!",
];

// ── Estado ───────────────────────────────────
let lightboxIndex = 0;
let surpresaCount = 0;
let confettiAtivo = false;

// ── INIT ─────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  construirGaleria();
  easterEggCoracao();
});

// ── Landing → Album ──────────────────────────
function entrar() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("album").classList.remove("hidden");
  dispararConfetti(120);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Easter egg do coração na landing ─────────
function easterEggCoracao() {
  const coracao = document.getElementById("coracao-easter");
  let clicks = 0;
  coracao.addEventListener("click", () => {
    clicks++;
    coracao.style.transform = `scale(${1 + clicks * 0.2}) rotate(${clicks * 15}deg)`;
    if (clicks >= 5) {
      coracao.textContent = "💥";
      setTimeout(() => {
        coracao.textContent = "❤️";
        coracao.style.transform = "scale(1) rotate(0deg)";
        clicks = 0;
      }, 500);
    }
  });
}

// ── Construir galeria ─────────────────────────
function construirGaleria() {
  const galeria = document.getElementById("galeria");
  fotos.forEach((foto, i) => {
    const card = document.createElement("div");
    card.className = "foto-card";
    card.innerHTML = `
      <img src="${foto.src}" alt="Foto ${i + 1}" loading="lazy" onerror="this.src='https://placehold.co/400x300/ff6b9d/white?text=Foto+${i+1}+%F0%9F%92%95'" />
      <div class="foto-overlay"><p>${foto.legenda}</p></div>
      <div class="foto-numero">${i + 1}</div>
    `;
    card.addEventListener("click", () => abrirLightbox(i));
    galeria.appendChild(card);
  });
}

// ── LIGHTBOX ─────────────────────────────────
function abrirLightbox(index) {
  lightboxIndex = index;
  atualizarLightbox();
  document.getElementById("lightbox").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function atualizarLightbox() {
  const foto = fotos[lightboxIndex];
  const img = document.getElementById("lightbox-img");
  img.src = foto.src;
  img.onerror = () => {
    img.src = `https://placehold.co/600x450/ff6b9d/white?text=Foto+${lightboxIndex+1}+💕`;
  };
  document.getElementById("lightbox-caption").textContent = foto.legenda;
}

function fecharLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
  document.body.style.overflow = "";
}

function navLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + fotos.length) % fotos.length;
  atualizarLightbox();
}

// teclado
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lightbox").classList.contains("hidden")) {
    if (e.key === "ArrowLeft") navLightbox(-1);
    if (e.key === "ArrowRight") navLightbox(1);
    if (e.key === "Escape") fecharLightbox();
  }
  if (!document.getElementById("meme-popup").classList.contains("hidden")) {
    if (e.key === "Escape") fecharPopup();
  }
});

// ── MEME BANNER ──────────────────────────────
let memeIndex = 0;
function trocarMeme() {
  const el = document.getElementById("meme-texto");
  el.style.opacity = "0";
  setTimeout(() => {
    memeIndex = (memeIndex + 1) % memesTexto.length;
    el.textContent = memesTexto[memeIndex];
    el.style.opacity = "1";
    el.style.transition = "opacity 0.4s";
  }, 200);
}

// ── MEME POPUP ───────────────────────────────
function abrirMemePopup(texto, imgSrc) {
  const popup = document.getElementById("meme-popup");
  const img = document.getElementById("popup-img");
  const txt = document.getElementById("popup-texto");

  if (imgSrc) {
    img.src = imgSrc;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }
  txt.textContent = texto;
  popup.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharPopup() {
  document.getElementById("meme-popup").classList.add("hidden");
  document.body.style.overflow = "";
}

// ── MENSAGEM SECRETA ─────────────────────────
function revelarMensagem() {
  const div = document.getElementById("mensagem-revealed");
  const btn = document.querySelector(".btn-mensagem");
  div.classList.remove("hidden");
  btn.textContent = "😭💕";
  btn.disabled = true;
  dispararConfetti(80);

  const chuva = document.getElementById("emoji-chuva");
  const emojis = ["💕", "🌸", "💖", "✨", "🥰", "💜", "🌷", "❤️"];
  chuva.textContent = emojis.sort(() => Math.random() - 0.5).slice(0, 12).join(" ");
}

// ── QUIZ ─────────────────────────────────────
function responderQuiz(tipo) {
  const resultado = document.getElementById("quiz-resultado");
  resultado.classList.remove("hidden");
  if (tipo === "certo") {
    resultado.textContent = "🎉 CORRETO! >DEUSAAA! Nem os instrumentos conseguem medir! kkk";
    dispararConfetti(60);
  } else {
    resultado.textContent = "❌ ERRADO! Vai lá e tenta de novo… (dica: a última opção não existe kkkk)";
    resultado.style.color = "#e74c3c";
    setTimeout(() => { resultado.style.color = ""; }, 1500);
  }
}

// ── BOTÃO SURPRESA ───────────────────────────
const frasesSurpresa = [
  { msg: "🎊 SURPRESA! Você é INCRÍVEL Mila!!!", confetti: true },
  { msg: "💥 BOOM! Mais um lembrete: a Mila é a melhor do mundo!", confetti: false },
  { msg: "🚨 ALERTA MÁXIMO: Mila detectada sendo perfeita de novo!", confetti: true },
  { msg: "🏅 Medalha de ouro em: existir e iluminar o dia de alguém!", confetti: false },
  { msg: "👑 Rainha detectada. Sistema reiniciado por excesso de perfeição.", confetti: true },
  { msg: "🤩 ERRO 404: Defeito não encontrado na Mila.", confetti: false },
  { msg: "✨ NÍVEL DESBLOQUEADO: Mila modo ultra instinto ativado!", confetti: true },
];

function surpresa() {
  const item = frasesSurpresa[surpresaCount % frasesSurpresa.length];
  surpresaCount++;

  const btn = document.getElementById("btn-surpresa");
  btn.textContent = item.msg;
  btn.style.fontSize = "0.95rem";

  if (item.confetti) dispararConfetti(100);

  if (surpresaCount >= 4) {
    setTimeout(() => {
      btn.textContent = "Ok você tá viciada né kkk mas tá bom 💕";
    }, 2000);
  }
}

// ── RATING ───────────────────────────────────
const fraseRating = {
  1: "1 estrela?! Calma, você errou o site. Isso aqui é álbum da Mila kkkk",
  2: "2 estrelas? 😤 Amigo, reavalia sua vida.",
  3: "3 estrelas? Mediano? Ela é EXCEPCIONAL. Tenta de novo.",
  4: "4 estrelas? Quase! Mas a Mila é 5/5. Correto.",
  5: "5 ESTRELAS! ⭐⭐⭐⭐⭐ A única nota possível! Você passou no teste! 🎉",
};

function avaliar(val) {
  const resultado = document.getElementById("rating-resultado");
  resultado.textContent = fraseRating[val];
  if (val === 5) dispararConfetti(90);

  // animar estrelas
  document.querySelectorAll(".estrela").forEach((e, i) => {
    e.style.filter = i < val ? "drop-shadow(0 0 6px gold)" : "grayscale(1) opacity(0.5)";
    e.style.transform = i < val ? "scale(1.2)" : "scale(1)";
  });
}

// ── CONFETTI ─────────────────────────────────
function dispararConfetti(count = 80) {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cores = ["#ff6b9d", "#a855f7", "#ffd700", "#ff4d4d", "#00d4aa", "#e879f9"];
  const particulas = [];

  for (let i = 0; i < count; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: cores[Math.floor(Math.random() * cores.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      sway: (Math.random() - 0.5) * 2,
    });
  }

  let frame = 0;
  const maxFrames = 120;

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.speed;
      p.x += p.sway;
      p.angle += p.spin;
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(animar);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animar();
}

// ── RESIZE canvas ────────────────────────────
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
