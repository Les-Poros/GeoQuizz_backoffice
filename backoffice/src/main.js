import conf from "./conf/conf.json";
import Accueil from "./Accueil.vue";
import ListeSeries from "./ListeSeries.vue";
import Serie from "./Serie.vue";
import PhotosSerie from "./ListePhotos.vue";
import Photo from "./Photo.vue";

const routes = [
  { name: "Accueil", path: "/", component: Accueil },
  { name: "Series", path: "/series", component: ListeSeries },
  { name: "Serie", path: "/series/:id", component: Serie },
  { name: "PhotosSerie", path: "/series/:id/photos", component: PhotosSerie },
  { name: "Photo", path: "/series/:idSerie/photos/:idPhoto", component: Photo },
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
