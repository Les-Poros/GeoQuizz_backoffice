<template>
  <div class="d-flex justify-content-center app">
    <router-link :to="{ name: 'Series', query: { page:0,size:5  }}">
      <div class="text-center btn btn-primary">
        Voir les Series
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
