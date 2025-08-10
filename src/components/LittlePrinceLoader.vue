<template>
  <div class="lp-loader">
    <div class="lp-stars"></div>
    <div class="lp-star-gather">
      <div
        v-for="(s, i) in starLights"
        :key="i"
        class="lp-light"
        :style="{
          '--left': `${s.left}px`,
          '--top': `${s.top}px`,
          '--delay': `${s.delay}s`,
          '--color': s.color,
          '--blur': `${s.blur}px`,
          '--opacity': s.opacity,
        }"
      ></div>
      <div class="lp-star-spinner">
        <i class="fas fa-star"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const starLights = ref([]);

// 점 개수 애니메이션
const dots = ref('');
let dotTimer = null;

onMounted(() => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  starLights.value = Array.from({ length: 20 }).map(() => ({
    left: Math.random() * w,
    top: Math.random() * h - h / 2,
    delay: Math.random() * 1.2,
    color: `hsl(${50 + Math.random() * 20}, 100%, ${70 + Math.random() * 20}%)`,
    blur: 0.5 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.7,
  }));

  let count = 1;
  dotTimer = setInterval(() => {
    dots.value = '.'.repeat(count);
    count = count % 3 + 1;
  }, 500);
});

onBeforeUnmount(() => {
  if (dotTimer) clearInterval(dotTimer);
});
</script>

<style scoped>
.lp-loader {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: linear-gradient(135deg, #1a1b4b 0%, #4a1942 100%);
  display: block;
  transition: opacity 0.4s;
}
.lp-stars {
  position: absolute;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #ffd700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #ffd700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 50px 160px, #ffd700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 90px 40px, #ffd700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 130px 80px, #ffd700, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: twinkle 5s infinite;
  z-index: 0;
}
.lp-star-gather {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  margin-bottom: 0;
  display: block;
  pointer-events: none;
  z-index: 1;
}
.lp-star-spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.lp-star-spinner i {
  font-size: 3.8rem;
  color: #fffbe0;
  animation: spin 1.2s linear infinite;
  filter: drop-shadow(0 0 24px #fffbe0) drop-shadow(0 0 48px #ffe87c) drop-shadow(0 0 80px #fffad1);
  text-shadow:
    0 0 16px #fffbe0,
    0 0 32px #ffe87c,
    0 0 64px #fffad1;
}
.lp-light {
  position: absolute;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color, #ffe87c) 60%, transparent 100%);
  opacity: var(--opacity, 0.7);
  filter: blur(var(--blur, 1.5px));
  z-index: 1;
  animation: gather-light 1.2s infinite;
  left: var(--left);
  top: calc(50vh + var(--top));
  animation-delay: var(--delay);
  /* 트레일 효과 */
  box-shadow:
    0 0 8px 2px var(--color, #ffe87c),
    0 0 16px 4px var(--color, #ffe87c33);
}
@keyframes gather-light {
  0% {
    opacity: var(--opacity, 0.7);
    transform: scale(1) translate(0, 0);
    filter: blur(var(--blur, 1.5px));
  }
  60% {
    opacity: 1;
    transform: scale(1.2) translate(0, 0);
    filter: blur(0.5px);
  }
  80% {
    opacity: 0.8;
    transform: scale(0.7) translate(-50%, -50%);
    left: 50%; top: 50%;
    filter: blur(0.2px);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%);
    left: 50%; top: 50%;
    filter: blur(0);
  }
}
@keyframes twinkle {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
</style> 