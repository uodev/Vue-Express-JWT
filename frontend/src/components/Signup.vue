<template>
  <div class="d-flex justify-content-center align-items-center mt-5">
    <form>
      <h2>Kayıt Ol</h2>
      <div class="mb-3">
        <label for="fullname" class="form-label">Ad Soyad</label>
        <input
          name="fullname"
          type="text"
          class="form-control"
          id="fullname"
          v-model="user.fullname"
          required
        />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Kullanıcı Adı</label>
        <input
          name="username"
          type="text"
          class="form-control"
          id="username"
          v-model="user.username"
          required
        />
      </div>

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

      <button @click="signupUser" class="btn btn-warning text-white">
        kayıt ol
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
        fullname: "",
        username: "",
      },
    };
  },
  methods: {
    signupUser(e) {
      e.preventDefault();

      this.$axios
        .post("http://localhost:8080/signup", this.user)
        .then((res) => {
          console.log("response: ", res);
          this.$store.state.userLogedin.userLogin = true;
          this.$store.state.userLogedin.userId = res.data.user;

          this.$router.push({
            name: "HomePage",
          });
        })
        .catch((err) => {
          console.log("hata: ", err.response.data.errors);
          const errors = err.response.data.errors;
          this.errors = errors;
        });
    },
  },
};
</script>
