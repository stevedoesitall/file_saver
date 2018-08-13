//Date vars
const month = new Date().getMonth();
const current_year = new Date().getFullYear();
let current_month;

switch (month) {
	case 0:
		current_month = "January";
	break;

	case 1:
		current_month = "February";
	break;

	case 2:
		current_month = "March";
	break;

	case 3:
		current_month = "April";
	break;

	case 4:
		current_month = "May";
	break;

	case 5:
		current_month = "June";
	break;

	case 6:
		current_month = "July";
	break;

	case 7:
		current_month = "August";
	break;

	case 8:
		current_month = "September";
	break;

	case 9:
		current_month = "October";
	break;

	case 10:
		current_month = "November";
	break;

	case 11:
		current_month = "December";
	break;
}

module.exports = {
    current_year,
    current_month
}