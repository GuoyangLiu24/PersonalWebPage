function submitData(e) {
	e = window.event;
	e.preventDefault();
	var propertyWidth = 300;
	var propertyHeight = 100;
	var winLeft = ((screen.width - propertyWidth) / 2);
	var winTop = ((screen.height - propertyHeight) / 2);
	var winOptions = "width=300,height=100";
	winOptions += ",left=" + winLeft;
	winOptions += ",top=" + winTop;
	var popup = window.open("", "popupWindow",
	winOptions);
	popup.document.write(popupData().innerHTML);
;}

function popupData() {
	var firstname = document.getElementsByName("txtFirstName")[0].value;
	var lastname = document.getElementsByName("txtLastName")[0].value;
	var email = document.getElementsByName("txtEmail")[0].value;
	var courseSelector = document.getElementById("courseList");
	var course = courseSelector[courseSelector.selectedIndex].value;
	var div = document.createElement("div");
    var p1 = document.createElement("p");
	p1.style.color = "red";
	p1.textContent = firstname + ' ' + lastname + ' , please confirm below information:';
	var p2 = document.createElement("p");
	p2.style.fontFamily = "monospace";
	p2.textContent = 'Email: ' + email + ', ' +'Course Selected: ' + course + '.';
    div.appendChild(p1);
	div.appendChild(p2);
	return div;
}