class CreateOutgoes < ActiveRecord::Migration[5.2]
  def change
    create_table :outgoes do |t|
      t.string :item
      t.integer :outgo_payment
      t.integer :reasonable_payment
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
