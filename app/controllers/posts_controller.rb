class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update edit destroy vote]
  before_action :authenticate_user!, only: [:index, :new, :create, :edit, :update, :show, :destory, :vote]
  respond_to :js, :json, :html

  def index
    @posts = Post.all.includes(:user, :comments, :career).most_recent
    @career_posts = Post.all.includes(:user, :comments, :career).most_recent.where(career_id: current_user.career_id)
    @skill_posts = Post.all.includes(:user, :comments, :career).most_recent.where(skill_id: current_user.skill_id)
    @comment = Comment.new
  end

  def show
    @comment = Comment.new
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
      flash[:alert] = 'Not posted,must be 10 world min, try again!'
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

  end

    private

  def post_params
    params.require(:post).permit(:content,:comment_id,:image,:user_id, :created_at, :skill_id, :career_id)
  end

    private

  def set_post
    @post = Post.includes(:comments).find(params[:id])
  end
end
