class AddItemToIncomes < ActiveRecord::Migration[5.2]
  def change
    add_column :incomes, :item, :string
  end
end
