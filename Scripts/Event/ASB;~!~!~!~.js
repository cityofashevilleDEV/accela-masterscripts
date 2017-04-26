
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
//WOID: 93659
//Description:  email notification to Alex to let her know that somebody needs an Historic Resources Commission application.
if (publicUser && !appMatch('Services/*/*/*') && !appMatch('Permits/Sign/*/*') && AInfo['ParcelAttribute.HRC OVERLAY'] == 'Yes') {
	showMessage = true;
	comment('<font size=small><b>HRC Overlay:</b></font><br><br>You will need to come to our office to get a permit because this location is in the Historic District.<br><br>Please visit this link to proactively fill out the application form: http://www.ashevillenc.gov/departments/urban_design/historic/appl_forms.htm<br><br>');
   email('acole@ashevillenc.gov','noreply@ashevillenc.gov','HRC Application: '+currentUserID+' Attempted','An on-line HRC application has been attempted by '+currentUserID+' and it requires your attention.');
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


