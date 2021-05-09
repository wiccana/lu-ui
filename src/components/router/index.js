import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../Home.vue";
import Cash from "../views/Cash.vue"
import Prices from "../views/Prices.vue"
import Transactions from "../views/Transactions.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
    }
  },
  {
    path: "/prices",
    name: "Prices",
    component: Prices,
    meta: {
      title: 'Actualización de Precios',
    }
  },
  {
    path: "/cash",
    name: "Cash",
    component: Cash,
    meta: {
      title: 'Flujo de Efectivo',
    }
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: {
      title: 'Transacciones',
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
