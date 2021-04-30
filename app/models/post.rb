class Post < ApplicationRecord
  acts_as_votable
  belongs_to :user
  has_many :comments
  belongs_to :career
  belongs_to :skill
  # has_one_attached :image
  has_one_attached :attachment

  
  scope :most_recent, -> { order(created_at: :desc) }
end
