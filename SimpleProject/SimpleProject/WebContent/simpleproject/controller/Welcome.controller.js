sap.ui.controller("simpleproject.controller.Welcome", {
    onInit : function(){

        var oRouter = this.getOwnerComponent().getRouter();
    			oRouter.getRoute("Welcome").attachMatched(this._onRouteMatched, this);
      },
      _onRouteMatched : function (oEvent) {
  			var oArgs, oView;
  			oArgs = oEvent.getParameter("arguments");
  			oView = this.getView();

  		//	var oModel = new sap.ui.model.json.JSONModel({uname : oArgs.path});
  		var	oModel = sap.ui.getCore().getModel("userModel");
  			oView.setModel(oModel);
//  			oView.bindElement({
//  				path : "/" + oArgs.path + "",
//  				events : {
//  					change: this._onBindingChange.bind(this),
//  					dataRequested: function (oEvent) {
//  						oView.setBusy(true);
//  					},
//  					dataReceived: function (oEvent) {
//  						oView.setBusy(false);
//  					}
//  				}
//  			});
  		},
  		_onBindingChange : function (oEvent) {
  			// No data for the binding
  			if (!this.getView().getBindingContext()) {
  				this.getOwnerComponent().getRouter().getTargets().display("notFound");
  			}
  			this.getView().bindElement({
				path: "/" + oArgs.Path,
				model: "path"});
  		},

      onNavBack : function() {
        window.history.go(-1);

      },
      onNav:function(oEvent){
				this.getOwnerComponent().getRouter().navTo("Account");
	},
	onMyRules:function(oEvent){
		this.getOwnerComponent().getRouter().navTo("RuleManagement");
	},
	onWishlist:function(oEvent){
			this.getOwnerComponent().getRouter().navTo("WishList");
	},
	onConsultant:function(oEvent){
		this.getOwnerComponent().getRouter().navTo("Consultant");
	}
		
			

});