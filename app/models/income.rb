class Income < ApplicationRecord
  belongs_to :user

  validates :income_amount, presence: true
end
