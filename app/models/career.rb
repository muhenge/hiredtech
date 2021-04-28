class Career < ApplicationRecord
  has_many :users
  has_and_belongs_to_many :careers
end
