Rails.application.routes.draw do
  get 'careers/show'
  get 'careers/post_by_career'
  get 'comments/create'
  resources :skills do
    resources :users
  end
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
    resources :skills
    member do
      put "like" => "posts#vote"
    end
  end

  resources :comments do
    resources :users
  end
  
  resources :users, only: %i[show index] do
    resources :posts
    resources :skills
  end

  resources :relationships, only: [:create, :destroy] do
    resources :users
    resources :posts
  end

  get "/current_user_skills", to: "users#current_user_skills"
  root to: "public#index"
  get 'public/index'
  get "/post_by_career", to: "careers#post_by_career"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
