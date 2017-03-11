var __timeout;
sap.ui.controller("simpleproject.controller.Home", {

	onLogin: function(oEvent) {
		// getting the value
		var name = this.byId("userID").getValue();
		if (name === "") {
			this.byId("userID").setValueState(sap.ui.core.ValueState.Error); // if the field is empty after change, it will go red
			return;
		} else {
			this.byId("userID").setValueState(sap.ui.core.ValueState.None); // if the field is not empty after change, the value state (if any) is removed
		}
		// begin section busy indicator
		var dialog = this.handleDialog(oEvent, name);
		// end Section busy indicator
		var rowData = {
			'userName': name,
			'password': this.byId("pwUser").getValue()
		};
		var userModel = new sap.ui.model.json.JSONModel(rowData);
		sap.ui.getCore().setModel(userModel, "userModel");
		//routing to the welcome page!
		//this.getOwnerComponent().getRouter().navTo("Welcome",{ path : name});
	},
	handleDialog: function(oEvent, oPath) {
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("simpleproject.fragment.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}
		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		// simulate end of operation
		__timeout = jQuery.sap.delayedCall(3000, this, function() {
			this._dialog.close();
			this.getOwnerComponent().getRouter().navTo("Welcome", {
				path: oPath
			});
		});
	},

	onDialogClosed: function(oEvent) {
		jQuery.sap.clearDelayedCall(__timeout);

		if (oEvent.getParameter("cancelPressed")) {
			sap.m.MessageToast.show("The operation has been cancelled");
		} else {
			sap.m.MessageToast.show("The operation has been completed");
		}
	},
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf simpleproject.Home
	 */
	onInit: function() {
		var oView = this.getView();
		sap.ui.getCore().getMessageManager().registerObject(oView, true);

		var oField = this.getView().byId("pwUser");
		var oButton = this.getView().byId("button");

		oField.attachBrowserEvent("keydown", function(e) {
			if (e.keyCode === 13) {
				oButton.firePress();
			}
		});

	},
	onChange: function(oEvent) {
		var val = oEvent.getSource().getValue();
		if (val === "") {
			oEvent.getSource().setValueState(sap.ui.core.ValueState.Error); // if the field is empty after change, it will go red
		} else {
			oEvent.getSource().setValueState(sap.ui.core.ValueState.None); // if the field is not empty after change, the value state (if any) is removed
		}
	}

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf simpleproject.Home
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf simpleproject.Home
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf simpleproject.Home
	 */
	//	onExit: function() {
	//
	//	}

});