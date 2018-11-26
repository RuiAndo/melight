class Income < ApplicationRecord
  attr_accessor :flg
  belongs_to :user

  validates :item, presence: true
  validates :income_amount, presence: true, numericality: {only_integer: true}
end
