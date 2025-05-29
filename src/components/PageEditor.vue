<template>
  <div class="page-editor">
    <b-form @submit.prevent="savePage">
      <b-form-group label="Title" label-for="title">
        <b-form-input
          id="title"
          v-model="form.title"
          required
          placeholder="Enter page title"
          @input="generateSlug"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="URL Slug" label-for="slug" description="Leave empty for home page">
        <b-form-input
          id="slug"
          v-model="form.slug"
          placeholder="Enter URL slug"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Meta Keywords" label-for="keywords" description="Separate keywords with commas">
        <b-form-input
          id="keywords"
          v-model="form.keywords"
          placeholder="Enter meta keywords"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Content" label-for="content">
        <rich-text-editor v-model="form.content" />
      </b-form-group>

      <div class="mt-3">
        <b-button type="submit" variant="primary" class="mr-2">Save Page</b-button>
        <b-button type="button" variant="secondary" @click="$router.push('/pages')">Cancel</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RichTextEditor from './RichTextEditor.vue'

export default {
  name: 'PageEditor',
  components: {
    RichTextEditor
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      form: {
        title: '',
        slug: '',
        keywords: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['pages'])
  },
  async created() {
    // If we're editing an existing page
    if (this.id) {
      try {
        // First ensure we have the pages loaded
        if (this.pages.length === 0) {
          await this.fetchPages()
        }
        // Find the page in our store
        const page = this.pages.find(p => p.id === parseInt(this.id))
        if (page) {
          // Set the form data with the existing page data
          this.form = { ...page }
        } else {
          // If page not found, show error and redirect
          this.$bvToast.toast('Page not found', {
            title: 'Error',
            variant: 'danger',
            solid: true
          })
          this.$router.push('/pages')
        }
      } catch (error) {
        console.error('Error loading page:', error)
        this.$bvToast.toast('Error loading page', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  methods: {
    ...mapActions(['createPage', 'updatePage', 'fetchPages']),
    generateSlug() {
      if (!this.form.slug && this.form.title) {
        this.form.slug = this.form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }
    },
    async savePage() {
      try {
        const pageData = { ...this.form }
        if (this.id) {
          await this.updatePage({ id: this.id, pageData })
          this.$bvToast.toast('Page updated successfully!', {
            title: 'Success',
            variant: 'success',
            solid: true
          })
        } else {
          await this.createPage(pageData)
          this.$bvToast.toast('Page created successfully!', {
            title: 'Success',
            variant: 'success',
            solid: true
          })
        }
        this.$router.push('/')
      } catch (error) {
        console.error('Error saving page:', error)
        this.$bvToast.toast('Error saving page', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>

<style scoped>
.page-editor {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> 