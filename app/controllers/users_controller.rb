class UsersController < ApplicationController
    before_action :set_user, only: %i[show]
    before_action :authenticate_user!, only: %i[:show]
    def index
        @users = User.all
    end

    def show
        @skill = Skill.new
        @user_skills = @user.skills
    end

    def current_user_skills
        @curr_skills = current_user.skills
        @skill = Skill.new
    end
    
    
    private

    def user_params
        params.require(:user).permit(:firstname, :lastname, :email, :username, :about, :bio, :career_id, skills:[])
    end

    private

    def set_user
        @user = User.find(params[:id])
    end
    
end
