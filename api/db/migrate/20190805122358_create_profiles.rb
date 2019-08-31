class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.string :first_name
      t.string :mid_name
      t.string :last_name
      t.boolean :is_vertified
      t.integer :follower_count,  default: 0
      t.integer :following_count, default: 0

      t.timestamps
    end
  end
end
