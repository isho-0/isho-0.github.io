<template>
  <div class="lp-layout-bg">
    <PageNav />
    <div class="lp-stars"></div>
    <div class="lp-shooting-stars"></div>
    <main class="lp-main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import PageNav from '../components/PageNav.vue';
</script>

<style scoped>
.lp-layout-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1a1b4b 0%, #4a1942 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
.lp-shooting-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: rotate(-45deg);
  z-index: 1;
}
.lp-shooting-stars::before, .lp-shooting-stars::after {
  content: "";
  position: absolute;
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, #ffd700, transparent);
  animation: shooting-star 3s infinite ease-in;
}
.lp-shooting-stars::before {
  top: 10%;
  right: 0;
  animation-delay: 0s;
}
.lp-shooting-stars::after {
  top: 30%;
  right: -50px;
  animation-delay: 1.5s;
}
@keyframes twinkle {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
@keyframes shooting-star {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
}
.lp-main-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 