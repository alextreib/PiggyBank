sap.ui.define([
], function () {
      "use strict";
      return {
    //////////////////////////////////////////////
    // Need to be configuriert
    //////////////////////////////////////////////
    clientId: "rWTRg0sIytfGP505Xg4ONutFaI4S6inh",
    clientSecret: "UmVdut9BukkVEmFb",
    tenant: "piggybank",
    client: "piggybank.app",
    scopes: "hybris.document_view hybris.document_manage",
    api: "https://api.beta.yaas.io/hybris",
    //////////////////////////////////////////////
      _getOAuthToken: function(callback) {
        jQuery.ajax({
              type: "POST",
              url: this.api + "/oauth2/v1/token",
              data: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                  grant_type: "client_credentials",
                  scope: this.scopes
              },
              dataType: "json",
              success: function (data) {
                callback(data.access_token);
              }
          });
      },
      getList: function (table, callback) {
        var me = this;
        me._getOAuthToken(function(oauth_token) {
          jQuery.ajax({
                  type: "GET",
                  url: me.api + "/document/v1/" + me.tenant + "/" + me.client + "/data/" + table,
                  dataType: "json",
                  headers: {
                    Authorization: 'Bearer ' + oauth_token
                },
                  success: function (data) {
                    callback(data);
                  }
              });
        });
      },
      get: function (table, id, callback) {
        var me = this;
        me._getOAuthToken(function(oauth_token) {
          jQuery.ajax({
                  type: "GET",
                  url: me.api + "/document/v1/" + me.tenant + "/" + me.client + "/data/" + table + "/" + id,
                  dataType: "json",
                  headers: {
                    Authorization: 'Bearer ' + oauth_token
                },
                  success: function (data) {
                    callback(data);
                  }
              });
        });
      },
      create: function (table, obj, callback) {
        var me = this;
        me._getOAuthToken(function(oauth_token) {
          jQuery.ajax({
                  type: "POST",
                  contentType: "application/json",
                  url: me.api + "/document/v1/" + me.tenant + "/" + me.client + "/data/" + table,
                  data: JSON.stringify(obj),
                  dataType: "json",
                  headers: {
                    Authorization: 'Bearer ' + oauth_token
                },
                  success: function (data) {
                    callback(data);
                  }
              });
        });
      }
  };
});