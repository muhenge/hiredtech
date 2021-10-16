class CareersController < ApplicationController
  def show
  end

  def post_by_career
    @posts = current_user.career.posts
  end

  

end
