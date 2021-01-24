<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-date-picker
            v-model="date"
            :min="min"
            :max="max"
            full-width
            locale="es-sv"
            @change="getBitcoin(date)"
          ></v-date-picker>
          <v-card-actions>
            <v-chip class="ma-2" :color="color" label text-color="white">
              <v-icon left>
                mdi-label
              </v-icon>
              {{ value }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CalendarComponent",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      max: new Date().toISOString().substr(0, 10),
      min: "2009",
      value: null,
      color: null,
    };
  },
  methods: {
    async getBitcoin(date) {
      let arrayDate = date.split(["-"]);
      let ddmmyy = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
      try {
        let bitcoin = await axios.get(
          `https://mindicador.cl/api/bitcoin/${ddmmyy}`
        );
        // console.log(bitcoin.data.serie[0].valor)
        if (bitcoin.data.serie.length > 0) {
          this.value = bitcoin.data.serie[0].valor;
          this.color = "pink";
        } else {
          this.value = "unchanged";
          this.color = "secondary";
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getBitcoin(this.date);
  },
};
</script>
