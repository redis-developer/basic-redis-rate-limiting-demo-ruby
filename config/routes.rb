Rails.application.routes.draw do
  root 'home#index'

  get '/ping', to: 'home#ping'
end
