class Investment < ApplicationRecord
  attr_accessor :flg

  belongs_to :user

  validates :item, presence: true
  validates :yield, presence: true, numericality: {only_integer: true, less_than_or_equal_to: 100}
  validates :price, presence: true
  validates :year, presence: true, numericality: {only_integer: true, less_than_or_equal_to: 100}
  validates :month, presence: true, numericality: {only_integer: true, less_than_or_equal_to: 11}
end
