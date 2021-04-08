class CommentsController < ApplicationController
  before_action :authenticate_user!
  def new
    @comment = current_user.skills.build(comment_params)
  end

  # GET /skills/1/edit
  def edit
  end

  def new
    @comment = current_user.commments.build(comment_params)
  end

  # POST /skills or /skills.json
  def create
    @comment = current_user.comments.build(comment_params)
    respond_to do |format|
      if @comment.save
        format.html { redirect_to posts_path, notice: "Skill was successfully created." }
        format.json { render :show, status: :created, location: comment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: comment.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :user_id, :post_id)
  end


  def set_comment
    @comment = Comment.find(params[:id])
  end
end
