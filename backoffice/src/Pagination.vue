<template>
<div class="justify-content-center">
  <!-- Selecteur taille de la page-->
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <span
            class="input-group-text bg-jaunefonce border-warning"
            id="basic-addon1"
            @keyup.enter="pageSuivant(pagination.self)"
          >Nb élements</span>
        </div>
        <input
          type="number"
          class="form-control border-warning text-warning bg-dark text-center"
          aria-describedby="basic-addon1"
          v-model="size"
          value="10"
        >
        <div class="input-group-append">
          <button
            class="btn btn-warning"
            type="button"
            id="button-addon2 "
            @click="pageSuivant(pagination.self)"
          >Valider</button>
        </div>
      </div>
      <!--Selecteur page-->
      <nav aria-label="Page navigation border-warning example">
        <ul class="pagination justify-content-center m-0 app">
          <li class="page-item">
            <p
              class="page-link border-warning text-warning bg-dark"
              @click="pageSuivant(pagination.prev)"
            >Precedent</p>
          </li>
          <li class="page-item" v-if="pagination.first<=pagination.self-2">
            <p
              class="page-link border-warning bg-dark text-warning"
              @click="pageSuivant(pagination.first)"
            >{{pagination.first}}</p>
          </li>
          <li class="page-item" v-if="pagination.first<=pagination.self-3">
            <p class="page-link border-warning bg-dark text-warning">...</p>
          </li>

          <li class="page-item" v-if="pagination.prev!=pagination.self">
            <p
              class="page-link border-warning bg-dark text-warning"
              @click="pageSuivant(pagination.prev)"
            >{{pagination.prev}}</p>
          </li>

          <li class="page-item">
            <p class="page-link border-warning text-warning bg-dark active">{{pagination.self}}</p>
          </li>

          <li class="page-item" v-if="pagination.next!=pagination.self">
            <p
              class="page-link border-warning text-warning bg-dark"
              @click="pageSuivant(pagination.next)"
            >{{pagination.next}}</p>
          </li>

          <li class="page-item" v-if="pagination.last-3>=pagination.self">
            <p class="page-link border-warning bg-dark text-warning">...</p>
          </li>
          <li class="page-item" v-if="pagination.last-2>=pagination.self">
            <p
              class="page-link border-warning text-warning bg-dark"
              @click="pageSuivant(pagination.last)"
            >{{pagination.last}}</p>
          </li>
          <li class="page-item">
            <p
              class="page-link border-warning text-warning bg-dark"
              @click="pageSuivant(pagination.next)"
            >Suivant</p>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
  name:"pagination",
  props: ["pagination"],
  data() {
    return {
      size: this.$route.query.size ? this.$route.query.size : 10
    };
  },
  methods: {
    //Permet de changer les parametres actuelle de la route en fonction de la page voulu et de la taille voulu
    pageSuivant: function(page) {
      this.$router.push({
        query: { page: page, size: this.size }
      });
    }
  }
};
</script>

<style>
.pagination p:hover {
  cursor: pointer;
  background-color: #454d55 !important;
}
.bg-jaunefonce {
  background-color: #d39e00;
}
.active {
  background-color: #ffc107 !important;
  color: #454d55 !important;
}
.active:hover {
  background-color: #454d55 !important;
  color: #ffc107 !important;
}
li p {
  margin: 0;
}
</style>
