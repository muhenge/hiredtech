class CareersController < ApplicationController
  def show
  end

  def post_by_career
    @posts = current_user.career.posts
  end

  # def show
  #   @interest_post = @interest.posts
  # end

end
