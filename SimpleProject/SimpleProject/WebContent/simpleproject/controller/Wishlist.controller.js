var _caller;

sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "simpleproject/model/models"
  ], function (JSONModel, Controller, models) {
    "use strict";

   return Controller.extend("simpleproject.controller.Wishlist", {
        onInit: function () {
        var router =  this.getOwnerComponent().getRouter();
		router.getRoute("WishList").attachMatched(this._onRouteMatched,this);
        },
        _onRouteMatched : function(oEvent){
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		oView = this.getView();
		_caller = this.getView();
    	var me = this;
        models.getList("Wishes", function(wishList) {
    		console.log(wishList);
    		var wishModel = new JSONModel(wishList);
            me.getView().setModel(wishModel);
        });
        },
        onNavBack: function(oEvent){
        	sap.ui.controller("simpleproject.controller.Account").onNavBack();
        },
        onNewWishCreate:function (oEvent){
        //	var oDialog = sap.ui.xmlfragment(this.getView().getId(), "simpleproject.fragment.NewRuleDialog", this);
				// connect dialog to view (models, lifecycle)
			//	this.getView().addDependent(oDialog);
			
				if(!this._dialog){
			this._dialog =  sap.ui.xmlfragment( "simpleproject.fragment.CreateNewWish", this);
		//	this.getView().addDependent(this._dialog);
		}
		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();
        },
        saveWish :function(oEvent)
        {	
  
        	var product =  sap.ui.getCore().byId("tf_product").getValue();
        	var price = sap.ui.getCore().byId("tf_price").getValue();
        	var date = sap.ui.getCore().byId("tf_date").getValue();
        	var jsonObject =  {'product':product, 'price': price,'date':date};
        	var me=this;
        	
        	models.create("Wishes",jsonObject,function(data){
        		console.log(data);
        		models.getList("Wishes", function(wishList) {
		    		console.log(wishList);
		    		 var wishModel = new JSONModel(wishList);
            me.getView().setModel(wishModel);
            sap.m.MessageToast.show("New Wish is saved!",{duration: 2000});
		        });
        });
        this._dialog.close();
        }
        
    });
});