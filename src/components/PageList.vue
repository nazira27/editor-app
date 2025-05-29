<template>
  <div class="page-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Pages</h2>
      <b-button variant="primary" to="/pages/new">Create New Page</b-button>
    </div>

    <b-table
      striped
      hover
      :items="pages"
      :fields="fields"
    >
      <template #cell(title)="data">
        {{ data.item.title || 'Home Page' }}
      </template>

      <template #cell(slug)="data">
        {{ data.item.slug || '/' }}
      </template>

      <template #cell(actions)="data">
        <b-button-group size="sm">
          <b-button
            variant="primary"
            :to="'/pages/edit/' + data.item.id"
            title="Edit"
          >
            Edit
          </b-button>
          <b-button
            variant="danger"
            @click="confirmDelete(data.item)"
            title="Delete"
          >
            Delete
          </b-button>
          <b-button
            variant="info"
            :to="'/view/' + data.item.id"
            title="View"
          >
            View
          </b-button>
        </b-button-group>
      </template>
    </b-table>

    <b-modal
      v-model="showDeleteModal"
      title="Confirm Delete"
      @ok="handleDelete"
    >
      <p>Are you sure you want to delete "{{ selectedPage ? selectedPage.title : '' }}"?</p>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageList',
  data() {
    return {
      fields: [
        { key: 'title', label: 'Title', sortable: true },
        { key: 'slug', label: 'URL', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      showDeleteModal: false,
      selectedPage: null
    }
  },
  computed: {
    ...mapState(['pages'])
  },
  created() {
    this.fetchPages()
  },
  methods: {
    ...mapActions(['fetchPages', 'deletePage']),
    confirmDelete(page) {
      this.selectedPage = page
      this.showDeleteModal = true
    },
    async handleDelete() {
      if (this.selectedPage) {
        try {
          await this.deletePage(this.selectedPage.id)
          this.$bvToast.toast('Page deleted successfully!', {
            title: 'Success',
            variant: 'success',
            solid: true
          })
        } catch (error) {
          this.$bvToast.toast('Error deleting page', {
            title: 'Error',
            variant: 'danger',
            solid: true
          })
        }
      }
      this.selectedPage = null
    }
  }
}
</script>

<style scoped>
.page-list {
  padding: 20px;
}
</style> 