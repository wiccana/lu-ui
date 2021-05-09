<template>
  <div>
      <v-select
          v-model="selectedTransactionTypes"
          :items="transactionTypes"
          :menu-props="{ maxHeight: '400' }"
          label="Transaccion"
          multiple
          hint="Seleccione tipo de transacción"
          persistent-hint
           @change="selectTransaction"
        ></v-select>
  </div>
</template>
<script>
export default {
  name: 'TransactionTypeSelect',
  data: () => ({
        selectedTransactionTypes: [],
        transactionTypes: [
          'expense', 'sale', 'receiving'
        ],
    }),
  methods: {
      selectTransaction: function() {
        this.$emit('set-transaction-type', this.selectedTransactionTypes);
     }
    }
}

</script>
