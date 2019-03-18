<template>
  <div class="d-flex justify-content-center app">
    <router-link :to="{ name: 'Login'}">
      <div class="text-center btn btn-primary">
        Se connecter
      </div>
    </router-link>
    <router-link :to="{ name: 'Inscription'}">
      <div class="text-center btn btn-primary">
        S'inscrire
      </div>
    </router-link>
  </div>
</template>

<script>
</script>

<style>
.petite-image {
  margin: 20px;
  width: 200px;
}
</style>
