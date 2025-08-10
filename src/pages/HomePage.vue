<template>
  <div class="home-page">
    <div class="stars"></div>
    <div class="shooting-stars"></div>
    <div class="container">
      <div class="content">
        <div class="hero-section">
          <div class="prince-image">
            <div class="flip-container">
              <div class="flipper">
                <img src="/images/little-prince.jpg" alt="The Little Prince and Fox" class="main-image front" />
                <img src="/images/rose-flower.jpg" alt="Rose Flower" class="main-image back" />
              </div>
            </div>
          </div>
          <div class="quote-section">
            <h1 class="title quote-text">
              <span class="quote-line left-align">"너의 장미꽃이 그토록 소중한 것은</span>
              <span class="quote-line right-align">그 꽃을 위해 네가 공들인 그 시간 때문이야."</span>
            </h1>
            <p class="subtitle">
              좋아하는 것에 시간을 쏟을 때, 그것은 나만의 특별한 이야기가 됩니다.<br>
              이 작은 별 안에, 내가 사랑하고 꿈꾸는 것들을 하나씩 쌓아갑니다.<br>
              오늘도 소중한 시간을 담아, 나만의 장미꽃을 키워갑니다.
            </p>
            <div class="navigation-wrapper">
              <div class="navigation-cards" ref="cardContainer">
                <div class="cards-track" 
                     :class="{ 'no-transition': !isTransitioning }" 
                     :style="{ transform: `translateX(${translateX}px)` }">
                  <div v-for="(card, index) in navigationCards" 
                       :key="card.title + index"
                       class="nav-card"
                       :class="{ 'active': currentIndex === index }"
                       @click="handleCardClick(index)">
                    <i :class="card.icon"></i>
                    <span>{{ card.title }}</span>
                    <p>{{ card.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cardContainer = ref<HTMLElement | null>(null);

const baseCards = [
  {
    title: 'About Me',
    description: '나에 대해서',
    icon: 'fas fa-user',
    path: '/about'
  },
  {
    title: 'My Blog',
    description: '나의 블로그',
    icon: 'fas fa-book-open',
    path: '/blog'
  },
  {
    title: 'My Projects',
    description: '나의 프로젝트',
    icon: 'fas fa-star',
    path: '/projects'
  },
  {
    title: 'Connect Me',
    description: '연락하기',
    icon: 'fas fa-paper-plane',
    path: '/contact'
  }
];

const navigationCards = ref([...baseCards, ...baseCards, ...baseCards]); // 3배로 복제
const currentIndex = ref(baseCards.length + 2); // 가운데 세트의 'My Projects'
const translateX = ref(0);
const isTransitioning = ref(true);
const cardWidth = 250;
const gap = 20;

const updateTranslateX = (index: number) => {
  if (cardContainer.value) {
    const containerWidth = cardContainer.value.offsetWidth || window.innerWidth;
    const centerOffset = (containerWidth / 2) - (cardWidth / 2);
    translateX.value = centerOffset - (index * (cardWidth + gap));
  }
};

const resetCardsToCenter = () => {
  isTransitioning.value = false;
  // 현재 인덱스가 마지막 세트에 있을 경우
  if (currentIndex.value >= baseCards.length * 2) {
    currentIndex.value = currentIndex.value - baseCards.length;
  }
  // 현재 인덱스가 첫 번째 세트에 있을 경우
  else if (currentIndex.value < baseCards.length) {
    currentIndex.value = currentIndex.value + baseCards.length;
  }
  updateTranslateX(currentIndex.value);
  
  // requestAnimationFrame을 사용하여 DOM 업데이트를 보장
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isTransitioning.value = true;
    });
  });
};

const handleCardClick = (index: number) => {
  if (currentIndex.value === index) {
    // 현재 활성화된 카드를 클릭하면 해당 페이지로 이동
    const actualIndex = index % baseCards.length;
    router.push(baseCards[actualIndex].path);
  } else {
    currentIndex.value = index;
    updateTranslateX(index);
    // 트랜지션이 끝나면 카드 위치 리셋
    setTimeout(resetCardsToCenter, 500);
  }
};

const handleResize = () => {
  updateTranslateX(currentIndex.value);
};

onMounted(() => {
  setTimeout(() => {
    updateTranslateX(currentIndex.value);
  }, 0);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1b4b 0%, #4a1942 100%);
  position: relative;
  overflow: hidden;

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #ffd700, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #ffd700, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 50px 160px, #ffd700, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 40px, #ffd700, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #ffd700, rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
    animation: twinkle 5s infinite;
  }

  .shooting-stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-45deg);
    
    &::before, &::after {
      content: "";
      position: absolute;
      width: 150px;
      height: 2px;
      background: linear-gradient(90deg, #ffd700, transparent);
      animation: shooting-star 3s infinite ease-in;
    }

    &::before {
      top: 10%;
      right: 0;
      animation-delay: 0s;
    }

    &::after {
      top: 30%;
      right: -50px;
      animation-delay: 1.5s;
    }
  }

  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    z-index: 1;
  }

  .content {
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 4rem);
    justify-content: space-between;
  }

  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    flex: 1;

    .quote-section {
      margin-top: 2rem;
    }

    .prince-image {
      width: 100%;
      max-width: 520px;
      height: 480px;
      margin: 0 auto;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 20px;
        background: radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0) 70%);
        filter: blur(5px);
      }

      .flip-container, .flipper {
        width: 100%;
        height: 460px;
        max-width: 460px;
        position: relative;
      }
      .flipper {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
        transform-style: preserve-3d;
      }
      .main-image {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        image-rendering: -webkit-optimize-contrast;
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        transition: box-shadow 0.3s;
        object-fit: cover;
        object-position: center;
      }
      .front {
        z-index: 2;
      }
      .back {
        transform: rotateY(180deg);
        z-index: 1;
      }
      .flip-container:hover .flipper {
        transform: rotateY(180deg);
      }
    }
  }

  .title {
    font-size: 2rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;
    font-family: 'DXLittlePrince', 'Playfair Display', serif;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .quote-text {
    font-weight: 700;
    color: #FFE87C;
    text-shadow: 0 0 10px rgba(255, 232, 124, 0.3),
                 0 0 20px rgba(255, 232, 124, 0.2),
                 0 0 30px rgba(255, 232, 124, 0.1);
    letter-spacing: 0.5px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: left;
    width: 100%;
    max-width: 600px;

    .quote-line {
      display: block;
      width: 100%;
      margin: 0;
    }
    .left-align {
      text-align: left;
    }
    .right-align {
      text-align: right;
      margin-top: 0.5rem;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-style: italic;
    text-align: center;
  }

  .navigation-wrapper {
    position: relative;
    margin-top: 2rem;
    padding: 0;
    width: 100%;
    overflow: hidden;
  }

  .navigation-cards {
    position: relative;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    
    .cards-track {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      width: 100%;
      
      &.no-transition {
        transition: none !important;
      }
    }

    .nav-card {
      flex: 0 0 250px;
      background: rgba(255, 215, 0, 0.1);
      backdrop-filter: blur(10px);
      padding: 1rem;
      border-radius: 12px;
      text-decoration: none;
      color: #fff;
      transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease, border-color 0.3s ease;
      border: 1px solid rgba(255, 215, 0, 0.2);
      cursor: pointer;
      transform: scale(0.95);
      opacity: 0.8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &.active {
        transform: scale(1);
        opacity: 1;
        background: rgba(255, 215, 0, 0.2);
        border-color: rgba(255, 215, 0, 0.4);
      }

      &:hover {
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      }

      i {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #ffd700;
        display: block;
        text-align: center;
      }

      span {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
        text-align: center;
      }

      p {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.4;
        text-align: center;
      }
    }
  }
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

@media (min-width: 768px) {
  .hero-section {
    flex-direction: row !important;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4rem;
    padding: 2rem;
    padding-top: 0;

    .quote-section {
      flex: 1;
      text-align: left;
      margin-top: 0 !important;
      padding-top: 2rem;
    }

    .prince-image {
      flex: 0 0 30%;
      margin-top: 4rem;
    }
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    text-align: center;
  }

  .quote-text {
    align-items: flex-start;
    text-align: left;

    .quote-line {
      &:last-child {
        margin-left: 3rem;
      }
    }
  }
}
</style> 