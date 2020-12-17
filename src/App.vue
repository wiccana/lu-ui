<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Casa Lumier Logo"
          class="shrink mr-4"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <span class="mr-2">CASA LUMIER</span>

        <!-- <v-img
          alt="Casa Lumier"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/isotipo_300.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

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
