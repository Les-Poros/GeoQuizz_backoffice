<template>
  <div class="justify-content-center text-white app">
    <h1 class="bg-warning m-0 text-dark text-center">Photos de la zone</h1>
    <div class="m-0 text-dark text-center" style="background-color:#e0a800;">
      <router-link :to="{ name: 'CreationPhoto' ,params:{idSerie:this.$route.params.idSerie}}">
        <button class="btn m-1 btn-primary">Ajouter une photo</button>
      </router-link>
    </div>
    <div class="row bg-dark m-0">
      <div
        class="card rounded-0 bg-dark p-3 text-center border-warning col-lg-4 col-sm-6 col-12"
        v-for="(photo,index) in listePhotos"
        :key="index"
        style="width: 18rem;"
      >
        <img :src="photo.url" class="card-img-top photo" alt>
        <div class="card-body">
          <h5 class="card-title">{{photo.descr}}</h5>
          <router-link :to="{ name: 'Photo', params: { idSerie:$route.params.idSerie,idPhoto:photo.id}}">
            <button class="btn btn-warning">Voir Details</button>
          </router-link>
        </div>
      </div>
    </div>
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
      listePhotos: "",
      pagination: {}
    };
  },
  methods: {
    getPhotos: function() {
      axios
        .get(this.apiurl + "series/" + this.$route.params.idSerie + "/photos", {
          params: {
            page: this.$route.query.page,
            size: this.$route.query.size
          }
        })
        .then(response => {
          this.listePhotos = response["data"]["content"];
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
  watch: {
    "$route.query"() {
      this.getPhotos();
    }
  },
  created() {
    this.getPhotos();
  }
};
</script>

<style>
.photo {
  width: 100%;
  height: 200px;
}
</style>
