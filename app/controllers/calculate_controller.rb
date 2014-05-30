class CalculateController < ApplicationController
	def home
	end
	def calculate
		@battle = validate_json(JSON.parse params[:fleet])
	    num_of_battles = 100
	    att_wins = 0
	    for i in 1..num_of_battles
		    battle = create_battle(@battle)
		    while !(win = battle.winner?)
		        battle.one_round()
		    end
		    att_wins+=1 if win.side == 'att'
	    end
	    render text: "Attacking fleet wins #{att_wins} out of #{num_of_battles}"
	end
end

def validate_json(json)
	sides = ["att", "def"]
	ship_types = ["i", "c", "d", "s"]
	sides.each do |side|
		ship_types.each do |ship_type|
			json[side][ship_type]["quantity"] = 8 if ((ship_type == 'i') && (json[side][ship_type]["quantity"] > 8)) 
			json[side][ship_type]["quantity"] = 4 if ((ship_type == 'c') && (json[side][ship_type]["quantity"] > 4)) 
			json[side][ship_type]["quantity"] = 2 if ((ship_type == 'd') && (json[side][ship_type]["quantity"] > 2)) 
			json[side][ship_type]["quantity"] = 4 if ((ship_type == 's') && (json[side][ship_type]["quantity"] > 8)) 
		end
	end
	return json
end

def create_battle(battle)
	sides = ["att", "def"]
	ship_types = ["i", "c", "d", "s"]
	att_fleet = ::Fleet.new("att")
	ship_types.each do |ship_type|
	    unless battle["att"][ship_type]["quantity"] == 0
		    att_fleet.add_ship(create_ship(battle, "att", ship_type))
	    end
	end
	def_fleet = ::Fleet.new("def")
	ship_types.each do |ship_type|
	    unless battle["def"][ship_type]["quantity"] == 0
		    def_fleet.add_ship(create_ship(battle, "def", ship_type))
	    end
	end
	att_fleet.sort_fleet
	def_fleet.sort_fleet
	::Battle.new(att_fleet, def_fleet)
end

def optimal_die_usage(attack_dice, ship_hull)
    '''
	Optimal_usage is the algorithm that decides the best way to allocate dice so
	that by the end you have reduced the ships health to zero.  It returns, the IDs
	of the dice that were used so that one can eliminate them from the remaining
	dice total

	The optimal choice is the outcome whose remaining dice have the greatest
	remaining attack, and in the event of a tie, the outcome who has the greatest
	remaining die count.
	'''
	if ship_hull <= 0
	    'ship is destroyed, return valid_dice for calculation'
	    return [attack_dice, ship_hull]
	else
	    'Check to see if there is dice available to attack'
	    next_die = attack_dice.view_die
	    if next_die == nil
	      return [attack_dice, ship_hull]
	    elsif next_die.damage <= ship_hull
	      ship_hull -= next_die.damage
	      attack_dice.remove_dice([next_die])
	      attack_dice.used_dice.push(next_die)
	      return optimal_die_usage(attack_dice, ship_hull)
	    else
	      attack_dice_copy = attack_dice.create_attack_clone()
	      ship_copy = ship_hull
	      
	      ship_hull -= next_die.damage
	      attack_dice.remove_dice([next_die])
	      attack_dice.used_dice.push(next_die)
	      outcomeA = optimal_die_usage(attack_dice, ship_hull)
	      
	      attack_dice_copy.reduce_tier
	      outcomeB = optimal_die_usage(attack_dice_copy, ship_copy)
	      
	      return compare_outcomes(outcomeA, outcomeB)
	    end
	end
end

def compare_outcomes(outcome_A, outcome_B)
  '''if both scenarios produced a destroyed ship...choose the one who did it with fewest resources'''
	if outcome_A[1] <=0 && outcome_B[1] <=0
	    if outcome_A[0].damage_remaining > outcome_B[0].damage_remaining
	    	return outcome_A
	    elsif outcome_B[0].damage_remaining > outcome_A[0].damage_remaining
	    	return outcome_B
	    else
	    	if outcome_B[0].number_of_dice > outcome_A[0].number_of_dice
	        	return outcome_B
	    	else
	    		return outcome_A
	    	end
	    end
	    '''if neither/only one produced a destroyed ship, return the weakest ship.'''
	elsif outcome_B[1] < outcome_A[1]
		return outcome_B
	else
    	return outcome_A
	end
end

def frozen_attack?(enemy_ships, die_pool)
#return true if no dice left can attack the shielded ships
	flag = true
	val_arr = die_pool.value_array
	enemy_ships.each do |ship|
	    if ship.shield < 0
	      val_arr.each {|die| (flag = false; break;) if die + ship.shield >= 6}
	    else
	      flag = false
	    end
  	end
  	return flag
end

def create_ship(json, side, ship_type)
	attributes = ["computer", "initiative", "shield", "hull", "hit_recovery", "drive", "power", "red_missle", "yellow_missle", "orange_missle", "yellow_cannon", "orange_cannon", "red_cannon", "power_consumption", "note", "quantity"]
	h = Hash.new()
	attributes.each do |item|
		h[item.to_sym] = json[side][ship_type][item]
	end
	h[:side] = side
	Ship.new([], h)
end

