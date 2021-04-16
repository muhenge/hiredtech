class Skill < ApplicationRecord
    belongs_to :user
    validates :level, presence: true
end
