<template>
  <div>
      <v-select
          v-model="selectedTransactionTypes"
          :items="transactionTypes"
          :menu-props="{ maxHeight: '400' }"
          label="Transaccion"
          hint="Seleccione tipo de transacción"
          persistent-hint
           @change="selectTransactionType"
        ></v-select>

  </div>
</template>
<script>
export default {
  name: 'TransactionTypeSelect',
  data: () => ({
        selectedTransactionTypes: [],
        transactionTypes: [
          '', 'expense', 'sale', 'receiving'
        ],
    }),
  methods: {
      selectTransactionType: function() {
        this.$emit('set-transaction-type', this.selectedTransactionTypes);
     }
    }
}

</script>
