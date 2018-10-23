Rails.application.routes.draw do

  get    'login',  to: "sessions#new"
  post   'login',  to: "sessions#create"
  delete 'logout', to: "sessions#destroy"
  
  get  'signin', to: "users#new"
  post 'signin', to: "users#create"

  root to: 'toppages#index'

end
