class Career < ApplicationRecord
  has_many :users
  belongs_to :posts
end
