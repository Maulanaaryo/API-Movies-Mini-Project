npx sequelize-cli model:generate --name movie --attributes name:string,image:string,year:integer,rating:integer

npx sequelize-cli model:generate --name genre --attributes name:string

npx sequelize-cli model:generate --name movieGenre --attributes movieId:string,genreId:string