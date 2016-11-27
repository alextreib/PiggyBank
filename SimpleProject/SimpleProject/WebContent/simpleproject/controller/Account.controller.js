var _caller;

sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "simpleproject/model/models"
  ], function (JSONModel, Controller, models) {
    "use strict";

    return Controller.extend("simpleproject.controller.Account", {
        onInit: function () {
          var me = this;
          models.getList("accounts", function(accounts) {
            console.log(accounts);
            me.getView().setModel(accounts);
          });
		var router =  this.getOwnerComponent().getRouter();
		router.getRoute("Account").attachMatched(this._onRouteMatched,this);
        },
        _onRouteMatched : function(oEvent){
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		oView = this.getView();
		_caller = this.getView();
			this.getAccounts(_caller);
	},
	
	  getAccounts: function(oCaller ) {
		  jQuery.ajax({
		                type: "GET",
		                contentType: "application/x-www-form-urlencoded",
		                url: "https://hackathon.postbank.de:443/bank-api/gold/postbankid/?refreshCache=false",
		                dataType: "json",
		                headers: {
		                 "API-Key": "485430390021fc15",
		     "x-auth": _token_id,
		                },
		      success: function (data) {
		      	
		      	var model = new sap.ui.model.json.JSONModel(data);
		      	var acc = model.getProperty("/accounts");
		      	var newAcc = {
		      		"accountHolder":"Mario Liebeafdm",
		      		"accountNumber":"Mario.Liebeafdm@paypal.com",
		      		"accountReference":null,
		      		"accountType":"PRIVATE",
		      		"amount":"84.00",
		      		"amountAvailable":null,
		      		"bankName":"PayPal",
		      		"bic":"",
		      		"creditLimit":"4000.00",
		      		"currency":"EUR",
		      		"paymentName":"Mario Liebeafdm",
		      		"productDescription":"PayPal"
		      	};
		      	acc.push(newAcc);
		      	newAcc = {
		      		"accountHolder":"Mario Liebeafdm",
		      		"accountNumber":"Mario.Liebeafdm@satoshi-pay.com",
		      		"accountReference":null,
		      		"accountType":"PRIVATE",
		      		"amount":"34.83523523",
		      		"amountAvailable":null,
		      		"bankName":"BitCoin",
		      		"bic":"",
		      		"creditLimit":"4000.00",
		      		"currency":"BTC",
		      		"paymentName":"Mario Liebeafdm",
		      		"productDescription":"BitCoin"
		      	};
		      	acc.push(newAcc);
		      	model.setProperty("/accounts", acc);
		      	oCaller.setModel(model);
		      	
		      	sap.ui.getCore().setModel(model,"mAcc");
		      },
		      error: function (data) {
		      				sap.ui.commons.MessageBox.alert(
									"Oops there is something happend.... " + data.toString());
		      }
			});
	},
	  onNavBack: function(){
	        window.history.go(-1);
	  }
    });
});