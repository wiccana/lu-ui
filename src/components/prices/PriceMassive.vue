<template>
  <div >
    <div  class="d-flex justify-space-around align-center" v-if="!massive">
       <v-btn
              small
              color="purple"
              dark
              @click="massive=true"
            >
               Aplicar % 
       </v-btn>
    
    </div>
    <div v-if="massive" class="blue lighten-5 d-flex justify-space-around align-center flex-grow-0 flex-shrink-0"  cols="2">
      <v-btn
              icon
              color="indigo"
              @click="massive=false"
            >
          <v-icon>mdi-close-box</v-icon>
      </v-btn>
      <v-text-field class="text-center shrink"
              type="number"   
              min="0"
              max="999"
              v-model="percent"
        ></v-text-field>
      <v-btn   class="ma-2"  outlined   color="purple">
        Aplicar {{percent}}%  <v-icon>mdi-arrow-up</v-icon>
      </v-btn>

    </div>
  </div>
 
</template>
<script>
  export default {
    data () {
      return {
        massive: false,
        percent: 0
      }
    },

  }
</script>