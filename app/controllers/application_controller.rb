class ApplicationController < ActionController::Base
    before_action :configure_devise_parameters, if: :devise_controller?
    protected
    def configure_devise_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:firstname, :lastname,:username])
        devise_parameter_sanitizer.permit(:account_update, keys: [:avatar, :username,:firstname,:career_id,:lastname,:bio, :about ,:password,:current_password,:password_confirmation])
    end
end
