export default {
  computed: {
    $isMobile() {
      return (
        this.$vuetify.breakpoint.name === "xs" ||
        this.$vuetify.breakpoint.name === "sm"
      );
    }
  }
};
