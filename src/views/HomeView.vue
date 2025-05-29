<template>
  <div class="home">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Pages</h1>
      <b-button variant="primary" to="/pages/new">Create New Page</b-button>
    </div>

    <b-table
      striped
      hover
      :items="pages"
      :fields="fields"
      responsive
    >
      <template #cell(title)="data">
        {{ data.item.title || 'Home Page' }}
      </template>

      <template #cell(slug)="data">
        {{ data.item.slug || '/' }}
      </template>

      <template #cell(updatedAt)="data">
        {{ formatDate(data.item.updatedAt) }}
      </template>

      <template #cell(actions)="data">
        <div class="actions">
          <b-button
            variant="info"
            size="sm"
            :to="'/view/' + data.item.id"
            class="mr-2"
            title="View"
          >
            <b-icon-eye></b-icon-eye>
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            :to="'/pages/edit/' + data.item.id"
            class="mr-2"
            title="Edit"
          >
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="confirmDelete(data.item)"
            title="Delete"
          >
            <b-icon-trash></b-icon-trash>
          </b-button>
        </div>
      </template>
    </b-table>

    <!-- Delete Confirmation Modal -->
    <b-modal
      v-model="showDeleteModal"
      title="Confirm Delete"
      @ok="handleDelete"
      ok-variant="danger"
      ok-title="Delete"
    >
      <p>Are you sure you want to delete "{{ selectedPage ? selectedPage.title : '' }}"?</p>
      <p class="text-danger mb-0">This action cannot be undone.</p>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return {
      fields: [
        { key: 'title', label: 'Title', sortable: true },
        { key: 'slug', label: 'URL', sortable: true },
        { key: 'updatedAt', label: 'Last Updated', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      showDeleteModal: false,
      selectedPage: null
    }
  },
  computed: {
    ...mapState(['pages'])
  },
  async created() {
    await this.fetchPages()
  },
  methods: {
    ...mapActions(['fetchPages', 'deletePage']),
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleString()
    },
    confirmDelete(page) {
      this.selectedPage = page
      this.showDeleteModal = true
    },
    async handleDelete() {
      try {
        await this.deletePage(this.selectedPage.id)
        this.$bvToast.toast('Page deleted successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true
        })
      } catch (error) {
        console.error('Error deleting page:', error)
        this.$bvToast.toast('Error deleting page', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      } finally {
        this.selectedPage = null
      }
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.actions {
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .actions .btn {
    padding: 0.25rem 0.5rem;
  }
}
</style> 