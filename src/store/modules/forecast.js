const axios = require("axios"),
  moment = require("moment");

const state = {
  currently: {},
  daily: [],
  hourly: []
}

const getters = {
  currently: state => {
    return state.currently;
  },
  daily: state => {
    console.log("Get daily", state.daily);
    return state.daily;
  },
  hourly: state => {
    return state.hourly;
  }
}

const mutations = {
  setCurrently: (state, payload) => {
    // Convert time to local and format
    payload.date = moment.unix(payload.date).local().format("ddd HH");
    state.currently = payload;
  },
  setDaily: (state, payload) => {
    // Convert time to local and format
    let forecasts = payload.map((forecast) => {
      forecast.date = moment.unix(forecast.date).format("ddd DD");
      return forecast;
    })

    state.daily = forecasts;
  },
  setHourly: (state, payload) => {
    // Convert time to local and format
    let forecasts = payload.map((forecast) => {
      forecast.date = moment.unix(forecast.date).format("ddd, HH:00");
      return forecast;
    })
    state.hourly = forecasts;
  }
}

const actions = {
  getForecast(context) {
    var lat = this.getters.lat;
    var lon = this.getters.lon;
    var url = "http://localhost:3000/api/forecast/" + lat + "/" + lon;

    axios.get(url)
      .then((res) => {

        context.commit('setCurrently', res.data.currently);
        context.commit('setDaily', res.data.daily);
        context.commit('setHourly', res.data.hourly);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}