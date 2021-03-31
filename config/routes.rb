Rails.application.routes.draw do
  resources :skills
  devise_for :users do
    get '/users/sign_out' => ' devise/sessions#destroy'
  end
  root to: 'public#index'
  get 'public/private'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
