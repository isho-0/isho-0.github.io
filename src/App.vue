<template>
  <div id="app" class="global-bg">
    <LittlePrinceLoader v-if="isRouteLoading" />
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import LittlePrinceLoader from './components/LittlePrinceLoader.vue';

const isRouteLoading = ref(false);
const router = useRouter();
let timeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  router.beforeEach((to, from, next) => {
    isRouteLoading.value = true;
    next();
  });
  router.afterEach(() => {
    // 부드러운 전환을 위해 약간의 딜레이 후 로딩 해제
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      isRouteLoading.value = false;
    }, 700);
  });
});

onUnmounted(() => {
  if (timeout) clearTimeout(timeout);
});
</script>

<style lang="scss">
@font-face {
  font-family: 'DXLittlePrince';
  src: url('/fonts/DXLittlePrince.woff2') format('woff2'),
       url('/fonts/DXLittlePrince.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#app {
  font-family: 'DXLittlePrince', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

// 숫자와 특수문자를 위한 대체 폰트 설정
.use-system-font {
  font-family: 'Arial', sans-serif;
}

.global-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1b4b 0%, #4a1942 100%);
}
body {
  background: linear-gradient(135deg, #1a1b4b 0%, #4a1942 100%) !important;
}
</style>