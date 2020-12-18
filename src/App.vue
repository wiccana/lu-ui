<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Actualización de Precios</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-img
        alt="Casa Lumier Logo"
        class="shrink mr-4"
        right
        contain
        src="./assets/logo.png"
        transition="scale-transition"
        width="40"
      />
      <span class="mr-2">CASA LUMIER</span>

    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
