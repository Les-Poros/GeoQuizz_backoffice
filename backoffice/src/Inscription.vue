<template>
  <div class="text-center text-dark">
    <h1 class="bg-warning text-dark m-0 text-center">Inscription</h1>
    <dl class="row bg-dark m-0 text-center">
      <dt class="col-sm-3 jaune border border-warning py-2">Username</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="text"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="username"
          v-model="username"
        >
      </dd>

      <dt class="col-sm-3 jaune border border-warning py-2">Password</dt>
      <dd class="col-sm-9 border border-warning m-0 p-0">
        <input
          type="password"
          class="form-control border-0 h-100 text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          placeholder="password"
          @keyup.enter="connection"
          v-model="password"
        >
      </dd>
    </dl>
    <div class="m-0 p-1 text-dark text-center bg-warning">Deja un compte ?
      <router-link class="text-secondary text-underline" :to="{ name: 'Login'}">Se connecter ici</router-link>
    </div>
    <div class="m-0 p-1 text-dark text-center bg-warning">
      <button
        v-bind:disabled="!password || !username"
        class="btn btn-dark"
        @click="inscription"
      >S'inscrire</button>
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
      username: ""
    };
  },
  methods: {
    inscription: function() {
      axios
        .post(
          this.apiurl + "users",
          { password: this.password, username: this.username },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
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
              this.$router.push({
                name: "Series",
                query: { page: 0, size: 6 }
              });
            })
            .catch(error => {
              this.echec = true;
            });
        });
    }
  },
  created() {}
};
</script>
    
<style>
.jaune {
  background-color: #e0a800;
}
</style>
