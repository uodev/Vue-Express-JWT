<template>
  <div class="container">
    <h1>Anasayfa</h1>
    <div class="mt-5" v-if="$store.state.userLogedin.userLogin">
      <div class="row">
        <div class="col-3 mt-3" v-for="i in 12" :key="i">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center mt-5">
      <h4>İçeriği görebilmek için giriş yapmalısınız!</h4>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
