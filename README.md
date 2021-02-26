# Basic redis rate limiting demo Ruby

The server will allow sending max 10 API requests within a 10 second window. If you send more than that, all additional requests will be blocked

## How it works
This app was built using `rack-defense` gem which will block connections from a client after surpassing certain amount of requests (default: 10) per time (default: 10 sec)

## How to run it locally?

#### Run these commands:

```sh
bundle install
rails db:create
```

#### Copy `config/database.yml.example` to create `config/database.yml`

#### Copy `config/application.yml.example` to create `config/application.yml`. And provide the values for environment variables

    - REDIS_ENDPOINT_URI: Redis server URI

#### Look `config/application.yml.example` for values examples

#### Run the app

```sh
rails s 
```