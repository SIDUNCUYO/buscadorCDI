<template>
  <Navbar />
  <div class="container">
        <div id="app" class="row">
    <Buscador />
  </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Buscador from '@/components/Buscador.vue'
export default {
  name: 'HomeView',
  components: {
    Buscador,
    Navbar
  }
}
</script>
