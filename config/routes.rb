Rails.application.routes.draw do
  get 'comments/create'
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
  resources :posts do
    resources :users
    resources :comments
  end

  resources :comments
  
  resources :users, only: %i[show index] do
    resources :posts
  end

  resources :relationships, only: [:create, :destroy] do
    resources :users
  end
  
  get "/current_user_skills", to: "users#current_user_skills"
  root to: "posts#index"
  get 'public/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
