class AddCareerIdToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :career_id, :integer
  end
end
