class Outgo < ApplicationRecord
  attr_accessor :flg
  belongs_to :user

  validates :item, presence: true
  validates :outgo_payment, presence: true, numericality: {only_integer: true}
  validates :reasonable_payment, presence: true, numericality: {only_integer: true}
end
