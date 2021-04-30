class AddPostIdToCareer < ActiveRecord::Migration[6.1]
  def change
    add_column :careers, :post_id, :integer
  end
end
