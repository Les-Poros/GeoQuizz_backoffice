<template>
  <div class="text-center text-dark">
    <h1 class="bg-warning text-dark m-0 text-center">Connexion</h1>
    <!-- Affichage info connection-->
    <dl class="row bg-dark m-0 text-center">
      <dt class="col-sm-3 jaune border border-warning py-2">Pseudo</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="pseudo"
          v-model="username"
        >
      </dd>
      <dt class="col-sm-3 jaune border border-warning py-2">Mot de passe</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="password"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="mot de passe"
          @keyup.enter="connection"
          v-model="password"
        >
      </dd>
    </dl>
     <div v-if="echec" class="m-0 p-1 text-dark text-center jaune">Identifiant incorrect</div>
    <div class="m-0 p-1 text-dark text-center jaune">Pas de compte ? 
        <router-link class="text-secondary text-underline" :to="{ name: 'Inscription'}">
              S'inscrire ici
            </router-link>
        </div>
        <!--Bouton connection-->
    <div class="m-0 p-1 text-dark text-center bg-warning">
      <button
        v-bind:disabled="!password || !username"
        class="btn btn-dark"
        @click="connection"
      >Se connecter</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["apiurl"],
  data() {
    return {
      password: "",
      username: "",
      echec:false
    };
  },
  methods: {
    //Permet de se connecter au backoffice
    connection: function() {
      let formData = new FormData();
      formData.append("password", this.password);
      formData.append("username", this.username);
      axios
        .post(this.apiurl + "users/login", formData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.$router.push({//Redirection vers la listes des series
            name: "Series",
            query: { page: 0, size: 6 }
          });
        })
        .catch(error => { //Si identifiant incorrect
            this.echec=true
        });
    }
  }
};
</script>
    
<style>
.jaune {
  background-color: #e0a800;
}
</style>
