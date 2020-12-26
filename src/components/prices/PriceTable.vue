<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
      :search="search"
         >

    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PriceTable',
  data () {
      return {
        search: '',
        items: [],
      }
    },
    props : {
      supplier: Number
    },
    created() {
        console.log()
        this.initialize()
      },
    watch: {
      supplier: function(supplier, old){
        console.log("new supplier: " + supplier, " old: " + old)
        this.searchBySupplier()
      }

    },
    
    methods: {
      searchBySupplier(){
        console.log('searching by supplier');
        axios.get("http://localhost:8080/details?category&supplier=" + this.supplier).then((result) => {
        // let resultado = result;
        // console.log('result' + resultado);
        this.items = result.data;
        // this.items = details;
        console.log(this.items);
         })
      },
 
    },

 computed: {
      headers () {
        return [
          {
            text: 'Item',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Proveedor', value: 'supplierName' },
          { text: 'Categoria', value: 'category' },
          { text: 'Costo', value: 'unitCost' },
          { text: 'Precio', value: 'unitPrice' },
          { text: 'Fecha', value: 'date' },
          { text: 'Nuevo Costo', value: 'newUnitCost' },
          { text: 'Nuevo Precio', value: 'newUnitPrice' },

        ]
      },
    }
 }
</script>
