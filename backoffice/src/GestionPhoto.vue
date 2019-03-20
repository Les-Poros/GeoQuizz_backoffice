<template>
  <div class="text-center text-dark">
    <h1 class="bg-warning text-dark m-0 text-center">
      <span v-if="!$route.params.idPhoto">Creation d'une photo</span>
      <span v-else>Modification de la photo</span>
    </h1>

     <!-- Affichage info photo-->
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
          <span v-if="image">{{image.name}}</span>
          <span v-else class="text-secondary">Remplacer l'image si besoin</span>
        </label>
      </dd>
    </dl>
 <!--Bouton creation/modif photo-->
    <div class="m-0 p-1 text-dark text-center bg-warning">
      <button
        v-bind:disabled="!descr || !latitude || !longitude"
        class="btn btn-primary"
        @click.once="uploadImage"
      >
        <span v-if="$route.params.idPhoto">Modifier la photo</span>
        <span v-else>Créer la photo</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import conf from "./conf/conf.json";
import CryptoJS from "crypto-js";
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
    //Permet de creer une nouvelle photo
    creerPhoto: function() {
      axios
        .post(
          this.apiurl + "series/" + this.$route.params.idSerie + "/photos",
          {
            descr: this.descr,
            latitude: this.latitude,
            longitude: this.longitude,
            url: this.url
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.$router.push({ //redirection vers la photo
            name: "Photo",
            params: {
              idSerie: this.$route.params.idSerie,
              idPhoto: response.data.id
            }
          });
        });
    },
    //Permet de modifier les informations d'une application existante
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
          this.$router.push({//redirection vers la photo
            name: "Photo",
            params: {
              idSerie: this.$route.params.idSerie,
              idPhoto: this.$route.params.idPhoto
            }
          });
        });
    },
    //Permet de recuperer et stocker l'image que l'utilisateur a choisit
    previewImage() {
      this.image = this.$refs.image.files[0];
    },
    //Permet d'upload l'image choisit 
    uploadImage(photoId) {
      if (this.image) { //Si une nouvelle image a été entrée
        let timestamp = ((Date.now() / 1000) | 0).toString();
        let stringHash = "timestamp=" + timestamp + conf.imageSecretAPI;
        let signature = CryptoJS.SHA1(stringHash).toString();
        let form = new FormData();
        form.append("file", this.image);
        form.append("timestamp", timestamp);
        form.append("api_key", conf.imageKeyApi);
        form.append("signature", signature);
        axios
          .post(conf.imageUrl, form, {
            withCredentials: false
          })
          .then(response => {
            this.url = response.data.secure_url;
            if (this.$route.params.photoId) this.ModifierPhoto();
            else this.creerPhoto();
          });
      }else{
        this.ModifierPhoto();
      }
    },
    //Permet d'initialiser la page on fonction de si on souhaite créer ou modifier une photo
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
  //Watcher qui refresh le component si la route change
  watch: {
    $route() {
      this.descr = "";
      this.latitude = "";
      this.longitude = "";
      this.image = "";
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
