class CreateDies < ActiveRecord::Migration
  def change
    create_table :dies do |t|

      t.timestamps
    end
  end
end
