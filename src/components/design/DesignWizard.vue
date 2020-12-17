<template>
      <!-- Design Steps by BR -->
    <v-stepper v-model="pDesign.stepNumber" vertical>
    <v-stepper-step :complete="steps > 0" step="1">     
      {{pDesign.steps[0].title}}
      <small></small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-4" class="mb-12" height="200px">
        {{pDesign.steps[0].description}}
      </v-card>
      <v-btn color="primary" @click="steps = 2" >Continuar</v-btn>
      <!-- <v-btn text>Atrás</v-btn> -->
    </v-stepper-content>

    <v-stepper-step :complete="steps > 2" step="2" >
      Configure analytics for this app
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary"  @click="steps = 3" >Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
  
</template>

<script>
import axios from 'axios';
export default {
  name: 'DesignWizard',

    props: {
        pDesign: Object,

    },
    data () {
       return {
         steps: this.pDesign.stepNumber
     }
    },
  watch: {
    steps (val) {
      this.pDesign.stepNumber = val;
      console.log("val " + val);
      //update StepNumber on backend
       axios.put("http://localhost:8080/pdesign?stepNumber="+ this.pDesign.stepNumber, this.pDesign).then(result => {
                  console.log(result.data);
                })
                .catch(error => {
                  console.log(error);
                });
                //TODO esperar respuesta del backend
    },
  }
 }
</script>

