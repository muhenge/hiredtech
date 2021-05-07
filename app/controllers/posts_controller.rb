class PostsController < ApplicationController
    before_action :set_post, only: %i[show edit update edit destroy]
    before_action :authenticate_user!, only: [:index, :create, :edit, :update, :show, :destory, :vote]
    def index
        @posts = Post.most_recent
        @current_user_career = current_user.career
        
    end

    def show
        @comment = Comment.new
        # @comment = Comment.new
        # @post_user = @post.user
        @comments = @post.comments.most_recent
    end

    def new
        @post = current_user.posts.build
    end

    def create
        @post = current_user.posts.build(post_params)
        if  @post.save
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

    def vote
        @post.upvote_by current_user
        redirect_back fallback_location: root_path
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
