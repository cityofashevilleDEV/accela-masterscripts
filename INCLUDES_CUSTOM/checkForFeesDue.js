
function checkForFeesDue() {
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
                newFees = feeGetTotByDateRange2("01/01/2000","01/01/2030","NEW"); 
                newFees = 1
                comment("NEW fee total = "+newFees); comment("Workflow status = "+wfStatus);
if (appMatch('Permits/*/*/*') && newFees > 0) {
                showMessage = true; comment("<font size=small><b>Un-Invoiced Fees:</b></font><br><br>The permit you are trying to issue or final has assessed fees that have NOT been invoiced. Those fees need to be invoiced or removed prior to the permit being issued or finaled.<br><br>");
                cancel = true;
}
}

function feeGetTotByDateRange2(a,b){
	var capContResult = aa.people.getCapContactByCapID(capId);
	var c=new Date(a);
	c.setHours(0,0,0,0);
	var d=new Date(b);
	d.setHours(23,59,59,999);
	var e=!1,f=new Array;
	if(arguments.length>2)
		{e=!0;
		for(var g=2;g<arguments.length;g++)
			f.push(arguments[g])
		}var h=aa.fee.getFeeItems(capId);
		if(!h.getSuccess())return logDebug("**ERROR: getting fee items: "+capContResult.getErrorMessage()),!1;
		var i=h.getOutput(),
		j=0,
		k=new Date;
		for(ff in i)
			k.setTime(i[ff].getApplyDate().getEpochMilliseconds()),
		k>=c&&k<=d&&(!e||exists(i[ff].getFeeitemStatus(),
			f))&&(j+=i[ff].getFee());return j
	}
