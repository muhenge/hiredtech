Rails.application.routes.draw do
  get 'careers/show'
  get 'careers/post_by_career'
  get 'comments/create'
  resources :skills
  devise_for :user
    # get '/users/sign_out' => ' devise/sessions#destroy'

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
    resources :careers
    resources :relationships
    member do
      put "like" => "posts#vote"
    end
  end

  resources :comments
  
  resources :users, only: %i[show index] do
    resources :posts
  end

  resources :relationships, only: [:create, :destroy] do
    resources :users
    resources :posts
  end

  get "/current_user_skills", to: "users#current_user_skills"
  root to: "posts#index"
  get 'public/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
