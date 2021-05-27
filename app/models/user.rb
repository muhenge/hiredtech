class User < ApplicationRecord
  attr_accessor :login
  acts_as_voter
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  devise :omniauthable, omniauth_providers:  %i[google github gitlab facebook linkedin]
  validates :username, presence: true, uniqueness: {case_sensitive: false}, format: {with: /\A[a-zA-Z0-9 _\.]*\z/}
  has_one_attached :avatar
  belongs_to :career
  has_many :skills
  has_many :posts
  has_many :comments

  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships

  def follow(user)
    active_relationships.create(followed_id: user.id)
  end

  def unfollow(user)
    active_relationships.find_by(followed_id: user.id).destroy
  end

  def following?(user)
    following.include?(user)
  end

  def self.from_github(auth)
    where(github_id: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.username = auth.info.name
      user.password = Devise.friendly_token[0,20]
      user.skip_confirmation!
    end
  end
  def self.find_first_by_auth_conditions(warden_conditions)
    condition = warden_conditions.dup
    if login = condition.delete(:login)
      where(condition.to_hash).where("lower(username)= :value OR lower(email) = :value", value: login.downcase).first
    else
      where(condition.to_hash).first
    end
  end

  def self.search(search)
    if search
      where(["username LIKE ? OR firstname LIKE ? OR lastname LIKE ? OR email LIKE ?","%#{search}%", "%#{search}","%#{search}","%#{search}"])
    else
      all.sort_by {|e| e.username}
    end
  end

end
