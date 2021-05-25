<template>
<div class="cash-screen">
  <div class="filters">
   
      <v-date-picker
        v-model="dates"
         
        range
      ></v-date-picker>
      <v-text-field
        v-model="dateRangeText"
        label="Período"
        @change="getTransactions"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
    
        <TransactionTypeSelect  @set-transaction-type="setTransactionType"></TransactionTypeSelect>
        <PaymentTypeSelect  @set-payment-type="setPaymentType"></PaymentTypeSelect>

  </div>
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
            type="number"
            label="Monto Inicial"
            @change="getFinalAmount"
          ></v-text-field>

        <div class="summary-item">
          <p>Monto final 
           <v-chip class="ma-2" color="primary" >
       {{formattedFinalAmout}}
           </v-chip>
          </p>
        </div>
</div>
 
</div>
</template>

<script>
import axios from 'axios';
import TransactionTypeSelect from '../transactions/TransactionTypeSelect.vue'
import PaymentTypeSelect from '../transactions/PaymentTypeSelect.vue'
export default {
  name: 'Transactions',
   components: {
    TransactionTypeSelect,
    PaymentTypeSelect
    },
    data () {
      return {
        dates: ['2020-11-01', new Date().toISOString().slice(0, 10)],
        startAmount: 0,
        finalAmount: 0,
        transactionTypeParam: '',
        paymentTypeParam: '',
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
      setTransactionType: function(transactionType){
        if (transactionType.length == 0){
            this.transactionTypeParam = '';
        }else{
          this.transactionTypeParam = '&transactionType=' + transactionType
        }
        console.log('transactionType',this.transactionType)
          this.getTransactions();
      }, 
      setPaymentType: function(paymentType){
        if (paymentType.length == 0){
            this.paymentTypeParam = '';
        }else{
          this.paymentTypeParam = '&paymentType=' + paymentType
        }
        console.log('paymentType',this.paymentTypeParam)
          this.getTransactions();
      }, 
      getTransactions(){
        axios.get(this.$apiUrl+"/transaction?" + this.dateRange + this.transactionTypeParam + this.paymentTypeParam).then((result) => {
        this.items = [];
        result.data.forEach(item => {
          if (item.transactionType == "Expense" ){
            item.amount =  parseInt(item.amount) * -1;
          }if (item.transactionType == "Receiving"){
            item.amount =  item.amount == null ? 0 : parseInt(item.amount) * -1;
          }
          this.items.push(item) 
        });
        this.selected = this.items;
        
         })
      },
      getFinalAmount(){
        this.finalAmount=0;  
        this.selected.forEach(element => this.finalAmount += parseInt(element.amount) );
        this.finalAmount += parseInt(this.startAmount);
      }
    },
    computed: {
      dateRangeText () {
        return this.dates.join(' hasta ')
      },
      dateRange () {
          return 'fromDate='+this.dates[0]+'&toDate='+(this.dates[1] == undefined ?this.dates[0]:this.dates[1])
      },
      formattedFinalAmout() {
        return this.finalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      //  formattedStartAmout() {
      //   return this.startAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      // }
  
    },
    watch: {
      selected: {
        handler: function () {this.getFinalAmount();}
      },
      dateRange:{
        handler: function () {this.getTransactions();}
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
