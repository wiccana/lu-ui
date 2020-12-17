<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
      :search="search"
         >

    </v-data-table>
  </div>
</template>

<script>

export default {
  name: 'PriceTable',
  data () {
      return {
        search: '',
        items: []
      }
    },
    created() {
        console.log()
        this.initialize()
      },
    
    methods: {
      initialize(){
        this.items =  [
          {
            id: 1,
            name: 'Pinza plastico',
            supplierName: 'Zatecno',
            supplierID: 12,
            code: 6.0,
            category: 'Herramientas',
            unitCost: 20,
            unitPrice: 40,
            lastUpdatedDate: '2020-12-17',
            newUnitCost: null,
            newUnitPrice: null
          },
          {
            id: 2,
            name: 'Pinza plastico',
            supplierName: 'Zatecno',
            supplierID: 12,
            code: 6.0,
            category: 'Herramientas',
            unitCost: 20,
            unitPrice: 40,
            lastUpdatedDate: '2020-12-17',
            newUnitCost: null,
            newUnitPrice: null
          },
          {
            id: 3,
            name: 'Lamparita 12v',
            supplierName: 'Zatecno',
            supplierID: 12,
            code: 6.0,
            category: 'Lamparas',
            unitCost: 20,
            unitPrice: 40,
            date: '2020-12-15',
            newUnitCost: null,
            newUnitPrice: null
          },
        ]
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
          { text: 'Costo', value: 'unitCost' },
          { text: 'Precio', value: 'unitPrice' },
          { text: 'Fecha', value: 'date' },
          { text: 'Nuevo Costo', value: 'newUnitCost' },
          { text: 'Nuevo Precio', value: 'newUnitPrice' },

        ]
      },
    }
 }
</script>
