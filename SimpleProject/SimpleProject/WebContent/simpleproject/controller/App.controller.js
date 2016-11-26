var _token_id;
sap.ui.controller("simpleproject.controller.App", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf simpleproject.App
*/
	onInit: function() {
		jQuery.sap.require("sap.m.MessageBox");
		this.getBankToken();
	},
	getBankToken: function()
	{
			jQuery.ajax({
		     type: "POST",
		     contentType: "application/x-www-form-urlencoded",
		     url: "https://hackathon.postbank.de/bank-api/gold/postbankid/token",
		     dataType: "json",
		     data: "username=HackathonNov01_7&password=hat1116",
		     headers: {
		      "API-Key": "485430390021fc15",
		     },
		      success: function (data) {    
		       _token_id = data.token;
		      // alert("success! Token is:   " + _token_id);         
		    //   sap.ui.controller("simpleproject.controller.Account").getAccounts ( );
		      }
		   });
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf simpleproject.App
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf simpleproject.App
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf simpleproject.App
*/
//	onExit: function() {
//
//	}

});