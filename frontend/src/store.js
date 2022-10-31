import { createStore } from "vuex";

const store = createStore({
  state: {
    userLogedin: {
      userLogin: false,
      userId: "",
    },
    token: "",
  },
});

export default store;
