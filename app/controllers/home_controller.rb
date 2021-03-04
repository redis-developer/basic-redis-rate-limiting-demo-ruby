class HomeController < ApplicationController
  def index; end

  def ping
    remain = request.headers['RateLimit-Remaining']

    response.headers['X-RateLimit-Limit'] = 10
    response.headers['X-RateLimit-Remaining'] = remain

    render layout: false
  end
end
