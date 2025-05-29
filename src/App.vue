<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary" class="justify-content-between">
      <b-navbar-brand to="/">Vue Page Editor</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" exact>Pages</b-nav-item>
        <b-nav-item to="/pages/new">Create Page</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  margin-bottom: 2rem;
}

.navbar-nav {
  align-items: center;
}

.nav-item {
  padding: 0 0.5rem;
}
</style>
