<template>
 <!--Bouton connection / inscription-->
  <div class="d-flex justify-content-center app">
    <router-link :to="{ name: 'Login'}">
      <div class="text-center m-2 btn btn-warning">
        Se connecter
      </div>
    </router-link>
    <router-link :to="{ name: 'Inscription'}">
      <div class="text-center m-2 btn btn-warning">
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
