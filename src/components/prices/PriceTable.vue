<template>
  <div>
    <v-card-title class="col-md-4">
      <!-- Búsqueda dentro de la tabla -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
      :search="search"
      :expanded.sync="expanded"
      :single-expand="singleExpand"
         >

       <template v-slot:item="{item}">
        <tr>
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
             <input class="newValues" :value="item.cost_price" :id="'c'+item.item_id" @change="updateCost" type="text">
          </td>
          <td class="d-block d-sm-table-cell ">
              <input class="newValues" :value="item.unit_price" :id="'p'+item.item_id" @change="updatePrice" type="text">
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
      params: String
    },
    created() {
        console.log()
        // this.initialize()
      },
    watch: {
      params: function(params, old){
        console.log("new supplier: " + params, " old: " + old)
        this.searchItems()
      }

    },
    
    methods: {
      searchItems(){
        console.log('refreshing details table');
        axios.get("http://localhost:8080/details?" + this.params).then((result) => {
        // let resultado = result;
        // console.log('result' + resultado);
        this.items = result.data;
        // this.items = details;
        console.log(this.items);
         })
      },
      updateCost(e){
        let itemId = e.target.id.substring(1);
        let inputValue = e.target.value;
        let row =   this.idIndexOf(itemId);
        //update cost
        this.items[row].cost_price = parseInt(inputValue);
        //update price
        let prevCost = this.items[row].unitCost;
        let prevPrice = this.items[row].unitPrice;
        let prevDiff = prevPrice - prevCost;
        console.log('Prev Diff: ' + prevDiff);
        let prevRent = (prevDiff * 100) / prevCost;
        console.log('Prev REnt: ' + prevRent);
        let newCost = this.items[row].cost_price;
        this.items[row].unit_price = newCost + ( newCost  * prevRent / 100);
      },
       updatePrice(e){
        let itemId = e.target.id.substring(1);
        let inputValue = e.target.value;
        let row =   this.idIndexOf(itemId);
        this.items[row].unit_price = parseInt(inputValue);
      },
      idIndexOf(itemId){
        let row = -1;
        for (const item of this.items){
           row ++;
           if (parseInt(itemId) === item.item_id){
             break;
           }
        }
        return row;
      },
      save: function () {
        let updatedItems = this.filterUpdatedItems(this.items);
        if (updatedItems.length > 0){
          axios.post("http://localhost:8080/items", 
              updatedItems
          ).then(response => {
               console.log(response)
               this.searchItems()
          }).catch(e => {
              console.log('error guardando cambios: ' + e);
          });
        }
      },
      filterUpdatedItems(items){
        let filtered = items.filter(item => 
          item.cost_price && item.unit_price && !isNaN(item.cost_price) && !isNaN(item.unit_price)
        );
        return filtered;
      }
 
    },

 computed: {
      headers () {
        return [
          {
            text: 'Item',
            align: 'start',
            filterable: true,
            sortable: true,
            value: 'name',
          },
          { text: 'Proveedor', value: 'supplierName' },
            {
            text: 'Categoria',
            value: 'category',
            filter: value => {
              if (!this.category) return true

              return value < parseInt(this.category)
            },
          },
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
