class Die
  attr_accessor :id, :damage, :value
  @@master_id = 0

  def initialize(options = {})
    @id = @@master_id = @@master_id + 1
    if options[:color]
      assign_damage(options[:color])
      roll
    else
      @damage = options[:damage]
      @value = options[:value]
    end
  end
  def assign_damage(color)
    case color
    when 'red'
      @damage = 4
    when 'orange'
      @damage = 2
    else
      @damage = 1
    end
  end
  def roll
    @value = rand(1..6)
    @value = 1.0/0.0 if @value == 6
    @value = -1.0/0.0 if @value == 1
  end
  def add_computer(comp)
    @value += comp
  end
end
