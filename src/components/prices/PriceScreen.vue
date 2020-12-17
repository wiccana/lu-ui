<template>
  <div>
    <PriceFilter/>
    <PriceTable/>
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
   }
}
</script>
