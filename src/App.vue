<template>
  <v-app>
    <v-main fluid>
      <Navbar/>

      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Navbar from "./components/Base/Toolbar";

export default {
  name: "App",

  components: {
    HelloWorld,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
