<template>
  <div>
    <PriceFilter @set-supplier="setSupplier"/>
    <PriceTable :supplier="supplier"/>
    <div class="float-right my-4 mr-4">
        <v-btn color="primary" >
          Guardar
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
        </v-btn>
     </div>
  </div>
</template>

<script>
import PriceTable from './PriceTable.vue'
import PriceFilter from './PriceFilter.vue'
export default {
  name: 'PriceScreen',
  components: {
    PriceFilter,
     PriceTable
   },
   data () {
        return {
            supplier: null,
        }
    },
  methods: {
        setSupplier: function(supplier) {
        console.log('Price ScreenSelecting supplier: ' + supplier);
        this.supplier = supplier

     }
  }
}
</script>
