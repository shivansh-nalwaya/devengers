## Dev Setup Steps
1. `sudo chown -R $USER:$USER api/`
2. `docker-compose build`
3. `docker-compose run web rake db:create`
4. `docker-compose run web rake db:migrate`