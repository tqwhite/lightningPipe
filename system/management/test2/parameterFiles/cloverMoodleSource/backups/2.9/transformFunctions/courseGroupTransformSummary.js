function(item, inx, entire) {
	/* v2.9 courseGroup Summary Function */
	var termString = '',
		alreadyIn=[],
		outObj=item[0];
	

	for (var i = 0, len = item.length; i < len; i++) {
		var element = item[i];
		
		if (element.role.toLowerCase()!='editingTeacher'.toLowerCase()){
			continue;
		}
		
		if (alreadyIn.indexOf(element.classGroup)<0){
		termString += element.classGroup + ',';
		alreadyIn.push(element.classGroup);
		}
	}
	termString = termString.replace(/,$/, '');

	outObj.classGroup=termString;
	return outObj;
}