class UsersController < ApplicationController
    before_action :authorize_request, only: [:show]

    def create
        Rails.logger.info signup_params
        user = User.new(signup_params)
        if user.save
            render json: user.as_json, status: :ok
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end

    def show
        render json: {worked: true}
    end

    private

    def signup_params
        params.permit!
        params[:user]
    end
end
