class UsersController < ApplicationController
    before_action :user_params, only: %i[show]
    def index
        @users = User.all
    end

    def show
        
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
