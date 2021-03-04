<template>
  <div class="home">
    <v-btn color="primary summary-item"
            @click="updateReceivings">
            Actualizar Compras
          <v-icon
            dark
            right
          >
            mdi-cached
          </v-icon>
          </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  methods: {
  updateReceivings(){
         axios.get(this.$apiUrl+"/receivings/update")
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  /* background: rgb(63,94,251);
  background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(241,125,71,1) 94%); */
  padding: 25px;
  
}
</style>