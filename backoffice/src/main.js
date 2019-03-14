import conf from "./conf/conf.json";
import Accueil from "./Accueil.vue";
import Series from "./Series.vue";

const routes = [
  { name: "Accueil", path: "/", component: Accueil },
  { name: "Series", path: "/series", component: Series }
];


const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  data: {
    apiUrl: conf.apiUrl
  }
}).$mount("#app");
