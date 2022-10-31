<template>
  <nav>
    <h1><router-link to="/">AlfaTek</router-link></h1>
    <ul>
      <li v-show="userLogin">
        <button class="btn btn-warning text-white" @click="logout">
          Çıkış Yap
        </button>
      </li>

      <li v-show="!userLogin">
        <router-link to="/login">Giriş Yap</router-link>
      </li>
      <li v-show="!userLogin">
        <router-link to="/signup" class="btn btn-warning text-white"
          >Kayıt Ol</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default {
  props: ["userLogin"],
  methods: {
    logout() {
      const { cookies } = useCookies();
      let token = cookies.get("jwt");
      if (token) {
        cookies.remove("jwt");
        token = null;
        this.$store.state.userLogedin.userLogin = false;
        this.$store.state.userLogedin.userId = null;
        this.$router.push("/login");
      }
    },
  },
};
</script>
