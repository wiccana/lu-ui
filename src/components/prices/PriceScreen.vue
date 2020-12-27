<template>
  <div>
    <PriceFilter @set-search-params="setSearchParams"/>
    <PriceTable :params="params"/>
   
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
            params: '',
        }
    },
  methods: {
        setSupplier: function(supplier) {
        console.log('Price ScreenSelecting supplier: ' + supplier);
        this.supplier = supplier

     },
      setSearchParams: function(params){
        console.log('search params in screen ' + params)
        this.params = params;
      } 
  }
}
</script>
