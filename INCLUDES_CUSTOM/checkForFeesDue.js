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
                newFees = feeGetTotByDateRange("01/01/2000","01/01/2030","NEW"); 
                newFees = 1
                comment("NEW fee total = "+newFees); comment("Workflow status = "+wfStatus);
if (appMatch('Permits/*/*/*') && newFees > 0) {
                showMessage = true; comment("<font size=small><b>Un-Invoiced Fees:</b></font><br><br>The permit you are trying to issue or final has assessed fees that have NOT been invoiced. Those fees need to be invoiced or removed prior to the permit being issued or finaled.<br><br>");
                cancel = true;
}
}