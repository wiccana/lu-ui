<template>
<div>
    <div class="row row--dense" style="padding:20px">
      <div class="col-sm-6 col-lg-6 col-12">
          <PriceFilter @set-search-params="setSearchParams"/>
      </div>
      <div class="col-sm-6 col-lg-2 col-12">
          <PriceMassive :massive="false"/>
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
import PriceTable from './PriceTable.vue'
import PriceFilter from './PriceFilter.vue'
import PriceConfirm from './PriceConfirm.vue'
import PriceMassive from './PriceMassive.vue'
export default {
  name: 'PriceScreen',
  components: {
    PriceFilter,
    PriceTable,
    PriceConfirm,
    PriceMassive
   },
   data () {
        return {
            params: "",
            items: []
        }
    },
  methods: {
    searchItems(){
        axios.get("http://localhost:8080/details?" + this.params).then((result) => {
        this.items = result.data;
        console.log(this.items);
         })
      },
      setSearchParams: function(params){
        this.params = params;
        this.searchItems();
      } 
  }
}
</script>
