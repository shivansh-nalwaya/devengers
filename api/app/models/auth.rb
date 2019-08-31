class Auth < ApplicationRecord
    belongs_to :user

    def password=(value)
        self.password_auth = BCrypt::Password.create(value)
        self.save
    end

    def password
        BCrypt::Password.new(self.password_auth)
    end
end
