<template>
  <div>
    <v-card-title >
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
             {{item.itemNumber}}
          </td>
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
             {{item.update}}
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
          <td class="d-block d-sm-table-cell" :id="'a'+item.item_id">
              <v-chip text-color="white"
              :color="getRiseColor(item.rise)"
            >
              {{ item.rise }}
            </v-chip>
          </td>
          <td class="d-block d-sm-table-cell">
              <input class="newValues" :value="item.unit_price" :id="'p'+item.item_id" @change="updatePrice" type="text">
          </td>
          <td class="d-block d-sm-table-cell" :id="'r'+item.item_id">
            <v-chip text-color="white"  :color="getProfitColor(item.profit)">
             {{item.profit}}
              </v-chip>
          </td>
        </tr>
      </template>

    </v-data-table>
   
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'PriceTable',
  data () {
      return {
        expanded: [],
        singleExpand: false,
        search: '',
        errors: 0
      }
    },
    props : {
      items: Array
    },
    methods: {
      updateCost(e){
        let itemId = e.target.id.substring(1);
        let inputValue = e.target.value;
        let row =   this.idIndexOf(itemId);
       
       if (inputValue === ''){
         this.items[row].cost_price = '';
         this.items[row].unit_price = '';
         this.items[row].rise = '';
         this.items[row].profit = '';
        }else{
          //update cost
          this.items[row].cost_price = parseInt(inputValue);
          //update price
          let prevCost = this.items[row].unitCost;
          let prevPrice = this.items[row].unitPrice;
          let prevDiff = prevPrice - prevCost;
          console.log('Prev Diff: ' + prevDiff);
          let prevRent = (prevDiff * 100) / prevCost;
          console.log('Prev REnt: ' + prevRent);
          let newCost = Math.round(this.items[row].cost_price);
          this.items[row].unit_price = Math.round(newCost + ( newCost  * prevRent / 100));
          let costDiff = newCost - prevCost;
          //update Aumento y Rentabilidad
          let incremenet = (costDiff * 100) / prevCost;
          this.items[row].rise = Math.round(incremenet);
          this.items[row].profit  =  Math.round(prevRent);
        }
      },
       updatePrice(e){
        let itemId = e.target.id.substring(1);
        let row =   this.idIndexOf(itemId);
        let inputValue = e.target.value;
        this.items[row].unit_price = parseInt(inputValue);

        //calculate new revenue
        let diff = this.items[row].unit_price - this.items[row].cost_price;
        let rent =  (diff * 100) / this.items[row].cost_price;
        this.items[row].profit =  Math.round(rent);
       
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
     
      getRiseColor (number) {
        if (number === null) return 'default'
        else if (number < 1)  return 'red'
        else if (number === 0) return 'default'
        else if (number > 50) return 'orange'
        else return 'primary'
      },
      getProfitColor (number) {
        if (number === null) return 'default'
        else if (number < 55) return 'red'
        else if (number > 55 && number < 150 ) return 'primary'
        else return 'green'
      },
 
    },

 computed: {
      headers () {
        return [
           { text: 'Codigo', value: 'itemNumber' },
          {
            text: 'Item',
            align: 'start',
            filterable: true,
            sortable: true,
            value: 'name',
          },
          { text: 'Proveedor', value: 'supplierName' },
          {text: 'Categoria', value: 'category'},
          { text: 'Fecha', value: 'update' },
          { text: 'Costo', value: 'unitCost' },
          { text: 'Precio', value: 'unitPrice' },
          { text: 'Nuevo Costo', value: 'cost_price' },
          { text: 'Aumento %', value: 'unitPrice' },
          { text: 'Nuevo Precio', value: 'unit_price' },
          { text: 'Rentabilidad %', value: 'unitPrice' },

        ]
      },
    }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newValues {
  border-style: dashed;
  width: 90px;
}
</style>
