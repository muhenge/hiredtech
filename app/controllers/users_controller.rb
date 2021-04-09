class UsersController < ApplicationController
    before_action :set_user, only: %i[show]
    before_action :authenticate_user!, only: %i[:show]
    def index
        @users = User.all
    end

    def show
        @skill = Skill.new
        @user_skills = @user.skills
        @user_posts = @user.posts.limit(5)
    end

    def current_user_skills
        @curr_skills = current_user.skills
        @skill = Skill.new
    end

    def following
        @title = "Following"
        @user = User.find(params[:id])
        render 'following'
    end

    def followers
        @title = "Followers"
        @user = User.find(params[:id])
        render 'followers'
    end
    
    
    private

    def user_params
        params.require(:user).permit(:firstname, :lastname, :email, :username, :about, :bio, :career_id, skills:[])
    end


    def set_user
        @user = User.find(params[:id])
    end
    
end
