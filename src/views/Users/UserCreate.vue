<template>
  <v-row class="my-2">
    <v-col cols="7" class="mx-auto">
      <UserForm />
    </v-col>
  </v-row>
</template>

<script>
import UserForm from "@/components/Forms/UserForm";

export default {
  name: "UserCreate",
  components: { UserForm }
};
</script>

<style scoped></style>
