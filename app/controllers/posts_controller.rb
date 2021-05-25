class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update edit destroy vote]
  before_action :authenticate_user!, only: [:index, :new, :create, :edit, :update, :show, :destory, :vote]
  respond_to :js, :json, :html

  def index
    @user_posts = current_user.posts.most_recent
    @career_post = current_user.career.posts
  end

  def show
    @comment = Comment.new

    @comments = @post.comments.most_recent
  end

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if  @post.save
      redirect_to posts_path
      flash[:notice] = 'Posted successfully'
    else
      flash[:alert] = 'Not posted, try again'
      redirect_to posts_path
    end
  end

  def edit; end

  def update
    @post.update(post_params)
    redirect_to posts_path
  end

  def vote
    if !current_user.liked? @post
      @post.liked_by current_user
    elsif current_user.liked? @post
      @post.unliked_by current_user
    end

      # @post.upvote_by current_user
      # redirect_back fallback_location: root_path
  end

    private

  def post_params
    params.require(:post).permit(:content,:comment_id,:image,:user_id, :created_at, :skill_id, :career_id)
  end

    private

  def set_post
    @post = Post.find(params[:id])
  end
end
