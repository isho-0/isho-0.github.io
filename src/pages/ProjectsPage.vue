<template>
  <div class="projects-page">
    <div class="container">
      <h1 class="title">My Stars</h1>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <img :src="project.image" :alt="project.title" class="project-image" />
          <div class="project-content">
            <h2>{{ project.title }}</h2>
            <p class="description">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" target="_blank" rel="noopener" class="project-link">
                <i class="fab fa-github"></i> View Code
              </a>
              <a :href="project.demo" target="_blank" rel="noopener" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'The Little Prince\'s Garden',
    description: 'A virtual garden where users can grow and take care of their own roses, inspired by the Little Prince\'s beloved flower.',
    image: 'https://via.placeholder.com/600x400',
    technologies: ['Vue.js', 'TypeScript', 'Node.js'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'Star Map Explorer',
    description: 'Interactive star map that lets users explore different planets and asteroids, just like the Little Prince\'s journey.',
    image: 'https://via.placeholder.com/600x400',
    technologies: ['React', 'Three.js', 'WebGL'],
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'Desert Compass',
    description: 'A navigation tool that helps travelers find their way in the desert, dedicated to the pilot from the story.',
    image: 'https://via.placeholder.com/600x400',
    technologies: ['React Native', 'Maps API', 'GPS'],
    github: '#',
    demo: '#'
  }
]
</script>

<style lang="scss" scoped>
.projects-page {
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f5f5;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .title {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-family: 'Playfair Display', serif;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    .project-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .project-content {
        padding: 1.5rem;

        h2 {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;

          .tech-tag {
            background: #f0f0f0;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.9rem;
            color: #666;
          }
        }

        .project-links {
          display: flex;
          gap: 1rem;

          .project-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #4a90e2;
            text-decoration: none;
            font-weight: 500;

            &:hover {
              text-decoration: underline;
            }

            i {
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  }
}
</style> 