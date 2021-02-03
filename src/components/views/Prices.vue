<template>
<div>
    <div class="row row--dense" style="padding:10px">
      <div class="col-sm-6 col-lg-8 col-12">
          <PriceFilter @set-search-params="setSearchParams"/>
      </div>
      <div class="col-sm-6 col-lg-4 col-12">
          <PriceConfirm :items="items" @refresh-items="searchItems"/>
      </div>
  </div>  
  <PriceTable :items="items"/>
</div>
</template>

<script>
import axios from 'axios';
import PriceTable from '../prices/PriceTable.vue'
import PriceFilter from '../prices/PriceFilter.vue'
import PriceConfirm from '../prices/PriceConfirm.vue'

export default {
  name: 'Prices',
  components: {
    PriceFilter,
    PriceTable,
    PriceConfirm
   },
   data () {
        return {
            params: "",
            items: []
        }
    },
  methods: {
    searchItems(){
        axios.get(this.$apiUrl+"/details?" + this.params).then((result) => {
        this.items = result.data;

         })
      },
      setSearchParams: function(params){
        this.params = params;
        this.searchItems();
      } 
  }
}
</script>
