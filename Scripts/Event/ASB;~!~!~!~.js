
if (ParcelValidatedNumber.length != 0 && ParcelValidatedNumber != '' && ParcelValidatedNumber != null) {
	loadParcelAttributesTPS(AInfo);
}

// DISABLED: ApplicationSubmitBefore:4
//comment('Flood Plain = '+AInfo['ParcelAttribute.FLOOD PLAIN'])  // test to see if a parcel attribute is visible;
if (publicUser && !appMatch('Services/*/*/*') && !appMatch('Permits/Sign/*/*') && AInfo['ParcelAttribute.LANDMARK'] == 'Yes') {
	showMessage = true;
	comment('<font size=small><b>Landmark:</b></font><br><br>You will need to come to our office to get a permit on a Landmark structure.<br><br>');
	cancel = true;
}

if (publicUser && !appMatch('Services/*/*/*') && !appMatch('Permits/Sign/*/*') && AInfo['ParcelAttribute.HRC OVERLAY'] == 'Yes') {
	showMessage = true;
	comment('<font size=small><b>HRC Overlay:</b></font><br><br>You will need to come to our office to get a permit because this location is in the Historic District.<br><br>');
	cancel = true;
}

if (publicUser && !appMatch('Services/*/*/*') && !appMatch('Permits/Sign/*/*') && !appMatch('*/*/Trade/*') && AInfo['ParcelAttribute.FLOOD PLAIN'] != 'X (Out or 500 Year Flood)') {
	showMessage = true;
	comment('<font size=small><b>Flood Plain:</b></font><br><br>You will need to come to our office to get a permit because the project is located in the Flood Plain.<br><br>');
	cancel = true;
}

if (publicUser && appMatch('*/*/Trade/*') && AInfo['Cost of Work'] > 30000) {
	showMessage = true;
	comment('<font size=small><b>Application Denied:</b></font><br><br>Your application has been denied. Please visit our office to complete the application.<br><br>');
	cancel = true;
}

if (!appMatch('Services/*/*/*') && !appMatch('Planning/Non Development/*/*') && AInfo['ParcelAttribute.JURISDICTION'] != 'Asheville Corporate Limits') {
	showMessage = true;
	comment('<font size=small><b>Outside City Limits:</b></font><br><br>This property is not in the Asheville City limits.<br><br>');
	cancel = true;
}

if (publicUser && appMatch('Permits/*/*/Repair-Replacement') && AInfo['Scope includes exterior work?'] == 'Y' && AInfo['ParcelAttribute.DTDR OVERLAY'] == 'Yes') {
	showMessage = true;
	comment('<font size=small><b>Downtown Design Review Required:</b></font><br><br>You will need to come to our office to get a permit because the project is located in the Downtown Design Review Overlay.<br><br>');
	cancel = true;
}

////Checking for fees due (invoiced & non-invoiced) and if so, stopping a permit from being issued internally

//If there are invoiced fees (balance due), we should not be able to issue a permit (internally)
// Keith H Fees due logic To check if there are invoiced fees
if (appMatch('Permits/*/*/*') && balanceDue > 0) {
                showMessage = true;
                comment('<font size=small><b>Balance Due:</b></font><br><br>You will need to pay the Balance Due before a permit can be issued.<br><br>');
                cancel = true;
}
//If there are non-invoiced fees, we should not be able to issue a permit (internally)
// Note from Keith H -- Check if there a Assessed fees:    Check for NON Invoiced fees
                //newFees = feeGetTotByDateRange("01/01/2000","01/01/2030","NEW"); 
                newFees = 1
             //   comment("NEW fee total = "+newFees); comment("Workflow status = "+wfStatus);
if (appMatch('Permits/*/*/*') && newFees > 0) {
                showMessage = true; comment("<font size=small><b>Un-Invoiced Fees:</b></font><br><br>The permit you are trying to issue or final has assessed fees that have NOT been invoiced. Those fees need to be invoiced or removed prior to the permit being issued or finaled.<br><br>");
                cancel = true;
}

