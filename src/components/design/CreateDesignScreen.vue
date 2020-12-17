<template>
  <div>
    <div  v-if="showPendingDesign">
      <DesignWizard :pDesign="pendingDesign"/>
    </div>
    <div v-if="!showPendingDesign">
      <NewDesignForm @design-created="showPDesign"/>
    </div>
  </div>
  
</template>

<script>
import NewDesignForm from './NewDesignForm.vue'
import DesignWizard from './DesignWizard.vue'
import axios from 'axios';
export default {
  name: 'CreateDesignScreen',
   components: {
     NewDesignForm,
     DesignWizard
   },
   created() {
      this.checkUnfinished();
   },
   data () {
      return {
        unfinished: false, 
        pendingDesign: null
    }
   },
  computed:{
      showPendingDesign(){
      return this.unfinished;
       }
    },
   methods: {
     checkUnfinished(){
        axios.get("http://localhost:8080/pdesign?finished=false", null).then(result => {
          if(result.data.length > 0){
            console.log("unfinished: " + result.data + " length " + result.data.length, " new Form should not be displayed");
              this.unfinished = true;
              this.pendingDesign = result.data[0];
              // this.showPendingDesign();
            }
              })
              .catch(error => {
                console.log(error);
              });
     },
     showPDesign(pdesign){
       this.pendingDesign = pdesign;
       this.unfinished = true;
     }
   }
 }
</script>
