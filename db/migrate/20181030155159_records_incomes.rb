class RecordsIncomes < ActiveRecord::Migration[5.2]
  def change
    drop_table :incomes
  end
end
