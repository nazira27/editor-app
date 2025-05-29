<template>
  <div class="page-view" v-if="page">
    <div class="page-content" v-html="page.content"></div>
  </div>
  <div v-else class="text-center py-5">
    <h2>Page not found</h2>
    <b-button variant="primary" to="/" class="mt-3">Go to Home</b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageView',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      page: null
    }
  },
  async created() {
    await this.loadPage()
  },
  methods: {
    ...mapActions(['fetchPageById']),
    async loadPage() {
      try {
        this.page = await this.fetchPageById(parseInt(this.id))
        if (this.page) {
          document.title = this.page.title
          this.updateMetaTags()
        }
      } catch (error) {
        console.error('Error loading page:', error)
      }
    },
    updateMetaTags() {
      // Update keywords meta tag
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', this.page.keywords || '')

      // Update description meta tag
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      // Use the first 160 characters of the content as description
      const description = this.page.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .slice(0, 160)
        .trim()
      metaDescription.setAttribute('content', description)
    }
  },
  watch: {
    id: {
      handler: 'loadPage',
      immediate: true
    }
  }
}
</script>

<style scoped>
.page-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-content {
  line-height: 1.6;
}

.page-content :deep(h1) {
  margin-bottom: 1rem;
}

.page-content :deep(p) {
  margin-bottom: 1rem;
}

.page-content :deep(ul),
.page-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}
</style> 