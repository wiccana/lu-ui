<template>
  <v-container fluid>
    <v-row>
         <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="category"
            label="Categoría"
          ></v-text-field>
        </v-col>

      <v-col
        class="d-flex"
        cols="12"
        md="3"
      >
        <v-select
          :items="items"
           item-text="agency_name"
           item-value="person_id"
          label="Proveedor"
          @change="selectSupplier"
          outlined
        ></v-select>
      </v-col>

       <v-col
        class="pt-6"
        cols="12"
        md="3"
      >
    <v-checkbox
      v-model="extoday"
      @change="setExToday"
      :label="`Omitir actualizados hoy`"
    ></v-checkbox>
       </v-col>

      <v-col
        class="pt-6"
        cols="12"
        md="3"
      >
        <v-btn
      fab
      dark
      small
      color="primary"
    >
    
      <v-icon dark>
        mdi-magnify
      </v-icon>
    </v-btn>
      </v-col>

    </v-row>
  </v-container>

</template>
<script>
import axios from 'axios';
export default {
  name: 'PriceFilter',
  data: () => ({
      items: [],
      category: "",
      extoday: true,
      supplier: ''
    }),
  async created() {
    //filling suppliers combobox
    axios.get("http://localhost:8080/supplier").then((result) => {
        let suppliers = result.data;
        this.items = suppliers;
        let empty = {"person_id": "", "company_name": "TODOS", "agency_name": "TODOS"}
        this.items.unshift(empty);
        console.log(suppliers);
    })
  },
  methods: {
      selectSupplier: function(supplier) {
        console.log('Selecting supplier: ' + supplier);
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
