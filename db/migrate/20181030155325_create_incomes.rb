class CreateIncomes < ActiveRecord::Migration[5.2]
  def change
    create_table :incomes do |t|
      t.integer :income_amount
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
