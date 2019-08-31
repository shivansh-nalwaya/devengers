Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "users/sessions" }
  resources :feature_sets
end
