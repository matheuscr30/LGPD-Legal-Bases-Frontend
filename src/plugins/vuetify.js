import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#034879",
        secondary: colors.blue.darken3,
        accent: colors.pink.base,
        error: colors.red.darken1,
        warning: colors.orange.base,
        info: colors.teal.base,
        success: colors.green.base
      }
    }
  },
  icons: {
    iconfont: "md"
  }
});
