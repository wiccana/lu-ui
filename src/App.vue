<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
     
      <v-toolbar-title>{{toolbarTitle}}</v-toolbar-title>

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

     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="350px"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="orange--text text--accent-4"
        >
            <router-link to="/"> 
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> 
                          Home
                    </v-list-item-title>
                </v-list-item>
            </router-link>  
        
           <router-link to="/cash"> 
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-cash-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> 
                          Flujo de Efectivo
                    </v-list-item-title>
                </v-list-item>
            </router-link>  

              <router-link to="/prices"> 
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-sale</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> 
                          Actualización de Precios
                    </v-list-item-title>
                </v-list-item>
            </router-link>  
        

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',
   data: () => ({
      drawer: false,
      group: null
  }),
    computed: {
      toolbarTitle: function() {
          return this.$route.meta.title;
      }
  }
};
</script>

<style scoped>
.menu-item{
  font-size: 1rem;
}
</style> 



