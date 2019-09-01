require "net/http"
require "json"
require "csv"

class FeatureSetsController < ApplicationController
  protect_from_forgery only: %i[create update destroy]

  def index
    @feature_sets = FeatureSet.stats
    render json: { message: "Loaded feature_sets", feature_sets: @feature_sets }, status: :ok
  end

  def show
    @feature_set = FeatureSet.find_by(id: params[:id])
    render json: { message: "Loaded feature_set", feature_set: @feature_set }, status: :ok
  end

  def create
    @feature_set = FeatureSet.create(feature_set_params)
    uri = URI("http://trailblazers.southeastasia.cloudapp.azure.com:4444/predict")
    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri.path, { "Content-Type" => "application/json" })
    req.body = { "data" => [@feature_set.data.values] }.to_json
    res = http.request(req)
    resp = JSON.parse(res.body)[0]
    @feature_set.data["treatment_required"] = resp == 0 ? "No" : "Yes"
    if @feature_set.save
      render json: { message: "Created feature_set", feature_set: @feature_set, resp: resp }, status: :ok
    else
      render json: { message: @feature_set.errors }, status: :unprocessable_entity
    end
  end

  def bulk_upload
    content = File.read(params[:file].tempfile)
    csv = CSV.parse(content, :headers => true)
    results = []
    csv.each do |row|
      data = row.to_hash
      data["age"] = data["Age"]
      data["gender"] = data["Gender"]
      data.except!("Age", "Gender", "Timestamp" "comments", "s.no", "treatment_required")
      fs = FeatureSet.create(data: row.to_hash)
      uri = URI("http://trailblazers.southeastasia.cloudapp.azure.com:4444/predict")
      http = Net::HTTP.new(uri.host, uri.port)
      req = Net::HTTP::Post.new(uri.path, { "Content-Type" => "application/json" })
      req.body = { "data" => [fs.data.values] }.to_json
      res = http.request(req)
      resp = JSON.parse(res.body)[0]
      fs.data["treatment_required"] = resp == 0 ? "No" : "Yes"
      results.push(fs.data)
    end
    render json: { message: "Created feature_set", feature_sets: results }, status: :ok
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
