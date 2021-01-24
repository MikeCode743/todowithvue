<template>
  <div>
      <v-chip color="blue" dark class="my-3">
    <h3 > Bitcoin Economic Indicators </h3>
      </v-chip>
    <CalendarComponent />
  </div>
</template>

<script>
import CalendarComponent from "@/components/Calendar.vue";

export default {
  name: "calendar",
  components: {
    CalendarComponent,
  },
};
</script>
