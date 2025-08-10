<template>
  <LittlePrinceLayout>
    <div class="blog-page">
      <!-- 왼쪽 사이드바: 프로필 및 카테고리 -->
      <div class="sidebar left-sidebar">
        <div class="profile">
          <img src="/images/profile-image.jpg" alt="이상호" class="profile-image" />
          <h2 class="profile-name">isho</h2>
        </div>
        <div class="categories">
          <div class="note-title">학습 노트</div>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <div class="category-header" @click="toggleCategory(category.id)">
                <span class="folder-icon">📁</span>
                {{ category.name }} <span class="count">({{ category.posts.length }})</span>
              </div>
              <ul v-show="isOpen(category.id)" class="post-list" :class="{ expanded: isOpen(category.id), collapsed: !isOpen(category.id) }">
                <li v-for="post in category.posts" :key="post.id" @click="goToPost(post.id)" :class="{ active: selectedPostId === post.id }">
                  <span class="file-icon">📄</span> {{ post.title }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- 중앙: 게시글 목록 -->
      <div class="main-content">
        <div class="container">
          <div class="search-bar">
            <span class="search-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input v-model="searchKeyword" type="text" placeholder="찾아보고자 하는 포스팅을 검색 해보세요" />
          </div>

          <div class="blog-grid">
            <div 
              v-for="post in filteredPosts" 
              :key="post.id" 
              class="blog-card"
            >
              <img :src="post.image" :alt="post.title" class="blog-image" />
              <div class="blog-content">
                <h3>{{ post.title }}</h3>
                <div class="post-meta">
                  <span class="date">{{ formatDate(post.date) }}</span>
                  <span class="reading-time">{{ post.readingTime }}분 읽기</span>
                </div>
                <p class="excerpt">{{ post.excerpt }}</p>
                <div class="tags">
                  <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <router-link :to="'/blog/' + post.id" class="read-more">Read More</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 사이드바: 목차 -->
      <div class="sidebar right-sidebar" v-if="route.name !== 'blog-detail'">
        <div class="popular-tags">
          <h3>인기 태그</h3>
          <div class="tags-list">
            <span v-for="tag in popularTags" :key="tag" class="tag" :class="{ active: selectedTags.includes(tag) }" @click="toggleTag(tag)">{{ tag }}</span>
          </div>
        </div>
        <div class="recent-posts">
          <h3>최근 게시글</h3>
          <ul>
            <li v-for="post in recentPosts" :key="post.id">
              <a @click.prevent="router.push('/blog/' + post.id)">{{ post.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="sidebar right-sidebar" v-else>
        <div class="table-of-contents">
          <h3>목차</h3>
          <ul>
            <li 
              v-for="(heading, index) in tableOfContents" 
              :key="index"
              :class="{ active: activeHeading === heading.id }"
              @click="scrollToHeading(heading.id)"
            >
              {{ heading.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </LittlePrinceLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LittlePrinceLayout from '../layouts/LittlePrinceLayout.vue';
import { getCategories, getBlogPost } from '../blog';
import type { BlogCategory, BlogPostMeta } from '../blog/types';

const route = useRoute();
const router = useRouter();
const categories = ref<BlogCategory[]>([]);
const selectedCategory = ref<string>('');
const selectedTags = ref<string[]>([]);
const currentPost = ref<any>(null);
const tableOfContents = ref<{ id: string; text: string }[]>([]);
const activeHeading = ref<string>('');
const openedCategory = ref<string | null>(null);
const searchKeyword = ref('');
const selectedPostId = ref<string | null>(null);

// 모든 태그 가져오기
const allTags = computed(() => {
  const tags = new Set<string>();
  categories.value.forEach(category => {
    category.posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
  });
  return Array.from(tags);
});

// 인기 태그 (상위 5개)
const popularTags = computed(() => {
  const tagCount: Record<string, number> = {};
  categories.value.forEach(category => {
    category.posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
  });
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);
});

// 최근 게시글 (최신순 5개)
const recentPosts = computed(() => {
  let posts: BlogPostMeta[] = [];
  categories.value.forEach(category => {
    posts = posts.concat(category.posts);
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
});

// 필터링된 게시글 목록
const filteredPosts = computed(() => {
  let posts: BlogPostMeta[] = [];
  if (selectedCategory.value) {
    const category = categories.value.find(c => c.id === selectedCategory.value);
    if (category) posts = category.posts;
  } else {
    categories.value.forEach(category => {
      posts = posts.concat(category.posts);
    });
  }
  if (selectedTags.value.length > 0) {
    posts = posts.filter(post => selectedTags.value.every(tag => post.tags.includes(tag)));
  }
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase();
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(kw) ||
      post.excerpt.toLowerCase().includes(kw) ||
      post.tags.some(tag => tag.toLowerCase().includes(kw))
    );
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// 카테고리 선택
const selectCategory = (categoryId: string) => {
  selectedCategory.value = selectedCategory.value === categoryId ? '' : categoryId;
};

// 태그 토글
const toggleTag = (tag: string) => {
  const idx = selectedTags.value.indexOf(tag);
  if (idx === -1) selectedTags.value.push(tag);
  else selectedTags.value.splice(idx, 1);
};

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 목차 생성
const generateTableOfContents = (content: string) => {
  const headings = content.match(/<h[2-3][^>]*>.*?<\/h[2-3]>/g) || [];
  return headings.map(heading => {
    const text = heading.replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().replace(/\s+/g, '-');
    return { id, text };
  });
};

// 목차 항목으로 스크롤
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeHeading.value = id;
  }
};

// 현재 보고 있는 게시글의 목차 업데이트
watch(() => route.params.id, async (newId) => {
  if (newId) {
    currentPost.value = await getBlogPost(newId as string);
    tableOfContents.value = generateTableOfContents(currentPost.value.content);
  } else {
    currentPost.value = null;
    tableOfContents.value = [];
  }
});

// 스크롤 이벤트로 현재 보고 있는 목차 항목 업데이트
const handleScroll = () => {
  const headings = tableOfContents.value.map(h => document.getElementById(h.id));
  const scrollPosition = window.scrollY;

  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i];
    if (heading && heading.offsetTop <= scrollPosition + 100) {
      activeHeading.value = tableOfContents.value[i].id;
      break;
    }
  }
};

const toggleCategory = (id: string) => {
  openedCategory.value = openedCategory.value === id ? null : id;
};

const goToPost = (id: string) => {
  selectedPostId.value = id;
  router.push('/blog/' + id);
};

const isOpen = (id: string) => openedCategory.value === id;

onMounted(async () => {
  categories.value = await getCategories();
  window.addEventListener('scroll', handleScroll);
  
  if (route.params.id) {
    currentPost.value = await getBlogPost(route.params.id as string);
    tableOfContents.value = generateTableOfContents(currentPost.value.content);
  }
});
</script>

<style lang="scss" scoped>
.blog-page {
  display: grid;
  grid-template-columns: 260px 1fr 260px;
  height: calc(100vh - 80px);
  width: 100vw;
  gap: 5px;
  background: transparent;

  .sidebar, .main-content {
    height: 100%;
    background: rgba(30, 24, 60, 0.7);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 #00000044;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .left-sidebar {
    margin-left: 2rem;
    align-items: center;
    color: #fffbe6;
    text-shadow: 0 1px 4px #00000055;
    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      .profile-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-bottom: 1rem;
        border: 2px solid rgba(255, 232, 124, 0.3);
      }
      .profile-name {
        color: #ffe87c;
        font-size: 1.5rem;
        text-shadow: 0 0 8px #ffe87c44;
        margin-bottom: 2rem;
      }
    }
    .categories {
      width: 100%;
      .note-title {
        color: #ffe87c;
        font-size: 1.1rem;
        text-align: center;
        margin-bottom: 1.2rem;
        letter-spacing: 0.05em;
        text-shadow: 0 1px 4px #00000055;
      }
      ul {
        list-style: none;
        padding: 0;
        width: 100%;
        li {
          .category-header {
            color: #fffbe6;
            text-shadow: 0 1px 4px #00000055;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            transition: background 0.2s;
            .folder-icon { margin-right: 0.5rem; }
            .count { color: #ffe87c; margin-left: 0.5rem; font-size: 0.95em; }
            &:hover { background: rgba(255, 232, 124, 0.08); }
          }
          .post-list {
            padding-left: 1.2rem;
            margin: 0.2rem 0 0.7rem 0;
            overflow: hidden;
            transform-origin: top;
            transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s, transform 0.4s cubic-bezier(0.4,0,0.2,1);
            &.expanded {
              max-height: 500px;
              opacity: 1;
              transform: translateY(0) scaleY(1);
            }
            &.collapsed {
              max-height: 0;
              opacity: 0;
              pointer-events: none;
              transform: translateY(-20px) scaleY(0.8);
            }
            li {
              transition: background 0.2s, color 0.2s;
              cursor: pointer;
              border-radius: 0.4rem;
              padding: 0.3rem 0.5rem;
              color: #ffe87c;
              text-shadow: 0 1px 4px #00000055;
              &:hover, &.active {
                background: rgba(255,232,124,0.13);
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

  .right-sidebar {
    margin-right: 2rem;
    gap: 2rem;
    .popular-tags {
      h3 { color: #ffe87c; margin-bottom: 1rem; font-size: 1.1rem; }
      .tags-list {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
        .tag {
          background: rgba(255, 232, 124, 0.1);
          color: #ffe87c;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          border: 1px solid rgba(255, 232, 124, 0.2);
          transition: all 0.2s;
          &:hover {
            background: rgba(255, 232, 124, 0.18);
          }
          &.active {
            background: rgba(255, 232, 124, 0.22);
            color: #ffe87c;
            border-color: rgba(255, 232, 124, 0.5);
            font-weight: 500;
            box-shadow: none;
          }
        }
      }
    }
    .recent-posts {
      h3 { color: #ffe87c; margin-bottom: 1rem; font-size: 1.1rem; }
      ul { list-style: none; padding: 0; }
      li { margin-bottom: 0.7rem; }
      a {
        color: #fffbe6;
        text-decoration: none;
        font-size: 0.97rem;
        &:hover { color: #ffe87c; text-decoration: underline; }
      }
    }
  }

  .main-content {
    width: 100%;
    overflow-y: auto;
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 #00000044;
    background: rgba(30, 24, 60, 0.7);
    max-width: 960px;
    margin: 0 auto;
    .container {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background: rgba(255,232,124,0.08);
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      margin-bottom: 2rem;
      input {
        flex: 1;
        background: transparent;
        border: none;
        color: #ffe87c;
        font-size: 1.1rem;
        outline: none;
        &::placeholder { color: rgba(255,232,124,0.5); }
      }
      .search-icon {
        margin-right: 0.7rem;
        color: #ffe87c;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
      }
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .blog-card {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid rgba(255, 232, 124, 0.2);

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 32px rgba(255, 232, 124, 0.2);
        }

        .blog-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid rgba(255, 232, 124, 0.2);
        }

        .blog-content {
          padding: 1.5rem;

          h3 {
            margin-bottom: 0.5rem;
            color: #ffe87c;
            font-size: 1.4rem;
            text-shadow: 0 0 8px #ffe87c44;
          }

          .post-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: #fffbe6;
            opacity: 0.8;
          }

          .excerpt {
            color: #fffbe6;
            margin-bottom: 1rem;
            line-height: 1.6;
            opacity: 0.9;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;

            .tag {
              background: rgba(255, 232, 124, 0.1);
              color: #ffe87c;
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.8rem;
              border: 1px solid rgba(255, 232, 124, 0.2);
            }
          }

          .read-more {
            display: inline-block;
            color: #ffe87c;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border: 1px solid rgba(255, 232, 124, 0.3);
            border-radius: 0.5rem;
            transition: all 0.3s ease;

            &:hover {
              background: rgba(255, 232, 124, 0.1);
              border-color: rgba(255, 232, 124, 0.5);
              box-shadow: 0 0 16px rgba(255, 232, 124, 0.2);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .blog-page {
    grid-template-columns: 220px 1fr;
    .right-sidebar { display: none; }
  }
}

@media (max-width: 768px) {
  .blog-page {
    grid-template-columns: 1fr;
    height: auto;
    .sidebar, .main-content { border-radius: 1rem; padding: 1.2rem; }
    .sidebar { position: static; margin-bottom: 1rem; height: auto; }
    .main-content { padding: 1.2rem; }
  }
}
</style> 