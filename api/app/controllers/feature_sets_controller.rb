require 'net/http'
require 'json'

class FeatureSetsController < ApplicationController
  protect_from_forgery only: %i[create update destroy]

  def index
    @feature_sets = FeatureSet.all
    render json: { message: "Loaded feature_sets", feature_sets: @feature_sets }, status: :ok
  end

  def show
    @feature_set = FeatureSet.find_by(id: params[:id])
    render json: { message: "Loaded feature_set", feature_set: @feature_set }, status: :ok
  end

  def create
    @feature_set = FeatureSet.create(feature_set_params)
    uri = URI('http://10.105.16.114:4444/predict')
    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json'})
    req.body = {"data" => [@feature_set.data.values]}.to_json
    res = http.request(req)
    resp =  JSON.parse(res.body)[0]
    if @feature_set.save
      render json: { message: "Created feature_set", feature_set: @feature_set, resp: resp }, status: :ok
    else
      render json: { message: @feature_set.errors }, status: :unprocessable_entity
    end
  end

  def update
    @feature_set = FeatureSet.find_by(id: params[:id])
    if @feature_set.update(feature_set_params)
      render json: { message: "Updated feature_set", feature_set: @feature_set }, status: :ok
    else
      render json: { message: @feature_set.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @feature_set = FeatureSet.find_by(id: params[:id])
    @feature_set.destroy
  end

  private

  def feature_set_params
    params.require(:feature_set).permit!
  end
end
