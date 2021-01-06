<template>
 <v-switch
      v-model="switch1"
      inset
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch>
 
</template>
<script>
  export default {
    data () {
      return {
        switch1: false,
      }
    },
     props : {
      massive: Boolean
    },
  }
</script>