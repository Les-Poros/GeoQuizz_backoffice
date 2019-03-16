<template>
  <div class="justify-content-center bg-dark text-white app">
      
    <h1 class="bg-warning m-0 text-dark text-center">Photo</h1> 
     <div class="m-0 text-dark text-center" style="background-color:#e0a800;">
      <router-link :to="{ path: '/ok'}">
        <button class="btn m-1 btn-outline-dark">Modifier la Photo</button>
      </router-link>
    </div>
    <dl class="row no-gutters bg-dark text-center">
      <dt class="col-sm-3 border border-warning py-2">Description</dt>
      <dd class="col-sm-9 border border-warning m-0 py-2">{{photo.descr}}</dd>

      <dt class="col-sm-3 border border-warning py-2">Longitude</dt>
      <dd class="col-sm-9 border border-warning py-2 m-0">{{photo.longitude}}</dd>

      <dt class="col-sm-3 border border-warning py-2">Latitude</dt>
      <dd class="col-sm-9 border border-warning m-0 py-2">{{photo.latitude}}</dd>

      <dt class="col-sm-3 border border-warning py-2">image</dt>
      <dd class="col-sm-9 border border-warning m-0 py-2"> <img v-if="photo" style="width: 300px;height: 200px;" :src="apiurl+photo.url"></dd>
    </dl>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["apiurl"],
  data() {
    return {
      photo: ""
    };
  },
  methods: {
    getPhoto: function() {
      axios
        .get(this.apiurl + "series/" + this.$route.params.idSerie+"/photos/"+this.$route.params.idPhoto, {})
        .then(response => {
          this.photo = response["data"];
        });
    }
  },
created(){
    this.getPhoto();
}
};
</script>

<style>
</style>
