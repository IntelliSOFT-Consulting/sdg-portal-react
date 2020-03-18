const $ = window.$;
$(document).ready(function() {
    var previous = document.getElementById("menu8"); //The last opened menu, "menu8" by default since it is opened on page load
	var original = "menu"; //Concatenate this with the element id
	var toOpen = ""; //Store the concatenated value
	var over; //Boolean: is the move over the element or not?

	var delay = function (elem, callback) { //Delay the execution of the "callback" argument on the "elem" argument
		var timeout = null; //Store the timer
		timeout = setTimeout(function() { //Set a timer
			if(over) { //If the mouse is still over the element, do:
				callback(elem); //Call the function that was passed as an argument
			}
		}, 150); //Time in milliseconds before the timer triggers

		$(elem).mouseout(function() { //If the mouse leaves the element, do:
			over = false; //Set the boolean to false
			clearTimeout(timeout); //Clear the timer
		});
	};

	$(".over").mouseenter(function(event) { //When the mouse enters one of the menu's elements, do:
		over = true; //Set the boolean to true
		delay(document.getElementById(event.target.id), function(context) { //Call the timer function
			toOpen = document.getElementById(original.concat(context.id)); //When the timer is done, get the menu to open
			openMenu(toOpen); //Open it
			previous = toOpen; //Set it as the "previous" menu for the next instance of this function
		});
	});

	$(".clicky").click(function() {
		openMenu(document.getElementById("menu8"));
		previous = document.getElementById("menu8");
	});

	function openMenu(context) { //Open the specified menu
		closeMenu(previous);
		$(context).toggleClass("visible"); //Toggle the visibility of the element
		$(context).toggleClass("hidden");
	}

	function closeMenu(context) { //Close the specified menu
		$(context).toggleClass("visible"); //Toggle the visibility of the element
		$(context).toggleClass("hidden");
	}
});