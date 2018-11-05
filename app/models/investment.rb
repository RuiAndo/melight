class Investment < ApplicationRecord
  belongs_to :user

  validates :item, presence: true
  validates :yield, presence: true
  validates :price, presence: true
  validates :year, presence: true
  validates :month, presence: true
end
