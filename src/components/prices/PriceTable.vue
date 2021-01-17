<template>
  <div>
    <v-card-title class="col-sm-6 col-lg-12 col-12" >
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
       
      <div class="col-sm-6 col-lg-4 col-12">
          <PriceMassive :massive="false" @rise="rise"/>
      </div>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
       @current-items="getFiltered"
      item-key="id"
      class="elevation-1"
      :search="search"
           >

       <template v-slot:item="{item}">
             <tr >
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
import PriceMassive from './PriceMassive.vue'
export default {
  name: 'PriceTable',
  data () {
      return {
        search: '',
        errors: 0,
        filtered: []
      }
    },
    components: {
        PriceMassive
    },
    props : {
      items: Array
    },
    methods: {
      updateCost(e, itemId, percent){
        //Datos previos: UnitCost y UnitPrice - Datos Nuevos: Cost_Price, Unit_price
        if(!itemId){  //ItemId
          itemId = e.target.id.substring(1);
        }
        let row = this.idIndexOf(itemId);   //Row
        if (e && e.target.value === ''){ //BORRADO MANUAL
          console.log("borrado manual")
          this.items[row].cost_price = null;
          this.items[row].unit_price = null;
          this.items[row].rise = null;
          this.items[row].profit = null;
        }else{  
            if(!percent){
              //aAUMENTO MANUAL DE COSTO
              this.items[row].cost_price = Math.round(e.target.value);
              //Aumento = ( nuevo costo - costo anterior) * 100) / costo anterior
              this.items[row].rise =  Number.parseFloat(( ( parseFloat(this.items[row].cost_price) - parseFloat(this.items[row].unitCost)) * 100 ) / parseFloat(this.items[row].unitCost)).toFixed(2) 
            }else{
              //AUMENTO MASIVO DE COSTO, con itemId ya identificado
              //update cost
              this.items[row].rise = parseFloat(percent)
              this.items[row].cost_price = Math.ceil( (parseFloat(this.items[row].unitCost) * (100 + parseFloat(percent))) /100);
            }
          
            //ACTUALIZACIÓN DE PRECIO SEGÚN COSTO (MANUAL Y MASIVO)
            //Rentabilidad = ( ( precio - costo ) * 100 ) / costo
            let profit = ( ( parseFloat(this.items[row].unitPrice) - parseFloat(this.items[row].unitCost )) * 100) / parseFloat(this.items[row].unitCost);
            this.items[row].profit = Number.parseFloat(profit).toFixed(2)
            //Precio = costo + ( ( costo * rentabilidad ) * 100 )
            this.items[row].unit_price = Math.round(parseFloat(this.items[row].cost_price) + ( ( parseFloat(this.items[row].cost_price)  * profit) / 100 )); //asigno nuevo precio
        }
       
      },
       updatePrice(e){
        let itemId = e.target.id.substring(1);
        let row =   this.idIndexOf(itemId);
        let inputValue = e.target.value;
        this.items[row].unit_price = parseInt(inputValue);

        //calculate new revenue
        this.items[row].profit =  Number.parseFloat((parseFloat(this.items[row].unit_price) - parseFloat(this.items[row].cost_price) * 100) / parseFloat(this.items[row].cost_price)).toFixed(2);
       
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
        else if (number < this.$minRisePercent)  return 'red'
        else if (number === 0) return 'default'
        else if (number > this.$maxRisePercent) return 'purple'
        else return 'primary'
      },
      getProfitColor (number) {
        if (number === null) return 'default'
        else if (number < this.$minRentPercent) return 'red'
        else if (number > this.$minRentPercent && number < this.$maxRentPercent ) return 'primary'
        else return 'purple'
      },
      rise (percent){
        this.filtered.forEach(item => this.updateCost(null,item.item_id, percent));
      },
      getFiltered(e){
        this.filtered = e;
      },

   },

 computed: {
      headers () {
        return [
          { text: 'Codigo', value: 'itemNumber' },
          { text: 'Item', value: 'name' },
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
  text-align: right;
  border-width: thin;
  width: 90px;
  padding-right: 5px;
}
</style>
