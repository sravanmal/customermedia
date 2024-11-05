sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sravan/ust/customermedia/test/integration/FirstJourney',
		'sravan/ust/customermedia/test/integration/pages/CustomerMasterList',
		'sravan/ust/customermedia/test/integration/pages/CustomerMasterObjectPage',
		'sravan/ust/customermedia/test/integration/pages/ShiptoAddressObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomerMasterList, CustomerMasterObjectPage, ShiptoAddressObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sravan/ust/customermedia') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomerMasterList: CustomerMasterList,
					onTheCustomerMasterObjectPage: CustomerMasterObjectPage,
					onTheShiptoAddressObjectPage: ShiptoAddressObjectPage
                }
            },
            opaJourney.run
        );
    }
);