<template>
  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
           item-text="agency_name"
           item-value="person_id"
          label="Proveedor"
          outlined
        ></v-select>
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
    }),
  async created() {
    axios.get("http://localhost:8080/supplier").then((result) => {
        let resultado = result;
        console.log('result' + resultado);
        let suppliers = result.data;
        this.items = suppliers;
        console.log(suppliers);
    })
  },
}
</script>
