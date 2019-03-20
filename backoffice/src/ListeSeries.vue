<template>
  <div class="justify-content-center app">
    
    <h1 class="bg-warning m-0 text-dark text-center">Zones de jeu</h1> 
     <div class="m-0 text-dark text-center" style="background-color:#e0a800;">
      <router-link :to="{ name: 'CreationSerie'}">
        <button class="btn m-1 btn-primary">Créer une zone</button>
      </router-link>
    </div>
    <!-- Affichage liste series-->
    <table class="table table-hover table-dark text-center m-0">
      <thead>
        <tr class="table-active">
          <th scope="col">Zone</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(serie,index) in listSeries" :key="index">
          <td class="align-middle">{{serie.ville}}</td>
          <td class="align-middle">
            <router-link :to="{ name: 'Serie', params: { idSerie:serie.id}, query: { page: 0, size:6 }}">
              <button class="btn btn-warning">Voir Details</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
     <!--Affichage pagination-->
    <pagination :pagination="pagination"></pagination>
  </div>
</template>

<script>
import axios from "axios";
import pagination from "./Pagination.vue";
export default {
  props: ["apiurl"],
  components: {
    pagination
  },
  data() {
    return {
      listSeries: "",
      pagination: {}
    };
  },
  methods: {
    //Permet de recuperer les series existantes
    getSerie: function() {
      axios
        .get(this.apiurl + "series", {
          params: {
            page: this.$route.query.page,
            size: this.$route.query.size
          }
        })
        .then(response => {
          //On recupere les données
          this.listSeries = response["data"]["content"];
          //on recupere les infos de pagination
          response["data"]["links"].forEach(element => {
            this.$set(
              this.pagination,
              element.rel.split(" - page:")[0],
              element.rel.split(" - page:")[1]
            );
          });
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
