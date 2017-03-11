var _caller;
var _calc;
var _diaMail;
var _diaCreate;
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "simpleproject/model/models"
  ], function (JSONModel, Controller, models) {
    "use strict";

   return Controller.extend("simpleproject.controller.Wishlist", {
        onInit: function () {
/*        var router =  this.getOwnerComponent().getRouter();
		router.getRoute("WishList").attachMatched(this._onRouteMatched,this);
        },
        _onRouteMatched : function(oEvent){
*/		var oArgs, oView;
/*		oArgs = oEvent.getParameter("arguments");
*/		oView = this.getView();
		_caller = this.getView();
    	var me = this;
        models.getList("Wishes", function(wishList) {
    		console.log(wishList);
    		var wishModel = new JSONModel(wishList);
    		sap.ui.getCore().setModel(wishModel,"wishModel");
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
			
			//	if(!_diaCreate){
			this._diaCreate =  sap.ui.xmlfragment( "simpleproject.fragment.CreateNewWish", this);
		//	this.getView().addDependent(this._dialog);
		//}
		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._diaCreate);
		this._diaCreate.open();
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
            
    		sap.ui.getCore().setModel(wishModel,"wishModel");
            sap.m.MessageToast.show("New Wish is saved!",{duration: 2000});
		        });
        });
        this._diaCreate.close();
        },
        calcValue: function(oPrice)
        {
        	var max = 100;
        	var min = 0;
        	_calc =  parseInt(Math.random() * (max - min) + min);
        	return  _calc;
        },
        convertPercValue : function(oPrice){
        	var val = _calc;//this.calcValue();
        	_calc = null;
        	return val + " %";
        },
        onShareWish: function(oEvent){
        		if(!this._diaMail){/**/
			this._diaMail =  sap.ui.xmlfragment( "simpleproject.fragment.SendMail", this);
		//	this.getView().addDependent(this._dialog);
		}/**/
		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._diaMail);
		this._diaMail.open();
        },
        sendMail: function(oEvent){
        	var wish = sap.ui.getCore().byId("sWish").getSelectedKey();
        	var recipient = sap.ui.getCore().byId("tf_recipient").getValue();
        	var msg = sap.ui.getCore().byId("tf_message").getValue();
        	var body = "<h1>PiggyBank Share Service</h1>" + "<p>Hello, </p>" + "<p>"+sap.ui.getCore().getModel("userModel").getData().userName+"  wants a product and asks for your help. Do you want to support him? </p>"
        	+"<p>Wish:"+wish+"</p>"+"<p>Message:"+msg+"</p>";
        	models.sendMail(recipient, "Shared Wish",body,function(data)
          {
            //console.log(data);
            
          //  sap.m.MessageToast.show("The person is informed about your Wish!",{duration: 2000});
          });
          
        	this._diaMail.close();
        	sap.m.MessageToast.show("The person is informed about your Wish!",{duration: 2000});
          
           
                   }
        
        
    });
});