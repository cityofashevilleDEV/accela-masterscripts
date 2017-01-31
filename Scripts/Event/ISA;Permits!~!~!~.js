pri = getPriority();
logDebug("priority:"+ pri)
if (pri && pri != '') {
	editInspectionUnitNbr(inspId, pri);
}
