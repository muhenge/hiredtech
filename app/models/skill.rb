class Skill < ApplicationRecord
    belongs_to :user
    has_many :posts
    validates :level,presence: true
    validates :name, presence: true
end