class CreateInvestments < ActiveRecord::Migration[5.2]
  def change
    create_table :investments do |t|
      t.string :item
      t.integer :yield
      t.integer :price
      t.integer :year
      t.integer :month
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
