docker kill real-weather-server 
docker kill real-weather-client
docker network remove real-weather
docker system prune -f

docker network create real-weather

# server
docker run --name real-weather-server -d -p 3000:3000 -e API_KEY=$API_KEY -e NODE_ENV=production --network=real-weather markshurmer/real-weather-server:1

# client
docker run --name real-weather-client -d -p 80:80 --network=real-weather markshurmer/real-weather-client:1