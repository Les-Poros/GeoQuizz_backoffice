<template>
  <div class="justify-content-center text-white app">
    <h1 class="bg-warning m-0 text-dark text-center">Infos de la zone</h1>
    <!-- Bouton modification serie-->
    <div class="m-0 text-dark text-center" style="background-color:#e0a800;">
      <router-link :to="{ name: 'ModifSerie',params:{idSerie:serie.id}}">
        <button class="btn m-1 btn-primary">Modifier la zone</button>
      </router-link>
    </div>
    <!-- Affichage info serie-->
    <dl class="row bg-dark m-0 text-center">
      <dt class="col-sm-3 border border-warning py-2">Nom</dt>
      <dd class="col-sm-9 border border-warning m-0 py-2">{{serie.ville}}</dd>

      <dt class="col-sm-3 border border-warning py-2">Longitude</dt>
      <dd class="col-sm-9 border border-warning py-2 m-0">{{serie.map_lon}}</dd>

      <dt class="col-sm-3 border border-warning py-2">Latitude</dt>
      <dd class="col-sm-9 border border-warning m-0 py-2">{{serie.map_lat}}</dd>
    </dl>
    <listephotos :apiurl="apiurl"></listephotos>
  </div>
</template>

<script>
import axios from "axios";
import listephotos from "./ListePhotos";
export default {
  props: ["apiurl"],
  components: {
    listephotos
  },
  data() {
    return {
      serie: ""
    };
  },
  methods: {
    //Recupere la serie choisit
    getSerie: function() {
      axios
        .get(this.apiurl + "series/" + this.$route.params.idSerie, {})
        .then(response => {
          this.serie = response["data"];
        });
    }
  },
  //Watcher qui refresh le component si la route change
  watch: {
    "$route.query"() {
      this.getSerie();
    }
  },
  created() {
    this.getSerie();
  }
};
</script>

<style>
</style>
