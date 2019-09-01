Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "users/sessions" }
  resources :feature_sets do
    collection do
      post "bulk_upload" => "feature_sets#bulk_upload"
    end
  end
end
