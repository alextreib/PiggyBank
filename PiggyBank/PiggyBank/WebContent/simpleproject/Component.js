sap.ui.define([
        'sap/ui/core/UIComponent',
        'sap/m/routing/Router',
        'sap/ui/model/json/JSONModel',
        'sap/ui/Device'
    ],
    function (UIComponent, Router, JSONModel, Device) {
        "use strict";

        return UIComponent.extend("simpleproject.Component", {

            metadata : {
                manifest : "json"
            },

            init : function () {

                var deviceModel = new JSONModel(Device);
                deviceModel.setDefaultBindingMode("OneWay");
                this.setModel(deviceModel, "device");
                UIComponent.prototype.init.apply(this, arguments);
								//var oModel = new sap.ui.model.odata.v2.ODataModel("V2/Northwind/Northwind.svc/");
								//this.setModel(oModel);


                this.getRouter().initialize();
            }
        });

    }, /* bExport= */ true);