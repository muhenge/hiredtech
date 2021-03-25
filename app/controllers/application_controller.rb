class ApplicationController < ActionController::Base
    before_action :configure_devise_parameters, if: :devise_controller?
    protected
    def configure_devise_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:firstname, :lastname,:username,:career_id, :email, :password, :password_confirmation])
        devise_parameter_sanitizer.permit(:account_update, keys: [:avatar, :username,:firstname,:career_id,:lastname,:bio, :career_id, :about ,:password,:current_password,:password_confirmation])
    end
end
