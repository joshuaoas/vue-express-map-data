<template>
  <div>
    <!--
    <div id="v-step-0">A DOM element on your page. The first step will pop on this element because its ID is 'v-step-0'.</div>
    <div id="v-step-1">A DOM element on your page. The second step will pop on this element because its ID is 'v-step-1'.</div>
    <div id="v-step-2">A DOM element on your page. The third and final step will pop on this element because its ID is 'v-step-2'.</div>
-->
    <v-tour name="aclookupTour" :steps="steps" :callbacks="myCallbacks">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :step="tour.steps[tour.currentStep]"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :skip="tour.skip"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <template v-if="tour.currentStep === 4">
              <div slot="actions">
                <button
                  @click="tour.skip"
                  class="v-step__button v-step__button-previous"
                >
                  Skip tour
                </button>
                <button
                  @click="tour.previousStep"
                  class="v-step__button v-step__button-previous"
                >
                  Previous step
                </button>
                <button
                  @click="tour.stop"
                  class="v-step__button v-step__button-skip"
                >
                  Got it!
                </button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
export default {
  name: "aclookup-tour",
  data() {
    return {
      steps: [
        {
          target: "#aclookup-step-1", // We're using document.querySelector() under the hood
          header: {
            title: "Search",
          },
          content: `<p style="font-weight: 300;">This section contains general information about the area contractor locator</p>`,
          params: {
            placement: "bottom-start", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: "#aclookup-step-2",
          header: {
            title: "Page through ACs",
          },
          content: `
            <p style="font-weight: 300;">Quickly look through pages of area contractors</p>
            `,
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: "#aclookup-step-3",
          header: {
            title: "US Map",
          },
          content:
            '<p style="font-weight: 300;">Select a US state to see the area contractor information for the area</p>',
          params: {
            placement: "right-end", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: "#aclookup-step-4",
          header: {
            title: "Canadian Map",
          },
          content:
            '<p style="font-weight: 300;">Quickly select a Canadian province to see the area contractor information for the area</p>',
          params: {
            placement: "right-end", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
      ],
      myCallbacks: {
        onSkip: this.customSkipStepCallback,
      },
    };
  },
  methods: {
    customSkipStepCallback: function () {
      console.log("Hello");
      this.$store.commit("hideTour");
      this.$noty.success(
        "The help tour has been disabled, you can enable it again in the top menu under your name!"
      );
    },
  },
  mounted: function () {
    this.$tours["aclookupTour"].start();
  },
};
</script>
<style>
.v-step {
  /*background: #F16231!important;*/
  background: #50596c;
  background: #5f6d7b !important;
  color: #fff;
  max-width: 320px;
  border-radius: 3px;
  -webkit-filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
  padding: 1rem;
  text-align: center;
  z-index: 10000;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.18);
}
.v-step__header {
  margin: -1rem -1rem 0.5rem;
  padding: 0.5rem;
  background-color: #454d5d;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
</style>
