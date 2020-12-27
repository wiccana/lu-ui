<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
      :search="search"
      :expanded.sync="expanded"
      :single-expand="singleExpand"
         >

       <template v-slot:item="{item }">
        <tr>
          <!-- <td>
            <v-btn @click="expand(!isExpanded)">Expand</v-btn>
          </td> -->
           <td class="d-block d-sm-table-cell">
             {{item.name}}
          </td>
          <td class="d-block d-sm-table-cell">
             {{item.supplierName}}
          </td>
            <td class="d-block d-sm-table-cell">
             {{item.category}}
          </td>
          <td class="d-block d-sm-table-cell">
             {{item.date}}
          </td>
          <td class="d-block d-sm-table-cell">
             {{item.unitCost}}
          </td>
          <td class="d-block d-sm-table-cell">
             {{item.unitPrice}}
          </td>
          <td class="d-block d-sm-table-cell">
             <input class="newValues" :value="item.cost_price" :id="item.item_id" @change="updateCost" type="text">
          </td>
          <td class="d-block d-sm-table-cell ">
              <input class="newValues" :value="item.unit_price" :id="item.item_id" @change="updatePrice" type="text">
          </td>
        </tr>
      </template>

    </v-data-table>
     <div class="float-right my-4 mr-4">
        <v-btn color="primary" @click="save">
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
import axios from 'axios';
export default {
  name: 'PriceTable',
  data () {
      return {
        expanded: [],
      singleExpand: false,
 
        search: '',
        items: [],
      }
    },
    props : {
      supplier: Number
    },
    created() {
        console.log()
        // this.initialize()
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
      updateCost(e){
        let itemId = e.target.id;
        let inputValue = e.target.value
        let row = null;
        //indexOf
        this.items.forEach(function(item, i) {
          if (itemId == item.item_id){
            row = i;
          }
        });
        this.items[row].cost_price = parseInt(inputValue);

      },
       updatePrice(e){
        let itemId = e.target.id;
        let inputValue = e.target.value
        let row = null;
        //indexOf
        this.items.forEach(function(item, i) {
          if (itemId == item.item_id){
            row = i;
          }
        });
        this.items[row].unit_price = parseInt(inputValue);

      },
     save: function(){
       console.log('Guardar:')
         axios.post("http://localhost:8080/items", this.items)
        .then(response => console.log(response));
     }
 
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
          { text: 'Fecha', value: 'date' },
          { text: 'Costo', value: 'unitCost' },
          { text: 'Precio', value: 'unitPrice' },
          { text: 'Nuevo Costo', value: 'cost_price' },
          { text: 'Nuevo Precio', value: 'unit_price' },

        ]
      },
    }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newValues {
  border-style: dashed;
}
</style>
