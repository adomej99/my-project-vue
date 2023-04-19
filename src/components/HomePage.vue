<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>

import Navigation from '@/components/NavbarComponent.vue'
export default {
  name: 'HomePage',
  components: {
    Navigation,
  },
}
</script>


<style scoped>

</style>
