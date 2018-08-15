function Account(api) {
  this.api = api;
}

Account.prototype = {
  info: function (callback) {
    this.api.requestMixin('GET', 'https://api.mixin.one/me', undefined, function(resp) {
      return callback(resp);
    });
  },

  authenticate: function (callback, authorizationCode) {
    var params = {
      "code": authorizationCode,
      "client_secret": CLIENT_SECRET,
      "client_id": CLIENT_ID
    };
    this.api.requestMixin('POST', 'https://api.mixin.one/oauth/token', params, function(resp) {
      if (resp.data) {
        window.localStorage.setItem('token', resp.data.access_token);
        window.localStorage.setItem('scope', resp.data.scope);
      }
      return callback(resp);
    });
  },

  userId: function () {
    return window.localStorage.getItem('user_id');
  },

  token: function () {
    return window.localStorage.getItem('token');
  },

  loggedIn: function() {
    return window.localStorage.getItem('token') !== "";
  },

  clear: function (callback) {
    window.localStorage.clear();
    if (typeof callback === 'function') {
      callback();
    }
  }
};

export default Account;