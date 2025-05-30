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
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
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