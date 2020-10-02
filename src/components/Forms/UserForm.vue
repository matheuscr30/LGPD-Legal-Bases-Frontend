<template>
  <v-card elevation="24">
    <v-card-title class="primary white--text pl-5">
      <span>Cadastrar Usuário</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-form ref="userForm" v-model="validation.validForm" lazy-validation>
        <v-row no-gutters class="mt-2">
          <v-col cols="12" class="mt-3 text-center">
            <div class="avatar-container">
              <v-avatar color="primary" size="128" class="avatar-photo">
                <v-img
                  v-if="validation.auxiliary.photoSrc"
                  :src="validation.auxiliary.photoSrc"
                ></v-img>
                <v-icon dark v-else>account_circle</v-icon>
              </v-avatar>

              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2 btn-change-photo"
                    text
                    icon
                    v-on="on"
                    @click.stop="triggerPhotoInput"
                  >
                    <v-icon x-large>create</v-icon>
                  </v-btn>
                </template>
                <span>Alterar Foto</span>
              </v-tooltip>

              <v-tooltip right v-if="validation.auxiliary.photoSrc">
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2 btn-remove-photo"
                    text
                    icon
                    v-on="on"
                    @click.stop="removePhoto"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </template>
                <span>Remover Foto</span>
              </v-tooltip>
            </div>

            <v-file-input
              ref="profilePhotoInput"
              @change="getPhoto"
              v-model="validation.models.profilePhoto"
              v-show="false"
              accept="image/png, image/jpeg, image/bmp"
            ></v-file-input>
          </v-col>

          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-text-field
                  v-model="validation.models.email"
                  prepend-icon="mail"
                  :rules="validation.rules.email"
                  tabindex="1"
                  label="Email *"
                  requried
                />
              </v-col>

              <v-col cols="auto" align-self="center" class="pl-2">
                <v-tooltip left max-width="250">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      help_outline
                    </v-icon>
                  </template>
                  <span>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>

          <v-row no-gutters class="mt-2">
            <v-col>
              <v-text-field
                v-model="validation.models.password"
                prepend-icon="vpn_key"
                :append-icon="
                  validation.auxiliary.showPassword
                    ? 'visibility_off'
                    : 'visibility'
                "
                :type="validation.auxiliary.showPassword ? 'text' : 'password'"
                :rules="validation.rules.password"
                @click:append="
                  validation.auxiliary.showPassword = !validation.auxiliary
                    .showPassword
                "
                tabindex="2"
                label="Senha *"
                required
              />
            </v-col>

            <v-col class="pl-3">
              <v-text-field
                v-model="validation.models.confirmPassword"
                :append-icon="
                  validation.auxiliary.showConfirmPassword
                    ? 'visibility_off'
                    : 'visibility'
                "
                :type="
                  validation.auxiliary.showConfirmPassword ? 'text' : 'password'
                "
                @click:append="
                  validation.auxiliary.showConfirmPassword = !validation
                    .auxiliary.showConfirmPassword
                "
                :error-messages="passwordMatchError()"
                tabindex="3"
                label="Confirmar Senha *"
                required
              />
            </v-col>

            <v-col cols="auto" align-self="center" class="pl-2 pb-1">
              <v-tooltip left max-width="250">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on">
                    help_outline
                  </v-icon>
                </template>
                <span>
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </span>
              </v-tooltip>
            </v-col>
          </v-row>

          <v-col cols="12" class="mt-2">
            <span class="subtitle-2 secondary--text">Informações Pessoais</span>
          </v-col>

          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-text-field
                  v-model="validation.models.name"
                  :rules="validation.rules.name"
                  tabindex="4"
                  label="Nome *"
                  required
                />
              </v-col>

              <v-col cols="auto" align-self="center" class="pl-2">
                <v-tooltip left max-width="250">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      help_outline
                    </v-icon>
                  </template>
                  <span>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-text-field
                  v-model="validation.models.cpf"
                  :rules="validation.rules.cpf"
                  v-mask="validation.auxiliary.masks.cpf"
                  tabindex="5"
                  label="CPF *"
                  required
                />
              </v-col>

              <v-col cols="auto" align-self="center" class="pl-2">
                <v-tooltip left max-width="250">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      help_outline
                    </v-icon>
                  </template>
                  <span>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="auto">
                <span class="subtitle-2 secondary--text">Endereço</span>
              </v-col>

              <v-col cols="auto" class="ml-2">
                <v-tooltip right max-width="250" class="pl-2">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      help_outline
                    </v-icon>
                  </template>
                  <span>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>

          <v-row no-gutters>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="validation.models.cep"
                v-mask="validation.auxiliary.masks.cep"
                :rules="validation.rules.cep"
                :loading="validation.auxiliary.loadingAddress"
                :error-messages="validation.auxiliary.errorAddress"
                @input="loadAddress($event)"
                tabindex="6"
                label="CEP"
              />
            </v-col>

            <v-col cols="12" md="4" class="pl-md-3">
              <v-text-field
                v-model="validation.models.city"
                label="Cidade"
                readonly
              />
            </v-col>

            <v-col cols="12" md="4" class="pl-md-3">
              <v-text-field
                v-model="validation.models.state"
                label="Estado"
                readonly
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="validation.models.address"
                label="Endereço"
                readonly
              />
            </v-col>

            <v-col cols="4" class="pl-3">
              <v-text-field
                v-model="validation.models.addressNumber"
                tabindex="7"
                type="number"
                min="1"
                step="1"
                label="Número"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="validation.models.neighbourhood"
                label="Bairro"
                readonly
              />
            </v-col>

            <v-col cols="12" sm="6" class="pl-sm-3">
              <v-text-field
                v-model="validation.models.additionalAddress"
                tabindex="8"
                label="Complemento"
              />
            </v-col>
          </v-row>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-col class="pb-1 px-4">
          <v-btn
            color="primary"
            class="float-right"
            @click="submit"
            tabindex="16"
            @keyup.enter="submit"
            :disabled="!validation.validForm"
            :loading="loadingForm"
          >
            <span>Cadastre-se</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { EventBus } from "@/plugins/eventBus.js";

export default {
  name: "UserForm",
  data() {
    return {
      loadingForm: false,
      validation: {
        validForm: true,
        models: {
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          cpf: "",
          cep: "",
          state: "",
          city: "",
          address: "",
          addressNumber: "",
          neighbourhood: "",
          additionalAddress: "",
          profilePhoto: null
        },
        rules: {
          email: [
            v =>
              !!v ||
              /^\s*(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(
                v
              ) ||
              "E-mail tem que ser válido"
          ],
          password: [
            v => !!v || "Senha tem que ser válida",
            v => (v && v.length >= 8) || "Mínimo 8 caracteres"
          ],
          name: [v => !!v || "Nome é obrigatório"],
          cpf: [
            v => !!v || "CPF é obrigatório",
            v =>
              /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || "CPF tem que ser válido"
          ],
          cep: [
            v =>
              !v || /^\d{2}\.\d{3}-\d{3}$/.test(v) || "CEP tem que ser válido"
          ]
        },
        auxiliary: {
          errorAddress: [],
          loadingAddress: false,
          masks: {
            cpf: "###.###.###-##",
            cep: "##.###-###"
          },
          photoSrc: null,
          showPassword: false,
          showConfirmPassword: false
        }
      }
    };
  },
  mounted() {
    this.$refs.userForm.reset();
  },
  methods: {
    cleanMask(input) {
      if (!input) return null;
      return input.replace(/[^0-9]/g, "");
    },
    async loadAddress(cep) {
      cep = this.cleanMask(cep);
      if (!cep) return;

      if (cep && cep.length === 8) {
        this.validation.auxiliary.loadingAddress = true;
        let error = true;

        await this.$http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => {
            if ("erro" in response.data) return;

            this.validation.models.state = response.data.uf;
            this.validation.models.city = response.data.localidade;
            this.validation.models.address = response.data.logradouro;
            this.validation.models.neighbourhood = response.data.bairro;
            this.validation.auxiliary.errorAddress = [];
            error = false;
          })
          .catch(() => {});

        if (error) {
          this.validation.models.state = "";
          this.validation.models.city = "";
          this.validation.models.address = "";
          this.validation.models.neighbourhood = "";
          this.validation.auxiliary.errorAddress = ["CEP Inválido"];
        }

        this.validation.auxiliary.errorAddress = error ? ["CEP Inválido"] : [];
        this.validation.auxiliary.loadingAddress = false;
      }
    },
    passwordMatchError() {
      return this.validation.models.password ===
        this.validation.models.confirmPassword
        ? ""
        : "Senhas não conferem";
    },
    getPhoto(file) {
      if (file) this.validation.auxiliary.photoSrc = URL.createObjectURL(file);
    },
    removePhoto() {
      this.validation.auxiliary.photoSrc = null;
      this.validation.models.profilePhoto = null;
    },
    async submit() {
      if (this.$refs.userForm.validate()) {
        this.loadingForm = true;

        let data = {
          name: this.validation.models.name,
          username: this.validation.models.email,
          password: this.validation.models.password,
          cpf: this.cleanMask(this.validation.models.cpf),
          address: this.validation.models.address,
          number: this.validation.models.addressNumber,
          neighbourhood: this.validation.models.neighbourhood,
          complement: this.validation.models.additionalAddress,
          city: this.validation.models.city,
          state: this.validation.models.state,
          cep: this.cleanMask(this.validation.models.cep)
        };

        EventBus.$emit("newMsg", {
          text: "Usuario foi criado com sucesso!!",
          error: false
        });

        const res = await this.save(data);
        if (res) {
          EventBus.$emit("newMsg", {
            text: "Usuario foi criado com sucesso!!",
            error: false
          });
          this.$refs.userForm.reset();
        } else {
          EventBus.$emit("newMsg", {
            text: "Preencha todos os campos corretamente",
            error: true
          });
        }

        this.loadingForm = false;
      }
    },
    async save(user) {
      let status = true;
      let response = await this.$http
        .post(`${process.env.VUE_APP_ROOT_API}/consumer/create-user/`, user)
        .catch(() => {
          status = false;
        });
      return status && response.status === 204;
    },
    triggerPhotoInput() {
      this.$refs.profilePhotoInput.$el.querySelector("input").click();
    }
  }
};
</script>

<style lang="scss">
.v-form {
  .v-icon {
    font-size: 21px !important;
  }

  .v-avatar {
    .v-icon {
      font-size: 45px !important;
    }
  }
}

.v-text-field.v-input--is-readonly > .v-input__control > .v-input__slot:before {
  border-image: repeating-linear-gradient(
      to right,
      rgba(0, 0, 0, 0.38) 0px,
      rgba(0, 0, 0, 0.38) 2px,
      transparent 2px,
      transparent 4px
    )
    1 repeat;
}
</style>
