sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/odata/v4/ODataModel"
], function(MessageToast, ODataModel) {
    "use strict";

    // Create a reference object for self-contained access to methods
    var Module = {
        
        onUploadSelectedButton: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            var oUploadSet = this.byId("UploadSet");
            var file = oUploadSet._oFileUploader.oFileUpload.files[0];

            if (file) {
                var reader = new FileReader();

                // Define the onload event handler
                reader.onload = function(event) {
                    var binaryData = event.target.result;
                    var byteArray = new Uint8Array(binaryData);

                    // POST request
                    fetch('https://port4004-workspaces-ws-5nbsb.us10.trial.applicationstudio.cloud.sap/odata/v4/customer-master/media', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "fileName": file.name,
                            "MediaType": file.type,
                            "size": file.size
                        })
                    })
                    .then(function(postResponse) {
                        if (!postResponse.ok) {
                            throw new Error("POST request failed.");
                        }
                        return postResponse.json();
                    })
                    .then(function(postData) {
                        var recordId = postData.ID;

                        // PUT request for uploading content
                        return fetch(`https://port4004-workspaces-ws-5nbsb.us10.trial.applicationstudio.cloud.sap/odata/v4/customer-master/media(${recordId})/content`, {
                            method: 'PUT',
                            body: byteArray
                        });
                    })
                    .then(function(putResponse) {
                        if (!putResponse.ok) {
                            throw new Error("PUT request failed.");
                        }
                        MessageToast.show("File uploaded and data updated successfully.");
                    })
                    .catch(function(error) {
                        console.error("Error in upload sequence:", error);
                    });
                };
                reader.readAsArrayBuffer(file);

            } else {
                console.log("No file selected.");
            }
        },

        onAfterItemAdded: function(oEvent) {
            var oUploadSet = this.byId("UploadSet");
            var file = oUploadSet._oFileUploader.oFileUpload.files[0];

            if (file) {
                var reader = new FileReader();

                // Define the onload event handler
                reader.onload = function(event) {
                    var binaryData = event.target.result;
                    var byteArray = new Uint8Array(binaryData);

                    // POST request
                    fetch('https://port4004-workspaces-ws-5nbsb.us10.trial.applicationstudio.cloud.sap/odata/v4/customer-master/media', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "fileName": file.name,
                            "MediaType": file.type,
                            "size": file.size
                        })
                    })
                    .then(function(postResponse) {
                        if (!postResponse.ok) {
                            throw new Error("POST request failed.");
                        }
                        return postResponse.json();
                    })
                    .then(function(postData) {
                        var recordId = postData.ID;

                        // PUT request for uploading content
                        return fetch(`https://port4004-workspaces-ws-5nbsb.us10.trial.applicationstudio.cloud.sap/odata/v4/customer-master/media(${recordId})/content`, {
                            method: 'PUT',
                            body: byteArray
                        });
                    })
                    .then(function(putResponse) {
                        if (!putResponse.ok) {
                            throw new Error("PUT request failed.");
                        }
                        MessageToast.show("File uploaded and data updated successfully.");
                    })
                    .catch(function(error) {
                        console.error("Error in upload sequence:", error);
                    });
                };
                reader.readAsArrayBuffer(file);

            } else {
                console.log("No file selected.");
            }
        },

        
            onUploadCompleted: function(oEvent) {
                this.oItemToUpdate = null;
                // add item to the model
                var oItem = oEvent.getParameter("item");
                var oModel = this.getView().getModel();
                var aItems = oModel.getProperty("/items");
                var oItemData = this._getItemData(oItem);
                aItems.unshift(oItemData);
                oModel.setProperty("/items", aItems);
                oModel.refresh();
            },


        onOpenPressed: function(oEvent) {
            // to be implemented
        }

    };

    return Module;
});
