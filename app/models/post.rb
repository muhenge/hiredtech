class Post < ApplicationRecord
  acts_as_votable
  belongs_to :user
  has_many :comments
  has_many :careers
  has_many :skills
  # has_one_attached :image
  has_one_attached :attachment

  
  scope :most_recent, -> { order(created_at: :desc) }
end
