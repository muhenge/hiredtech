class User < ApplicationRecord
  attr_accessor :login
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true, uniqueness: {case_sensitive: false}, format: {with: /\A[a-zA-Z0-9 _\.]*\z/}
  
  belongs_to :career
  has_many :skills
  def self.find_first_by_auth_conditions(warden_conditions)
    condition = warden_conditions.dup
    if login = condition.delete(:login)
      where(condition.to_hash).where("lower(username)= :value OR lower(email) = :value", value: login.downcase).first
    else
      where(condition.to_hash).first
    end
  end
  
end
