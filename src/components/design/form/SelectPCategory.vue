<template>
      <v-select :items="categories"  @change="changePCategory"  label="Categoría"  item-value='id' item-text='title' ></v-select>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SelectPCategory',
    async created() {
    axios.get("http://localhost:8080/poption/pcategory").then((result) => {
        let categories = result.data.categories;
        this.categories = categories;
        console.log(categories);
    })
  },
  methods : {
      changePCategory (newValue){
        console.log('onChangePCategory: ' + newValue);
        this.selectedCategory = newValue;
        this.$emit('pCategoryChange', newValue);
      }
  },
   data() {
        return {
            selectedCategory: null,
             categories: [],
        }
    },
 
}
</script>
<style scoped>

</style>
