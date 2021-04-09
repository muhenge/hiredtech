module ApplicationHelper
    def user_avatar(user)
        if user.avatar.attached?
            user.avatar
        else
            'img'
        end
    end
end
