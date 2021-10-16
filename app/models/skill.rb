class Skill < ApplicationRecord
    belongs_to :user
    has_and_belongs_to_many :posts
    validates :level,presence: true
    validates :name, presence: true
end