<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
         <v-btn color="primary" 
          v-bind="attrs"
          v-on="on"
          @click="preview">
          Guardar
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Confirmar Cambios
        </v-card-title>

        <v-card-text>
            <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-check-bold</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Registros ok</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              {{ok}}
            </v-list-item-action>
          </v-list-item>

           <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-alert-box</v-icon>
              </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Posibles errores</v-list-item-title>
            </v-list-item-content>
             <v-list-item-action>
              {{notOk}}
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Total a confirmar</v-list-item-title>
            </v-list-item-content>
               <v-list-item-action>
              {{filtered.length}}
            </v-list-item-action>
          </v-list-item>
        </v-list>

          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="save"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';
  export default {
    data () {
      return {
        dialog: false,
        ok: 0,
        notOk: 0,
        filtered: []
      }
    },
     props : {
      items: Array
    },
    methods: {
      preview: function() {
        this.filtered = this.filterUpdatedItems(this.items);
        let notOk = 0;
        let ok = 0;
        this.filtered.forEach(function(item){
          if (item.rise < 1 || item.profit < 55) {notOk = notOk + 1}
          else {ok = ok + 1;}
        });
        this.notOk = notOk;
        this.ok = ok;
        
      },
         save: function () {
        if (this.filtered.length > 0){
          axios.post("http://localhost:8080/items", 
              this.filtered
          ).then(response => {
               console.log(response)
                this.$emit('refresh-items');
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
      },
    }
  }
</script>