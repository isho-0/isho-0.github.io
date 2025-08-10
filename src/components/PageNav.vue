<template>
  <div class="page-nav">
    <div class="nav-links">
      <button :class="{active: isCurrent('/about')}" @click="goTo('/about')">About</button>
      <span class="nav-sep"></span>
      <button :class="{active: isCurrent('/blog')}" @click="goTo('/blog')">Blog</button>
      <span class="nav-sep"></span>
      <button class="nav-home" @click="goHome">
        <i class="fas fa-home"></i>
      </button>
      <span class="nav-sep"></span>
      <button :class="{active: isCurrent('/projects')}" @click="goTo('/projects')">Projects</button>
      <span class="nav-sep"></span>
      <button :class="{active: isCurrent('/contact')}" @click="goTo('/contact')">Contact</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

function goHome() {
  router.push('/');
}
function goTo(path: string) {
  if (route.path !== path) router.push(path);
}
function isCurrent(path: string) {
  return route.path === path;
}
</script>

<style scoped>
.page-nav {
  background: rgba(30,24,60,0.85);
  box-shadow: 0 4px 24px 0 #00000044;
  border-radius: 1.2rem;
  margin: 1rem auto 1.5rem auto;
  max-width: 900px;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 10;
  position: relative;
  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    button,
    .nav-home {
      width: 120px;
      min-width: 120px;
      max-width: 120px;
      justify-content: center;
      text-align: center;
      display: flex;
      align-items: center;
      background: transparent;
      border: none;
      color: #fffbe6;
      font-family: inherit;
      font-size: 1rem;
      padding: 0.3rem 1.3rem;
      border-radius: 7px;
      cursor: pointer;
      position: relative;
      transition: color 0.2s, text-shadow 0.2s;
      &.active, &:hover {
        color: #ffe87c;
        text-shadow: 0 0 8px #ffe87c, 0 0 16px #ffe87c88;
        background: transparent;
      }
      &::after, &.active::after {
        display: none !important;
      }
    }
  }
  .nav-sep {
    display: inline-block;
    width: 1px;
    height: 1.5em;
    background: #ffe87c;
    margin: 0 0.5rem;
    vertical-align: middle;
    border-radius: 1px;
    opacity: 0.8;
  }
  .nav-home {
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #fffbe6;
    cursor: pointer;
    transition: color 0.2s, text-shadow 0.2s;
    &:hover, &.active {
      color: #ffe87c;
      text-shadow: 0 0 8px #ffe87c, 0 0 16px #ffe87c88;
      background: transparent;
    }
    &::after, &.active::after {
      display: none !important;
    }
  }
}
@media (max-width: 600px) {
  .nav-links button,
  .nav-home {
    width: 90px;
    min-width: 90px;
    max-width: 90px;
    font-size: 0.95rem;
  }
}
</style> 