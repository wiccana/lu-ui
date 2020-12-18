<template>
  <v-container fluid>
    <v-row align="top">

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
          outlined
        ></v-select>
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
      category: ""
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
