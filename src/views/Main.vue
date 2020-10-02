<template>
  <v-app>
    <v-main>
      <v-snackbar
        v-model="snackbarMsg.active"
        :color="snackbarMsg.color"
        multi-line
        top
      >
        {{ snackbarMsg.text }}
        <v-btn dark text @click="snackbarMsg.active = false">
          Close
        </v-btn>
      </v-snackbar>

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { EventBus } from "@/plugins/eventBus.js";

export default {
  name: "Main",
  data() {
    return {
      snackbarMsg: {
        active: false,
        color: "",
        text: ""
      }
    };
  },
  watch: {
    $isMobile() {
      this.drawerMenu = !this.$isMobile;
    }
  },
  created() {
    if (this.$route.name === "main") this.$router.push({ name: "UserCreate" });

    EventBus.$on("newMsg", ({ text, error }) => {
      this.snackbarMsg.text = text;
      this.snackbarMsg.color = error ? "error" : "success";
      this.snackbarMsg.active = true;
    });
  }
};
</script>

<style scoped lang="scss">
.v-toolbar {
  .v-icon {
    font-size: 19px !important;
  }
}

.v-list-item {
  .fa-icons {
    color: rgba(0, 0, 0, 0.54);
    font-size: 17px !important;
    margin-left: 4px;
  }

  &.v-list-item--active {
    .fa-icons {
      color: var(--v-primary-base);
    }
  }
}
</style>
