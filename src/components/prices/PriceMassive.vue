<template>
  <div >
    <div  class="d-flex justify-space-around align-center" v-if="!massive">
       <v-btn
              small
              color="purple"
              dark
              @click="massive=true;"
            >
               Aplicar % 
       </v-btn>
    
    </div>
  <div class="d-flex justify-space-around align-center" style="margin:auto">
    <div v-if="massive" class="blue lighten-5 d-flex justify-space-around align-center"  style="min-width: 100px; max-width: 350px;">
      <v-btn class="padding10"
              icon
              color="indigo"
              @click="massive=false;"
            >
          <v-icon>mdi-close-box</v-icon>
      </v-btn>
      <div class="padding10">
      <v-text-field class="text-center shrink " 
              type="number"   
              min="0"
              max="999"
              v-model="percent"
        ></v-text-field>

      </div>
      <v-btn   class="ma-2 padding10"  outlined   @click="massive=false; rise();"  color="purple">
        Aplicar {{percent}}%  <v-icon>mdi-arrow-up</v-icon>
      </v-btn>

    </div>
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
    methods: {
      rise: function(){
        this.$emit('rise', this.percent);
      } 
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.padding10 {
  padding-right: 22px;
  padding-left: 22px;
}
</style>