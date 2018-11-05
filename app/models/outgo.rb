class Outgo < ApplicationRecord
  belongs_to :user

  validates :item, presence: true
  validates :outgo_payment, presence: true
  validates :reasonable_payment, presence: true
end
