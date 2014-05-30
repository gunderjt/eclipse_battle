/*Three things I want to work on:
*1. I want object to clone and persist when they are dropped in the box
*2.  I want objects that are removed from accepted boxes to be deleted
*3. I want newly dragged objects to "overwrite" old objects.
* 	--idea: store the object
*/
$(document).ready(function() {
    //Initialize Board to default
    initialize_board("Terran", "att");
    initialize_board("Terran", "def");
    //Bind remove_part to dblclicking a part container
    $(".part_container").dblclick(function() {
  	 remove_part($(this));
    });
    
    counter = 0;
    //Make the parts from the parts_pool draggable elements
    $( ".part" ).draggable(
		{
  		helper: "clone",
  		opacity: 0.3,
  		cursor: "move",		
  		cursorAt: { top: 56, left: 56 },
  		distance: 20,
		
    });
    //make the part_containers on the ships areas that can be dropped
    //and when they are dropped add the part to the ship
    $(".part_container").droppable({
      drop: function( event, ui ) {
      	//In here I will add the part      	
      	add_part(ui.draggable.attr('id'), $(this));
      },
    });
    $(".races").AccordionImageMenu({
      'border' : 5,
      'openItem':0,
      'color': '#000000',
      'duration': 350,
      'position': 'vertical',
      'openDim': 150,
      'closeDim': 60,
      'effect': 'easeOutBack',
      'width':150
    });
    $( ".races li" ).on('click', function(e) {
      e.preventDefault();
      var side = $(this).closest(".ships").attr("id");
      var race = $(this).find('span').html();
      initialize_board($(this).find('span').html(), side);
    });
    /* 	
    //make the jquery ui menu for the races
   	$( ".races" ).menu(); 
    //When someone clicks on the menu initialize board as that race
    $( ".races li" ).on('click', function() {
       var side = $(this).closest(".ships").attr("id");
       initialize_board($(this).children('a').html(), side);
    });
    */

    //make the jquery ui tab element for the parts pool
   	$("#parts_pool").tabs();
    //initialize the spinners so that individual ships cannot
    //exceed the number of ships allowed by the game
   	$( ".spinner_i" ).spinner({
        spin: function( event, ui ) {
          if ( ui.value > 8 ) {
            $( this ).spinner( "value", 0 );
            return false;
          } else if ( ui.value < 0 ) {
            $( this ).spinner( "value", 8 );
            return false;
          }
        }
      });
    $( ".spinner_c" ).spinner({
   		start: 0,
	    spin: function( event, ui ) {
	      if ( ui.value > 4 ) {
	        $( this ).spinner( "value", 0 );
	        return false;
	      } else if ( ui.value < 0 ) {
	        $( this ).spinner( "value", 4 );
	        return false;
	      }
	    },      
    });
    $( ".spinner_d" ).spinner({
      spin: function( event, ui ) {
        if ( ui.value > 2 ) {
          $( this ).spinner( "value", 0 );
          return false;
        } else if ( ui.value < 0 ) {
          $( this ).spinner( "value", 2 );
          return false;
        }
      }
    });
    $( ".spinner_s" ).spinner({
      spin: function( event, ui ) {
        if ( ui.value > 4 ) {
          $( this ).spinner( "value", 0 );
          return false;
        } else if ( ui.value < 0 ) {
          $( this ).spinner( "value", 4 );
          return false;
        }
      }
    });
    //When the calculate button is clicked
    //create the battle json and send it to the back
    //server
    $("#calculate").on('click', function (e) {
      e.preventDefault();
    	var battle = new Object();
    	var side = ["att", "def"];
    	var ship_id = ["i", "c", "d", "s"];
    	for(var i = 0; i < side.length; i++){
    		battle[side[i]] = create_fleet(side[i]);
    		var race = $("#"+side[i]).data('race');   		
    		switch(race){
				case "Terran":
					break;
				case "Planta":
					battle[side[i]].i.initiative += -2;
					battle[side[i]].s.initiative += -2;
					battle[side[i]].c.initiative += -1;
					for (var j =0; j < ship_id.length; j++){						
						battle[side[i]][ship_id[j]].computer += 1;
						battle[side[i]][ship_id[j]].power += 1;
					}
					break;
				case "Exiles":
					battle[side[i]].s.initialize += -4;
					battle[side[i]].s.hull += 1;
					battle[side[i]].s.power += 1;
					break;
				case "Rho Indi":
					for (var j =0; j < ship_id.length; j++){						
						battle[side[i]][ship_id[j]].shield += -1;
						battle[side[i]][ship_id[j]].initiative += 1;						
					}
					break;
				case "Orion":
					for (var j =0; j < ship_id.length; j++){						
						battle[side[i]][ship_id[j]].initiative += 1;
						if (ship_id[j] == "i"){
							battle[side[i]][ship_id[j]].power += 1;	
						}
						else if (ship_id[j] == "c"){
							battle[side[i]][ship_id[j]].power += 2;	
						}
						else if (ship_id[j] == "d"){
							battle[side[i]][ship_id[j]].power += 3;	
						}
					}
					break;
				case "Eridani":
					battle[side[i]].d.power += 1;
					break;
				case "Standard":
					break;
		    }
		}
    	ajaxSend(JSON.stringify(battle));
    });
});

function ajaxSend(json_object){
	$.ajax({
		url: "http://localhost:3000/calculate",
		type: "POST",
		data: {fleet : json_object}})
	.done(function( msg ) {
    	alert( msg );
  	});
	
}
