sap.ui.controller("simpleproject.controller.Consultant", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf simpleproject.App
*/
	onInit: function() {

	},
	onNavBack: function(oEvent){
        	sap.ui.controller("simpleproject.controller.Account").onNavBack();
        }
});