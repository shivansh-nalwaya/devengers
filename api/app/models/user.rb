class User < ApplicationRecord
    has_one :auth
    has_one :profile
    accepts_nested_attributes_for :auth, :profile

    def authenticate(value)
        self.auth&.password == value
    end

    def token
        JsonWebToken.encode(self.as_json)
    end
end
