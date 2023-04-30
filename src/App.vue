<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/NavigationComponent.vue';

export default {
  components: {
    Navigation,
  },
};
</script>
