class CreateFleets < ActiveRecord::Migration
  def change
    create_table :fleets do |t|

      t.timestamps
    end
  end
end
