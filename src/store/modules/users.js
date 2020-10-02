import axios from "axios";

const API_URL = process.env.VUE_APP_ROOT_API + process.env.VUE_APP_API_BOX;

const state = {
  users: []
};

const getters = {
  users(state) {
    return state.users;
  },
  getUserById: state => id => {
    return state.users.find(user => user._id === id);
  }
};

const mutations = {
  ADD_USER(state, user) {
    state.users.push(user);
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  UPDATE_USER(state, user) {
    let pos = state.users.findIndex(obj => obj._id === user._id);
    state.users[pos] = user;
  }
};

const actions = {
  async createUser({ commit, getters }, data) {
    let userTypes = getters.userTypes;
    if (data.userType === userTypes.NATURAL_PERSON) {
      /* Saving Date as Timestamp */
      data.birthDate = new Date(data.birthDate).getTime();
      data.cpf = data.cpf.replace(/\D/g, "");
    } else {
      data.cnpj = data.cnpj.replace(/\D/g, "");
    }

    if (data.residentialNumber)
      data.residentialNumber = data.residentialNumber.replace(/\D/g, "");
    if (data.cellPhoneNumber)
      data.cellPhoneNumber = data.cellPhoneNumber.replace(/\D/g, "");
    if (data.cep) data.cep = data.cep.replace(/\D/g, "");

    try {
      const res = await axios.post(API_URL, data);
      let user = res.data;
      commit("ADD_USER", user);
      return {
        error: false,
        data: user
      };
    } catch (err) {
      return {
        error: true,
        msg: err
      };
    }
  },
  async loadUser({ commit }, id) {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      let user = res.data;

      if (Object.keys(user).length === 0) {
        return {
          error: true,
          data: "Usuario nao encontrado"
        };
      }

      commit("ADD_USER", user);
      return {
        error: false,
        data: user
      };
    } catch (err) {
      return {
        error: true,
        msg: err
      };
    }
  },
  async loadUsers({ commit }) {
    try {
      const res = await axios.get(`${API_URL}`);
      let users = res.data;
      commit("SET_USERS", users);
      return {
        error: false,
        data: users
      };
    } catch (err) {
      return {
        error: true,
        msg: err
      };
    }
  },
  async updateUser({ commit, getters }, data) {
    let id = data._id;

    let userTypes = getters.userTypes;
    if (data.userType === userTypes.NATURAL_PERSON) {
      /* Saving Date as Timestamp */
      data.birthDate = new Date(data.birthDate).getTime();
      data.cpf = data.cpf.replace(/\D/g, "");
    } else {
      data.cnpj = data.cnpj.replace(/\D/g, "");
    }

    if (data.residentialNumber)
      data.residentialNumber = data.residentialNumber.replace(/\D/g, "");
    if (data.cellPhoneNumber)
      data.cellPhoneNumber = data.cellPhoneNumber.replace(/\D/g, "");
    if (data.cep) data.cep = data.cep.replace(/\D/g, "");

    try {
      await axios.put(`${API_URL}/${id}`, data);
      commit("UPDATE_USER", data);
      return {
        error: false,
        data: data
      };
    } catch (err) {
      return {
        error: true,
        msg: err
      };
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
