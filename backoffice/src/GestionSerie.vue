<template>
  <div class="text-center text-dark">
    <h1 class="bg-warning text-dark m-0 text-center">
      <span v-if="!$route.params.idSerie">Creation d'une zone</span>
      <span v-else>Modification de la série</span>
    </h1>
    <dl class="row bg-dark m-0 text-center">
      <dt class="col-sm-3 jaune border border-warning py-2">Nom de la zone</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="zone"
          v-model="zone"
        >
      </dd>

      <dt class="col-sm-3 jaune border border-warning py-2">Longitude</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="longitude"
          v-model="longitude"
        >
      </dd>

      <dt class="col-sm-3 jaune border border-warning py-2">Latitude</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 m-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="latitude"
          v-model="latitude"
        >
      </dd>
    </dl>

    <div class="m-0 p-1 text-dark text-center bg-warning">
      <button
        v-if="!$route.params.idSerie"
        v-bind:disabled="!zone || !latitude || !longitude"
        class="btn btn-primary"
        @click.once="creerSerie"
      >Créer la serie</button>
      <button
        v-else
        v-bind:disabled="!zone || !latitude || !longitude"
        class="btn btn-primary"
        @click.once="ModifierSerie"
      >Modifier la serie</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["apiurl"],
  data() {
    return {
      zone: "",
      latitude: "",
      longitude: ""
    };
  },
  methods: {
    creerSerie: function() {
      axios
        .post(
          this.apiurl + "series",
          { ville: this.zone, map_lon: this.longitude, map_lat: this.latitude },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.$router.push({
            name: "Serie",
            params: { idSerie: response["data"]["id"] },
            query: { page: 0, size: 6 }
          });
        });
    },
    ModifierSerie: function() {
      axios
        .put(
          this.apiurl + "series/" + this.$route.params.idSerie,
          { ville: this.zone, map_lon: this.longitude, map_lat: this.latitude },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.$router.push({
            name: "Serie",
            params: { id: this.$route.params.idSerie },
            query: { page: 0, size: 6 }
          });
        });
    },
    initPage: function() {
      if (this.$route.params.idSerie) {
        axios
          .get(this.apiurl + "series/" + this.$route.params.idSerie, {})
          .then(response => {
            this.zone = response["data"]["ville"];
            this.latitude = response["data"]["map_lat"];
            this.longitude = response["data"]["map_lon"];
          });
      }
    }
  },
  watch: {
    $route() {
      this.zone = "";
      this.latitude = "";
      this.longitude = "";
      this.initPage();
    }
  },
  created() {
    this.initPage();
  }
};
</script>
    
<style>
.jaune {
  background-color: #e0a800;
}
</style>
