<template>
  <div class="d-flex justify-content-center align-items-center mt-5">
    <form>
      <h2>Giriş Yap</h2>

      <div class="mb-3">
        <label for="email" class="form-label">Email Adresi</label>
        <input
          name="email"
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
          required
        />
      </div>
      <div class="email error">{{ errors.email }}</div>
      <div class="mb-3">
        <label for="Password" class="form-label">Şifre</label>
        <input
          type="password"
          class="form-control"
          id="Password"
          name="password"
          v-model="user.password"
          required
        />
      </div>
      <div class="password error">{{ errors.password }}</div>

      <button @click="loginUser" class="btn btn-warning text-white">
        Giriş Yap
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {
        email: "",
        password: "",
      },
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser(e) {
      e.preventDefault();

      this.$axios
        .post("http://localhost:8080/login", this.user)
        .then((res) => {
          console.log("response: ", res);
          this.$store.state.userLogedin.userLogin = true;
          this.$store.state.userLogedin.userId = res.data.user;

          this.$router.push({
            name: "HomePage",
          });
        })
        .catch((err) => {
          console.log("hata: ", err);
          const errors = err.response.data.errors;
          this.errors = errors;
          this.$store.state.userLogedin.userLogin = false;
          this.$store.state.userLogedin.userId = "";
        });
    },
  },
};
</script>
