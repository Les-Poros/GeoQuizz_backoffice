<template>
  <div class="justify-content-center app">
    <table class="table table-hover table-dark text-center">
      <thead>
        <tr class="table-active">
          <th scope="col">Ville</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(serie,index) in listSeries" :key="index">
          <td class="align-middle">{{serie.ville}}</td>
          <td class="align-middle">
            <button class="btn btn-warning">Voir Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center app">
        <li class="page-item">
          <p class="page-link text-warning bg-dark" @click="pageSuivant(pagination.prev)">Precedent</p>
        </li>
        <li class="page-item" v-if="pagination.first<=pagination.self-2">
          <p
            class="page-link bg-dark text-warning"
            @click="pageSuivant(pagination.first)"
          >{{pagination.first}}</p>
        </li>
        <li class="page-item" v-if="pagination.first<=pagination.self-3">
          <p class="page-link bg-dark text-warning">...</p>
        </li>

        <li class="page-item" v-if="pagination.prev!=pagination.self">
          <p
            class="page-link bg-dark text-warning"
            @click="pageSuivant(pagination.prev)"
          >{{pagination.prev}}</p>
        </li>

        <li class="page-item">
          <p class="page-link text-warning bg-dark active">{{pagination.self}}</p>
        </li>

        <li class="page-item" v-if="pagination.next!=pagination.self">
          <p
            class="page-link text-warning bg-dark"
            @click="pageSuivant(pagination.next)"
          >{{pagination.next}}</p>
        </li>

        <li class="page-item" v-if="pagination.last-3>=pagination.self">
          <p class="page-link bg-dark text-warning">...</p>
        </li>
        <li class="page-item" v-if="pagination.last-2>=pagination.self">
          <p
            class="page-link text-warning bg-dark"
            @click="pageSuivant(pagination.last)"
          >{{pagination.last}}</p>
        </li>
        <li class="page-item">
          <p class="page-link text-warning bg-dark" @click="pageSuivant(pagination.next)">Suivant</p>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["apiurl"],
  data() {
    return { listSeries: "", size: this.$route.query.size, pagination: {} };
  },
  methods: {
    getSerie: function() {
      axios
        .get(this.apiurl + "series", {
          params: {
            page: this.$route.query.page,
            size: this.size
          }
        })
        .then(response => {
          this.listSeries = response["data"]["content"];
          response["data"]["links"].forEach(element => {
            this.$set(
              this.pagination,
              element.rel.split(" - page:")[0],
              element.rel.split(" - page:")[1]
            );
          });
        });
    },
    pageSuivant: function(page) {
      this.$router.push({
        name: "Series",
        query: { page: page, size: this.size }
      });
    }
  },
  watch: {
    "$route.query.page"() {
      this.getSerie();
    }
  },
  created() {
    this.getSerie();
  }
};
</script>

<style>
.pagination p:hover {
  cursor: pointer;
  background-color: #454d55 !important;
}
.active {
  background-color: #ffc107 !important;
  color: #454d55 !important;
}
.active:hover {
  background-color: #454d55 !important;
  color: #ffc107 !important;
}
</style>
