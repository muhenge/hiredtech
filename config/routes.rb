Rails.application.routes.draw do
  get 'careers/show'
  get 'careers/post_by_career'
  get 'comments/create'
  resources :skills do
    resources :users
  end
  devise_for :user
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
  authenticated :user do
    root 'posts#index', as: :authenticated_root
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
  root :to => "public#index"
  get 'public/index'
  get "/post_by_career", to: "careers#post_by_career"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
