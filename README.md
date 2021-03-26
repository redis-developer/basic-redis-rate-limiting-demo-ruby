# Basic redis rate limiting demo Ruby

The server will allow sending max 10 API requests within a 10 second window. If you send more than that, all additional requests will be blocked

![How it works](./public/example.png)

## Try it out

#### Deploy to Heroku

<p>
  <a href="" target="_blank">
      <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heorku" />
  </a>
</p>

## How it works
This app was built using `rack-defense` gem which will block connections from a client after surpassing certain amount of requests (default: 10) per time (default: 10s).
These values can be changed inside `/config/initializers/rack-defense.rb`.

The application will return response headers after each successful request

```sh
# example
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
```

The application will also return request header after each request (including blocking requests) with count of remain requests

```sh
# example
RateLimit-Remaining: 1
```

## How to run it locally?

### Prerequisites

- Ruby - v2.7.0
- Rails - v5.2.4.5
- PostgreSQL - v10.16
- NPM - v7.6.0

### Local installation:

#### Run commands:

```sh
# copy files and set proper data inside
cp config/application.yml.example config/application.yml

- REDIS_ENDPOINT_URI: Redis server URI

cp config/database.yml.example config/database.yml
```

```sh
bundle install
rails db:create
```

#### Run the app

```sh
rails s
```

#### Go to the browser with this link (localhost example)

```sh
http://localhost:3000
```
