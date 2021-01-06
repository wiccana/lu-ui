<template>
    <div class="row row--dense">
      <div class="col-sm-6 col-lg-4 col-6">
          <v-select
          :items="items"
          item-text="agency_name"
          item-value="person_id"
          label="Proveedor"
          @change="selectSupplier"
          outlined
        ></v-select>
      </div>
      <div class="col-sm-6 col-lg-4 col-6">
          <v-checkbox
      v-model="extoday"
      @change="setExToday"
      :label="`Omitir actualizados hoy`"
    ></v-checkbox>
      </div>

  </div>  

</template>
<script>
import axios from 'axios';
export default {
  name: 'PriceFilter',
  data: () => ({
      items: [],
      extoday: true,
      supplier: ''
    }),
  async created() {
    axios.get("http://localhost:8080/supplier").then((result) => {
        let suppliers = result.data;
        this.items = suppliers;
        let empty = {"person_id": "", "company_name": "TODOS", "agency_name": "TODOS"}
        this.items.unshift(empty);
    })
  },
  methods: {
      selectSupplier: function(supplier) {
        this.supplier  = supplier;
        this.$emit('set-search-params', this.searchParams);
     },
     setExToday: function(extoday) {
        console.log('Changing exclude today to: ' + extoday);
        this.extoday  = extoday;
        this.$emit('set-search-params', this.searchParams);
     }
  },
  computed: {
    searchParams: function () {
      console.log('updating search params');
      return 'category&supplier=' + this.supplier + '&extoday=' + this.extoday;
    }
  }
}

</script>
