//To Do: pop outs indicating which is default, accordian menu of aliens, quantity
//calculate ships

function initialize_board(race, side){
	//check to see if need to restore to defaults if so, restore defaults
	if($("#"+side).data('status') == 'modified'){
		$("#"+side + " .part_container").removeClass("hidden");
		$("#"+side + " .spinner_d").removeClass("hidden");
		/*TO DO: remove image modificatons*/
		$("#"+side + " .s1").css("top", "105px");
		$("#"+side + " .s5").css("top", "105px");
		$("#"+side).data('status', "");
	}
	//hide all se
	$("#"+side + " .se").addClass("hidden");
	//unhide non-default .se
	$("#"+side + " .ia2").removeClass("hidden");
	$("#"+side + " .ia3").removeClass("hidden");

	$("#"+side + " .ca2").removeClass("hidden");

	$("#"+side + " .sa1").removeClass("hidden");
	$("#"+side + " .sa2").removeClass("hidden");
	$("#"+side + " .sa3").removeClass("hidden");
	$("#"+side + " .sa4").removeClass("hidden");
	$("#"+side + " .sp3").removeClass("hidden");


	//set interceptor
	remove_part($("#"+side + " .i1"));
	add_part("ion_cannon",$("#"+side + " .i2"));
	add_part("nuclear_source",$("#"+side + " .i3"));
	add_part("nuclear_drive",$("#"+side + " .i4"));
	//set cruiser
	add_part("hull",$("#"+side + " .c1"));
	remove_part($("#"+side + " .c2"));
	add_part("ion_cannon",$("#"+side + " .c3"));
	add_part("nuclear_source",$("#"+side + " .c4"));
	add_part("electron_computer",$("#"+side + " .c5"));
	add_part("nuclear_drive",$("#"+side + " .c6"));
	//set dreadnought
	add_part("ion_cannon",$("#"+side + " .d1"));
	add_part("hull",$("#"+side + " .d2"));
	remove_part($("#"+side + " .d3"));
	add_part("hull",$("#"+side + " .d4"));
	add_part("nuclear_source",$("#"+side + " .d5"));
	add_part("ion_cannon",$("#"+side + " .d6"));
	add_part("electron_computer",$("#"+side + " .d7"));
	add_part("nuclear_drive",$("#"+side + " .d8"));
	//set starbase
	add_part("hull",$("#"+side + " .s1"));
	add_part("ion_cannon",$("#"+side + " .s2"));
	add_part("hull",$("#"+side + " .s3"));
	remove_part($("#"+side + " .s4"));
	add_part("electron_computer",$("#"+side + " .s5"));
	
	switch (race){
		case 'Terran':			
			break;
		case 'Planta':
			//remove the part and hide the container for the planta
			$("#"+side + " .i1").addClass("hidden");
			remove_part($("#"+side + " .il"));
			$("#"+side + " .c2").addClass("hidden");
			remove_part($("#"+side + " .c2"));
			$("#"+side + " .d5").addClass("hidden");			
			remove_part($("#"+side + " .d5"));
			$("#"+side + " .s4").addClass("hidden");
			remove_part($("#"+side + " .s4"));
			/*add/remove ship enhancement images*/
			$("#"+side + " .ia2").addClass("hidden");
			$("#"+side + " .ia3").addClass("hidden");
			$("#"+side + " .ca2").addClass("hidden");
			$("#"+side + " .sa1").addClass("hidden");
			$("#"+side + " .sa2").addClass("hidden");
			$("#"+side + " .sp3").addClass("hidden");
			$("#"+side + " .ic").removeClass("hidden");
			$("#"+side + " .cc").removeClass("hidden");
			$("#"+side + " .dc").removeClass("hidden");
			$("#"+side + " .sc").removeClass("hidden");
			$("#"+side + " .ip2").removeClass("hidden");
			$("#"+side + " .cp2").removeClass("hidden");
			$("#"+side + " .dp2").removeClass("hidden");
			$("#"+side + " .sp5").removeClass("hidden");
			$("#"+side).data('status', "modified");		
			break;
		case "Exiles":
			$("#"+side + " .s1").css("top", "170px");
			$("#"+side + " .s5").css("top", "170px");
			//$("#"+side + " .s5").css("top", "130px");
			$("#"+side + " .s3").addClass("hidden");
			$("#"+side + " .s4").addClass("hidden");
			add_part("ion_turret",$("#"+side + " .s2"));
			add_part("hull",$("#"+side + " .s5"));
			/*add/remove ship enhancement images*/
			$("#"+side + " .sp4").removeClass("hidden");
			$("#"+side + " .sh").removeClass("hidden");
			$("#"+side + " .sa1").addClass("hidden");
			$("#"+side + " .sa2").addClass("hidden");
			$("#"+side + " .sa3").addClass("hidden");
			$("#"+side + " .sa4").addClass("hidden");
			$("#"+side).data('status', "modified");
			break;
		case "Rho Indi":
			$("#"+side + " .dre .part_container").each( function(){
				remove_part($(this));
				//grey out quantity
				$(this).addClass("hidden");
			});
			$("#"+side + " .spinner_d").addClass("hidden");			
			/*add/remove ship enhancement images*/
			//$("#"+side + " .rho").removeClass("hidden");
			$("#"+side + " .ia1").removeClass("hidden");
			$("#"+side + " .is").removeClass("hidden");
			$("#"+side + " .ca1").removeClass("hidden");
			$("#"+side + " .cs").removeClass("hidden");
			$("#"+side + " .ss").removeClass("hidden");
			$("#"+side).data('status', "modified");
			break;
		case "Orion":
			add_part("gauss_shield",$("#"+side + " .i1"));
			add_part("gauss_shield",$("#"+side + " .c2"));
			add_part("gauss_shield",$("#"+side + " .d3"));
			add_part("gauss_shield",$("#"+side + " .s4"));
			/*add/remove ship enhancement images*/
			//$("#"+side + " .orion").removeClass("hidden");
			$("#"+side + " .sa5").removeClass("hidden");
			$("#"+side + " .da1").removeClass("hidden");
			$("#"+side + " .dp3").removeClass("hidden");
			$("#"+side + " .ca1").removeClass("hidden");
			$("#"+side + " .cp2").removeClass("hidden");
			$("#"+side + " .ia1").removeClass("hidden");
			$("#"+side + " .ip1").removeClass("hidden");
			break;
		default:
			break;
	}
	$("#"+side).data('race', race);
}

function remove_part(element){
	element.removeClass(element.data("part"));
  	element.data("part", "");
}
function add_part(name, element){
	remove_part(element);
    element.addClass(name).data("part", name);
}
