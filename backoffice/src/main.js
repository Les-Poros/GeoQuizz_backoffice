import conf from "./conf/conf.json";
import Accueil from "./Accueil.vue";
import ListeSeries from "./ListeSeries.vue";
import Serie from "./Serie.vue";
import PhotosSerie from "./ListePhotos.vue";
import Photo from "./Photo.vue";
import GestionSerie from "./GestionSerie.vue";
import GestionPhoto from "./GestionPhoto.vue";
import Login from "./Login.vue";
import Inscription from "./Inscription.vue";

import axios from "axios";

//Contruction de nos routes
const routes = [
  { name: "Accueil", path: "/", component: Accueil },
  { name: "Series", path: "/series", component: ListeSeries },
  { name: "Serie", path: "/series/:idSerie", component: Serie },
  { name: "PhotosSerie", path: "/series/:idSerie/photos", component: PhotosSerie },
  { name: "Photo", path: "/series/:idSerie/photos/:idPhoto", component: Photo },
  { name: "CreationSerie", path: "/gestion/series/creation", component: GestionSerie },
  { name: "ModifSerie", path: "/gestion/series/:idSerie", component: GestionSerie },
  { name: "CreationPhoto", path: "/gestion/series/:idSerie/photos/creation", component: GestionPhoto },
  { name: "ModifPhoto", path: "/gestion/series/:idSerie/photos/:idPhoto", component: GestionPhoto },
  { name: "Login", path: "/login", component: Login },
  { name: "Inscription", path: "/inscription", component: Inscription }
];

//Construction d'un router avec nos routes
const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  data: {
    apiUrl: conf.apiUrl,
    load:false
  },
  created() {
    //On set des parametres par defauts de nos requetes axios
    axios.interceptors.request.use((config) => {
      this.load = true;
      return config;
    }, (error) => {
      this.load = false;
      return Promise.reject(error);
    });

    axios.defaults.withCredentials = true;

    axios.interceptors.response.use((response) => {
      this.load = false;
      return response;
    }, (error) => {

      this.load = false;
      if((""+error).includes("403"))
        this.$router.push( {name: "Login"});
      return Promise.reject(error);
    });
  }

  
}).$mount("#app");
