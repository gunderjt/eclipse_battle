class CreateDicePools < ActiveRecord::Migration
  def change
    create_table :dice_pools do |t|

      t.timestamps
    end
  end
end
