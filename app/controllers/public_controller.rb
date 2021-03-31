class PublicController < ApplicationController
  before_action :authenticate_user!
  def index
    @skill = Skill.new
    @user_skills = current_user.skills
  end

  def private
  end
end
