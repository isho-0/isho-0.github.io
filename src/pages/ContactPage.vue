<template>
  <LittlePrinceLayout>
    <div class="contact-content">
      <div class="contact-title">"Hello, World!"</div>
      <div class="contact-btns">
        <a href="https://github.com/your-github" target="_blank" class="contact-btn" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://instagram.com/your-instagram" target="_blank" class="contact-btn" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://discord.com/users/your-discord-id" target="_blank" class="contact-btn" aria-label="Discord">
          <i class="fab fa-discord"></i>
        </a>
      </div>
    </div>
  </LittlePrinceLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import LittlePrinceLayout from '../layouts/LittlePrinceLayout.vue';

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

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const onSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
}
</script>

<style lang="scss" scoped>
.contact-content {
  position: relative;
  z-index: 1;
  background: rgba(30, 24, 60, 0.7);
  border-radius: 2rem;
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  box-shadow: 0 8px 32px 0 #00000044;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
}
.contact-title {
  font-family: 'DXLittlePrince', 'Playfair Display', serif;
  color: #ffe87c;
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  text-shadow: 0 0 12px #ffe87c88;
  letter-spacing: 0.05em;
  text-align: center;
}
.contact-btns {
  display: flex;
  gap: 2.5rem;
}
.contact-btn {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #ffe87c;
  box-shadow: 0 0 16px 2px #ffe87c44, 0 0 32px 8px #fffbe055;
  transition: transform 0.2s, box-shadow 0.2s, color 0.2s;
  text-decoration: none;
}
.contact-btn:hover {
  transform: scale(1.13) rotate(-8deg);
  color: #fffbe0;
  box-shadow: 0 0 32px 8px #ffe87c99, 0 0 64px 16px #fffbe088;
}
@media (max-width: 600px) {
  .contact-content {
    padding: 2rem 1rem 1.5rem 1rem;
  }
  .contact-title {
    font-size: 1.1rem;
  }
  .contact-btn {
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
  }
  .contact-btns {
    gap: 1.2rem;
  }
}
</style> 