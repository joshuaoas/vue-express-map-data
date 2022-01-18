<template>
  <div class="four-ohh-four container">
    <br />
    <br />
    <section
      data-section-id="2"
      data-component-id="2c0d_16_05_awz"
      data-category="http-codes"
      class="py-5"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="h1 mb-0" data-config-id="subheader">Ooops!</h2>
            <h1 class="display-1 mb-5 mt-0" data-config-id="header">
              Error 404
            </h1>
            <p data-config-id="paragraph1">
              This 404 page probably means that somebody sat on a keyboard in
              our office and deleted what you wanted to see.
            </p>
            <p data-config-id="paragraph2">
              We're probably already fixing it - in the meantime, head home and
              see if you can find what you are looking for.
            </p>

            <router-link to="/" class="mb0 lh1 mlauto list-btn"
              >Go Home</router-link
            >
          </div>
          <div class="col-lg-6 flex-center">
            <img class="img-fluid" src="@/assets/img/sad.svg" />
          </div>
        </div>
      </div>
    </section>

    <!--
    <h1 class="title">404</h1>
    <div class="fourofour rounded">
      <div class="tc">
        <h1 class="title">404</h1>
        <img src="@/assets/img/sad.svg" />
        <p>Sorry, I couldn't find what you were looking for...</p>
      </div>
    </div>
    -->
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("showNavigation");
    // console.log(this.$route.path);
  },
};
</script>


<style scoped>
.fourofour {
  height: calc(100vh - 275px);
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tc {
  text-align: center;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center img {
  width: 50%;
}
</style>