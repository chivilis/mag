module.exports = function(divHeader, divFooter) {
	this.divFooter = divFooter || console.log('no footer in form.js line: 2');
	this.divHeader = divHeader || console.log('no header in form.js line: 3');
	
	// HEADER FORMATION
	var logo = $('<div/>', { id: 'headerLogo'});
	logo[0].style.backgroundImage = 'url("./media/logo.gif")';

	// FOOTER FORMATION
	var footerLeft = $('<td/>', { id: 'footerL', class: 'footerBox'});
	footerLeft.html('Individuali G. Krakausko įmonė „DIUGONIS“<br>Matulaičio a. 7-38, Vilnius 05111');
	
	var footerMiddle = $('<td/>', { id: 'footerM', class: 'footerBox'});
	footerMiddle.html('Tel./Faks: 8-5 2407015<br>www.diugonis.lt');
	
	var footerRight = $('<td/>', { id: 'footerR', class: 'footerBox'});
	footerRight.html('Įmonės kodas 123561374<br>PVM kodas LT235613716');
	
	var footerBoxes = new Array(footerLeft, footerMiddle, footerRight);
	var headerBoxes = new Array(logo);
	
	// append HEADERBOXES
	headerBoxes.forEach(function(box) {
		box.appendTo(this.divHeader);
	});
	// append FOOTERBOXES
	footerBoxes.forEach(function(box) {
		box.appendTo(this.divFooter);
	});  

	// DATEPICKER SET
	function dateAddYear(date) {
		return date.substring(0, date.length-2) + (parseInt(date.substring(date.length-2, date.length)) + 1);
	}
	
	
	$('#datepicker').datepicker();
	$('#datepicker').datepicker('setDate', new Date());
	
	$('#nextServiceDate').text( dateAddYear($('#datepicker')[0].value) );
	$('#datepicker').change(function(data) {
		$('#nextServiceDate').text(dateAddYear(data.target.value));
	});
	
}