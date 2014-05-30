class CreateParts < ActiveRecord::Migration
  def change
    create_table :parts do |t|

      t.timestamps
    end
  end
end
