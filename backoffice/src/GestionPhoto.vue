<template>
  <div class="text-center text-dark">
    <h1 class="bg-warning text-dark m-0 text-center">
      <span v-if="!$route.params.idPhoto">Creation d'une photo</span>
      <span v-else>Modification de la photo</span>
    </h1>
    <dl class="row bg-dark m-0 text-center">
      <dt class="col-sm-3 jaune border border-warning py-2">Description</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="description"
          v-model="descr"
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

      <dt class="col-sm-3 jaune border border-warning py-2">Image</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0" style="cursor:pointer;">
        <input
          type="file"
          id="image"
          ref="image"
          class="custom-file-input"
          @change="previewImage"
          multiple
        >
        <label class="custom-file-label bg-dark h-100 border-0 text-warning" for="image">
          <span v-if="url">{{url.split('img/')[1]}}</span>
          <span v-else class="text-secondary">Choisir une image</span>
        </label>
      </dd>

      <dt class="col-sm-3 jaune border border-warning py-2">url générée</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 m-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="url générée"
          disabled
          v-bind:value="url"
        >
      </dd>
    </dl>

    <div class="m-0 p-1 text-dark text-center bg-warning">
      <button
        v-if="!$route.params.idPhoto"
        v-bind:disabled="!descr || !latitude || !longitude || !image"
        class="btn btn-dark"
        @click="creerPhoto"
      >Créer la photo</button>
      <button
        v-else
        v-bind:disabled="!descr || !latitude || !longitude"
        class="btn btn-dark"
        @click="ModifierPhoto"
      >Modifier la photo</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["apiurl"],
  data() {
    return {
      descr: "",
      latitude: "",
      longitude: "",
      url: "",
      image: ""
    };
  },
  methods: {
    creerPhoto: function() {
      axios
        .post(
          this.apiurl + "series/" + this.$route.params.idSerie + "/photos",
          {
            descr: this.descr,
            latitude: this.latitude,
            longitude: this.longitude
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.uploadImage(response["data"]["id"]);
        });
    },
    ModifierPhoto: function() {
      axios
        .put(
          this.apiurl +
            "series/" +
            this.$route.params.idSerie +
            "/photos/" +
            this.$route.params.idPhoto,
          {
            descr: this.descr,
            longitude: this.longitude,
            latitude: this.latitude
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          if (this.image) this.uploadImage(this.$route.params.idPhoto);
          else
            this.$router.push({
              name: "Photo",
              params: {
                idSerie: this.$route.params.idSerie,
                idPhoto: this.$route.params.idPhoto
              }
            });
        });
    },
    previewImage() {
      this.image = this.$refs.image.files[0];
      this.url = "/img/" + this.image.name;
    },
    uploadImage(photoId) {
      let formData = new FormData();
      formData.append("image", this.image);
      axios
        .put(
          this.apiurl +
            "series/" +
            this.$route.params.idSerie +
            "/photos/" +
            photoId +
            "/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
          this.$router.push({
            name: "Photo",
            params: { idSerie: this.$route.params.idSerie, idPhoto: photoId }
          });
        });
    },
    initPage: function() {
      if (this.$route.params.idSerie && this.$route.params.idPhoto) {
        axios
          .get(
            this.apiurl +
              "series/" +
              this.$route.params.idSerie +
              "/photos/" +
              this.$route.params.idPhoto,
            {}
          )
          .then(response => {
            this.descr = response["data"]["descr"];
            this.latitude = response["data"]["latitude"];
            this.longitude = response["data"]["longitude"];
            this.url = response["data"]["url"];
          });
      }
    }
  },
  watch: {
    $route() {
      this.descr = "";
      this.latitude = "";
      this.longitude = "";
      this.image = "";
      this.url = "";
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
.custom-file-label::after {
  border: 0;
  height: 100%;
  border-radius: 0;
  background-color: #e0a800;
}
</style>
