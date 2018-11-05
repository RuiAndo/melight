Rails.application.routes.draw do

  root to: 'toppages#index'

  get    'login',  to: "sessions#new"
  post   'login',  to: "sessions#create"
  delete 'logout', to: "sessions#destroy"

  get  'signin', to: "users#new"
  post 'signin', to: "users#create"

  resources :users, only: [:new, :create, :show] do
    member do
      get :incomes
      get :outgoes
      get :investments
    end
  end

  resources :incomes, only: [:create, :destroy]
  resources :outgoes, only: [:create, :destroy]
  resources :investments, only: [:create, :destroy]

end
