<template>
<div class="cash-screen">
   <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    item-key="id"
    :single-select="singleSelect"
    show-select
    class="elevation-1 table"
  >
  </v-data-table>
<div class="summary">
  <v-btn color="primary summary-item"
            @click="getTransactions">
            Actualizar
          <v-icon
            dark
            right
          >
            mdi-cached
          </v-icon>
          </v-btn>

           <v-text-field style="width: 150px; padding: 20px" class="summary-item"
            v-model="startAmount"
            counter="50"
            label="Monto Inicial"
          ></v-text-field>

        <div class="summary-item">
          Monto Final:
          {{finalAmount}}
         </div>
</div>
 
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Cash',
    data () {
      return {
        startAmount: 0,
        finalAmount: 0,
        singleSelect: false,
        selected: [],
        items: [],
         headers: [
             { text: 'Tipo', value: 'transactionType' },
          {
            text: 'Descripcion',
            align: 'start',
            sortable: false,
            value: 'description',
          },
          { text: 'Monto', value: 'amount' }
        
        ]
      }
    },
    created: function () {
         this.getTransactions()
    },
    methods: {
      getTransactions(){
         axios.get(this.$apiUrl+"/transaction?paymentType=cash").then((result) => {
        this.items = result.data;
        this.getFinalAmount();
         })
      },
      getFinalAmount(){
        console.log("calculando")
        this.finalAmount=0;  
        this.selected.forEach(element => this.finalAmount += element.amount);
        this.finalAmount+=this.startAmount;
      }
    }
  }

</script>
<style scoped>
.table {
  width: 50%;
  padding: 50px;
}
.summary {
  width: 30%;
  padding: 50px;
}
.summary-item{
  margin-bottom:50px;
}
.cash-screen{
  display: flex;
  justify-content: space-evenly;
}
</style>
