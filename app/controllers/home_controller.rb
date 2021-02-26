class HomeController < ApplicationController
  def index; end

  def ping
    render layout: false
  end
end
