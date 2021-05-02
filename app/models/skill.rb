class Skill < ApplicationRecord
    belongs_to :user
    belongs_to :post
    validates :level,presence: true
    validates :name, presence: true
end