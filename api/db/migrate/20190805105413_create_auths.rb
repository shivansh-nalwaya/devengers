class CreateAuths < ActiveRecord::Migration[5.2]
  def change
    create_table :auths do |t|
      t.integer :user_id
      t.string :password_auth
      t.string :google_auth
      t.string :facebook_auth
      t.string :otp_auth

      t.timestamps
    end
  end
end
