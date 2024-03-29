<template>
  <div class="d-flex flex-column" style="width: 60%">
    <h1 class="mb-4">Perfil</h1>
    <h2 class="mb-4">Avatar</h2>
    <div class="d-flex mb-4">
      <div class="d-flex flex-column pr-12">
        <v-avatar class="ma-auto" size="160" color="#252525">
          <template v-if="image">
            <img :src="image" :alt="this.username" />
          </template>
        </v-avatar>
      </div>
      <div class="mt-4" style="width: 50%">
        <v-form ref="imageInfo" v-model="URLValid">
          <v-text-field
            v-model="image"
            label="URL perfil"
            outlined
            :rules="URLRules"
            :counter="255"
          >
          </v-text-field>
        </v-form>
        <v-btn rounded depressed large elevation="0" @click="deleteImage()">
          Borrar foto de perfil
        </v-btn>
      </div>
    </div>
    <h2 class="mb-4 mt-2">Información personal</h2>
    <div class="d-flex">
      <v-text-field
        disabled
        v-model="username"
        label="Nombre de usuario"
        outlined
      >
      </v-text-field>
      <v-text-field
        class="ml-4"
        disabled
        v-model="email"
        label="Correo electrónico"
        outlined
      >
      </v-text-field>
    </div>
    <v-form ref="userInfo" v-model="userInfoValid">
      <div class="d-flex">
        <v-text-field
          v-model="firstName"
          label="Nombre"
          outlined
          :rules="nameRules"
          :counter="50"
        >
        </v-text-field>
        <v-text-field
          class="ml-4"
          v-model="lastName"
          label="Apellido"
          outlined
          :rules="lastNameRules"
          :counter="50"
        >
        </v-text-field>
      </div>
      <v-select
        class="pr-2"
        :items="genders"
        v-model="gender"
        label="Género"
        outlined
        style="width: 50%"
      >
      </v-select>
    </v-form>
    <div class="d-flex">
      <v-btn
        class="mt-16 px-16"
        :disabled="!userInfoValid || !URLValid"
        rounded
        depressed
        large
        color="accent"
        elevation="0"
        @click="saveChanges()"
      >
        Guardar cambios
      </v-btn>
    </div>
    <v-snackbar v-model="snackbar" rounded="lg" :color="snackbarColor">
      <div class="d-flex align-center justify-center">
        <strong class="mr-4">{{snackbarText}}</strong>
        <v-progress-circular size="18" v-if="loading" indeterminate color="white"></v-progress-circular>
        <v-icon class="ml-4" size="18" v-if="!loading && !done">
          mdi-alert-circle
        </v-icon>
        <v-icon v-if="done" class="float-right material-icons-round" size="18" color="white">check_circle</v-icon>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { UserData } from "../api/user";
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "../stores/securityStore.js";

export default {
  data() {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      genders: ["Hombre", "Mujer", "Otro"],
      gendersApi: {
        Hombre: "male",
        Mujer: "female",
        Otro: "other",
      },
      gender: "",
      image: "",
      show: false,
      snackbar: false,
      snackbarColor: "#252525",
      snackbarText: 'Cargando',
      timeout: 10 * 1000,
      loading: true,
      nameRules: [
        (v) => v.length <= 50 || "El nombre debe tener menos de 50 caracteres",
      ],
      lastNameRules: [
        (v) =>
          v.length <= 50 || "El apellido debe tener menos de 50 caracteres",
      ],
      URLRules: [
        v => (v.length <= 255) || 'El URL debe tener menos de 255 caracteres',
      ],
      URLValid: true,
      userInfoValid: true,
      done:false,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      currentUser: "user",
      $token: "token",
    }),
    genderApi() {
      return this.gender ? this.gendersApi[this.gender] : "";
    },
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: "getCurrentUser",
      $modifyUser: "modifyUser",
      $deleteAccount: "deleteAccount",
    }),
    snackbarLoading() {
      this.done=false;
      this.loading = true;
      this.error = false;
      this.snackbarText = "Cargando";
      this.snackbarColor = "#252525";
      this.timeout = 65 * 1000;
      this.snackbar = true;
    },
    snackbarError(errorMessage) {
      this.done=false;
      this.loading = false;
      this.error = true;
      this.snackbarText = errorMessage;
      this.snackbarColor = "error";
      this.timeout = 5 * 1000;
      this.snackbar = true;
    },
    snackbarSuccess(successMessage) {
      this.loading = false;
      this.error = false;
      this.snackbarText = successMessage;
      this.snackbarColor = "#252525";
      this.timeout = 5 * 1000;
      this.done=true;
      this.snackbar = true;
    },
    saveChanges() {
      this.snackbarLoading();
      this.$modifyUser(
        new UserData(this.firstName, this.lastName, this.genderApi, this.image)
      )
        .then(() => {
          this.snackbarSuccess("Cambios guardados!");
        })
        .catch(() => this.snackbarError("Sin conexión"));
    },

    deleteImage() {
      this.image = "";
    },
  },
  created() {
    this.$getCurrentUser().then((currentUser) => {
      this.username = currentUser.username;
      this.email = currentUser.email;
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.gender = Object.keys(this.gendersApi).find(
        (key) => this.gendersApi[key] === currentUser.gender
      );
      this.image = currentUser.avatarUrl;
    });
  },
};
</script>

<style>
.form {
  width: 35%;
  margin: auto;
}
</style>
