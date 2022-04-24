class Post < ApplicationRecord
  acts_as_votable

  extend FriendlyId
  friendly_id :random_hex, use: [:finders, :slugged]

  def random_hex
    SecureRandom.hex
  end

  validates :content, :presence => true, length: {minimum:10}
  belongs_to :user
  has_many :comments
  belongs_to :career
  has_many :skills
  # has_one_attached :image
  has_one_attached :attachment
  scope :most_recent, -> { order(created_at: :desc) }
end
