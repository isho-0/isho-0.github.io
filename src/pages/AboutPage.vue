<template>
  <LittlePrinceLayout>
    <div class="container">
      <div class="about-hero">
        <img class="about-hero-img" src="/images/profile-image.jpg" alt="어린왕자와 별" />
        <div class="about-hero-quote">
          <h1>“가장 중요한 것은 눈에 보이지 않아.”</h1>
          <p class="quote-author">- 어린왕자</p>
        </div>
      </div>
      <div class="about-intro">
        <p>
          안녕하세요! 저는 <span class="highlight">별을 사랑하는 개발자</span> 이상호입니다.<br>
          어린왕자가 자신의 별과 장미를 소중히 아꼈듯, 저도 저만의 별(가치)과 장미(프로젝트)를 정성껏 가꾸고 있습니다.<br>
          <br>
          <span class="highlight">코드 한 줄, 한 줄</span>에 마음을 담아, 세상에 따뜻함과 영감을 전하고 싶습니다.<br>
          <br>
          <span class="highlight">"길들인다는 건, 서로에게 특별해진다는 거야."</span><br>
          개발 역시 사람과 기술, 그리고 나만의 이야기를 길들이는 과정이라 믿습니다.<br>
          오늘도 나만의 작은 별에서, 새로운 꿈을 그리고 있습니다.<br>
          <br>
          저는 <span class="highlight">소프트웨어학과를 졸업</span>하고, <span class="highlight">C++ 개발자</span>로 더 넓은 우주를 향해 도전하고 있습니다.<br>
          특히, C++ 기반 알고리즘 최적화 및 시스템 프로그래밍 프로젝트를 수행하며, 깊이 있는 실력을 쌓아가고 있습니다.<br>
          <br>
          <span class="highlight">별빛처럼 빛나는 여정을 지켜봐주세요.</span>
        </p>
      </div>
    </div>
  </LittlePrinceLayout>
</template>

<script setup lang="ts">
import LittlePrinceLayout from '../layouts/LittlePrinceLayout.vue';
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: transparent;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(26,27,75,0.15);
}
.about-hero {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 180px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 2.5rem;
  position: relative;
}
.about-hero-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 24px rgba(255,232,124,0.25);
  border: 4px solid #fffcf1;
  background: #fff540;
  flex-shrink: 0;
  margin-right: 0;
}
.about-hero-quote {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  text-align: center;
  h1 {
    font-size: 1.5rem;
    color: #ffe87c;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(255,232,124,0.3);
    text-align: center;
    margin-left: 0;
    max-width: 100%;
  }
  .quote-author {
    color: #ffd700;
    font-size: 1rem;
    font-style: italic;
    text-align: right;
    display: block;
    margin-top: 0.5rem;
    width: 100%;
    max-width: 100%;
  }
}
.about-intro {
  background: rgba(30,24,60,0.85);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 12px rgba(255,232,124,0.08);
  font-size: 1.15rem;
  line-height: 1.4;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 4px #00000055;
  .highlight {
    color: #ffe87c;
    font-weight: bold;
    text-shadow: 0 1px 6px #ffe87c55;
  }
}
@media (max-width: 768px) {
  .about-hero {
    flex-direction: column;
    align-items: center;
    min-height: unset;
  }
  .about-hero-img {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .about-hero-quote {
    max-width: 100%;
  }
}
</style> 