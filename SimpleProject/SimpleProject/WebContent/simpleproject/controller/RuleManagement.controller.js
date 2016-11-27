var _caller;

sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "simpleproject/model/models"
  ], function (JSONModel, Controller, models) {
    "use strict";

   return Controller.extend("simpleproject.controller.RuleManagement", {
        onInit: function () {
        var router =  this.getOwnerComponent().getRouter();
		router.getRoute("RuleManagement").attachMatched(this._onRouteMatched,this);
        },
        _onRouteMatched : function(oEvent){
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		oView = this.getView();
		_caller = this.getView();
    	var me = this;
        models.getList("rules", function(ruleList) {
    		console.log(ruleList);
    		var ruleModel = new JSONModel(ruleList);
            me.getView().setModel(ruleModel);
        });
        },
        onNavBack: function(oEvent){
        	sap.ui.controller("simpleproject.controller.Account").onNavBack();
        },
        onNewRuleCreate:function (oEvent){
        	
        	
        //	var oDialog = sap.ui.xmlfragment(this.getView().getId(), "simpleproject.fragment.NewRuleDialog", this);
				// connect dialog to view (models, lifecycle)
			//	this.getView().addDependent(oDialog);
			
				if(!this._dialog){
			this._dialog =  sap.ui.xmlfragment( "simpleproject.fragment.NewRuleDialog", this);
		//	this.getView().addDependent(this._dialog);
		}
		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

 
        },
        saveRule :function(oEvent)
        {	
        	var ruleName =  sap.ui.getCore().byId("tf_ruleName").getValue();
        	var border = sap.ui.getCore().byId("tf_border").getValue();
        	var purpose = sap.ui.getCore().byId("tf_purpose").getValue();
        	var jsonObject =  {'ruleName':ruleName, 'border': border,'purpose':purpose};
        	var me = this;
        	models.create("rules",jsonObject,function(data){
        		console.log(data);
        		models.getList("rules", function(ruleList) {
		    		console.log(ruleList);
		    		    		var ruleModel = new JSONModel(ruleList);
            me.getView().setModel(ruleModel);
		        });
        	});	
        	this._dialog.close();
        }
        
    });
});