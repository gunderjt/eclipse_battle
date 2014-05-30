class Fleet
  attr_accessor :ships, :passive_abilities, :side
  def initialize(side)
    @ships = []
    @passive_abilities = []
    @side = side
  end
  def add_ship(ship)
    @ships.push(ship)
  end
  def add_passive_abilities(passive_abilities)
    @passive_abilities = passive_abilities
  end
  def sort_fleet
    @ships.sort_by(&:value).reverse
  end
  def distortion_shield?
    @passive_abilities.include?('distortion_shield')
  end
  def antimatter_split?
    @passive_abilities.include?('antimatter_split')
  end
  def point_defense?
    @passive_abilities.include?('point_defense')
  end
end
