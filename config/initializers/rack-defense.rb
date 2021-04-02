Rack::Defense.setup do |config|
  config.store = ENV['REDIS_ENDPOINT_URI']

  permitted_requests_count = config.store.get('permitted_requests_count')

  if permitted_requests_count.present?
    permitted_requests_count = permitted_requests_count.to_i
  else
    config.store.set('permitted_requests_count', 10)
  end

  # 10000 - time, ms
  # || 10 - to avoid ArgumentError on first run
  config.throttle('ping', permitted_requests_count || 10, 10000) do |req|
    req.ip if req.path == '/ping' && req.get?
  end
end
