Rack::Defense.setup do |config|
  config.store = ENV['REDIS_ENDPOINT_URI']

  # 10 - count of requests
  # 10000 - time, ms
  config.throttle('ping', 10, 10000) do |req|
    req.ip if req.path == '/ping' && req.get?
  end
end
