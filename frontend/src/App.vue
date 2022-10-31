<template>
  <div>
    <HeaderVue :userLogin="this.$store.state.userLogedin.userLogin" />
  </div>
  <router-view></router-view>
</template>

<script>
//import axios from "axios";
import HeaderVue from "./components/Header.vue";
import jwt from "jsonwebtoken";
import { useCookies } from "vue3-cookies";

export default {
  components: {
    HeaderVue,
  },

  mounted() {
    const { cookies } = useCookies();

    const token = cookies.get("jwt");
    if (token) {
      jwt.verify(token, "alfateksecret", async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(decodedToken);
          this.$store.state.userLogedin.userLogin = true;
          this.$store.state.userLogedin.userId = decodedToken.id;
        }
      });
    }
  },
};
</script>
