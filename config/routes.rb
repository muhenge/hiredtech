Rails.application.routes.draw do
  resources :skills
  devise_for :user do
    # get '/users/sign_out' => ' devise/sessions#destroy'
  end

  # devise_for :users, controllers: {

  # }

  # devise_scope :users do
  #   get 'edit_user', to: 'users/registrations#edit'
  #   # get 'signup', to: 'users/registrations#new'
  #   # get 'signin', to: 'users/sessions#new'
  # end
  resources :posts
  
  resources :users, only: %i[show index] do
    resources :posts
  end
  get "/current_user_skills", to: "users#current_user_skills"
  root to: "posts#index"
  get 'public/private'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
