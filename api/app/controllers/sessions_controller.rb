class SessionsController < ApplicationController
    def create
        conditions = login_params.slice(:email, :contact).to_h.compact
        user = User.find_by(conditions)
        if user.present? && user.authenticate(login_params[:password])
            render json: user.as_json(methods: :token), status: :ok
        else
            render json: {message: "Email or password invalid"}, status: :not_found
        end
    end

    private

    def login_params
        params.permit!
        params[:session]
    end
end
