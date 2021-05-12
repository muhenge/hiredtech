class ApplicationController < ActionController::Base
    before_action :configure_devise_parameters, if: :devise_controller?
    protected
    def configure_devise_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:firstname, :lastname,:username,:career_id,:skill_id, :email, :password, :password_confirmation])
        devise_parameter_sanitizer.permit(:account_update, keys: [:avatar, :username,:firstname,:lastname,:bio, :career_id, :skill_id, :about ,:password,:current_password,:password_confirmation])
    end
    def after_sign_in_path_for(resource)
        stored_location_for(resource) || posts_path
    end

    def after_sign_up_path_for(resources)
        stored_location_for(resource) || posts_path
    end
end
