<template>
  <LittlePrinceLayout>
    <div class="blog-detail-page">
      <div class="container">
        <div v-if="post" class="blog-post">
          <div class="post-header">
            <h1 class="title">{{ post.title }}</h1>
            <div class="post-meta">
              <span class="author">{{ post.author }}</span>
              <span class="date">{{ formatDate(post.date) }}</span>
              <span class="reading-time">{{ post.readingTime }}분 읽기</span>
            </div>
            <div class="tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <img :src="post.image" :alt="post.title" class="post-image" />
          <div class="post-content" v-html="post.content"></div>
          
          <div class="post-navigation">
            <router-link 
              v-if="post.prevPost" 
              :to="'/blog/' + post.prevPost" 
              class="nav-link prev"
            >
              <span class="nav-label">이전 글</span>
              <span class="nav-title">{{ post.prevPost }}</span>
            </router-link>
            <div v-else class="nav-link prev disabled"></div>
            
            <router-link 
              v-if="post.nextPost" 
              :to="'/blog/' + post.nextPost" 
              class="nav-link next"
            >
              <span class="nav-label">다음 글</span>
              <span class="nav-title">{{ post.nextPost }}</span>
            </router-link>
            <div v-else class="nav-link next disabled"></div>
          </div>
        </div>
        <div v-else class="loading">
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  </LittlePrinceLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LittlePrinceLayout from '../layouts/LittlePrinceLayout.vue';
import { getBlogPost } from '../blog';
import type { BlogPost } from '../blog/types';

const route = useRoute();
const post = ref<BlogPost | null>(null);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(async () => {
  const postId = route.params.id as string;
  post.value = await getBlogPost(postId);
});
</script>

<style lang="scss" scoped>
.blog-detail-page {
  padding: 2rem;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  .container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(30, 24, 60, 0.7);
    border-radius: 2rem;
    padding: 2rem;
    box-shadow: 0 8px 32px 0 #00000044;
  }

  .blog-post {
    .post-header {
      margin-bottom: 2rem;
      text-align: center;

      .title {
        color: #ffe87c;
        font-family: 'DXLittlePrince', 'Playfair Display', serif;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-shadow: 0 0 12px #ffe87c88;
      }

      .post-meta {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
        color: #fffbe6;
        font-size: 1rem;
        opacity: 0.8;
      }

      .tags {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;

        .tag {
          background: rgba(255, 232, 124, 0.1);
          color: #ffe87c;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.9rem;
          border: 1px solid rgba(255, 232, 124, 0.2);
        }
      }
    }

    .post-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 1rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }

    .post-content {
      color: #fffbe6;
      line-height: 1.8;
      font-size: 1.1rem;

      :deep(h2) {
        color: #ffe87c;
        font-size: 1.8rem;
        margin: 2rem 0 1rem;
        text-shadow: 0 0 8px #ffe87c44;
      }

      :deep(h3) {
        color: #ffe87c;
        font-size: 1.5rem;
        margin: 1.5rem 0 1rem;
      }

      :deep(p) {
        margin-bottom: 1.5rem;
      }

      :deep(code) {
        background: rgba(255, 232, 124, 0.1);
        color: #ffe87c;
        padding: 0.2rem 0.4rem;
        border-radius: 0.3rem;
        font-family: monospace;
      }

      :deep(pre) {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;

        code {
          background: none;
          padding: 0;
        }
      }

      :deep(blockquote) {
        border-left: 4px solid #ffe87c;
        margin: 1.5rem 0;
        padding: 1rem 1.5rem;
        background: rgba(255, 232, 124, 0.1);
        border-radius: 0 0.5rem 0.5rem 0;
      }
    }

    .post-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 232, 124, 0.2);

      .nav-link {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        padding: 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
        max-width: 45%;

        &.prev {
          text-align: left;
        }

        &.next {
          text-align: right;
        }

        &:not(.disabled):hover {
          background: rgba(255, 232, 124, 0.1);
          border-color: rgba(255, 232, 124, 0.5);
        }

        .nav-label {
          color: #ffe87c;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .nav-title {
          color: #fffbe6;
          font-size: 1rem;
        }

        &.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 232, 124, 0.3);
      border-radius: 50%;
      border-top-color: #ffe87c;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .blog-detail-page {
    padding: 1rem;
    
    .container {
      padding: 1.5rem;
    }

    .blog-post {
      .post-header {
        .title {
          font-size: 2rem;
        }
      }

      .post-image {
        height: 300px;
      }

      .post-content {
        font-size: 1rem;
      }

      .post-navigation {
        flex-direction: column;
        gap: 1rem;

        .nav-link {
          max-width: 100%;
        }
      }
    }
  }
}
</style> 