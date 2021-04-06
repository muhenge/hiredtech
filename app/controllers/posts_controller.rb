class PostsController < ApplicationController
    before_action :set_post, only: %i[show edit update edit destroy]
    before_action :authenticate_user!, only: [:create, :edit, :update, :show, :destory]
    def index
        @posts = Post.all
        
        # @user_interest = current_user.interest
        # @user_following = current_user.following
    end

    def show
        # @comment = Comment.new
        # @post_user = @post.user
        # @comments = @post.comments
    end

    def new
        @post = current_user.posts.build
    end

    def create

        @post = current_user.posts.build(post_params)
        
        if @post.save
            redirect_to posts_path
            flash[:notice] = 'Posted'
        else
            flash[:alert] = 'Failed'
            redirect_to posts_path
        end
    end

    def edit; end

    def update
        @post.update(post_params)
        redirect_to posts_path
    end
    private

    def post_params
        params.require(:post).permit(:content, :career_id, :user_id, :created_at)
    end

    private

    def set_post
        @post = Post.find(params[:id])
    end
end
