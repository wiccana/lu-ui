<template>
  <div>
      <v-select
          v-model="selectedPaymentTypes"
          :items="paymentTypes"
          :menu-props="{ maxHeight: '400' }"
          label="Tipo de Pago"
          multiple
          hint="Seleccione tipo de pago"
          persistent-hint
           @change="selectPaymentType"
        ></v-select>
  </div>
</template>
<script>
export default {
  name: 'PaymentTypeSelect',
  data: () => ({
        selectedPaymentTypes: [],
        paymentTypes: [
          'cash', 'debit'
        ],
    }),
  methods: {
      selectPaymentType: function() {
        this.$emit('set-payment-type', this.selectedPaymentTypes);
     }
    }
}

</script>
