# 📚 Movies API

## 📘 Sequelize-cli
```
npx sequelize-cli model:generate --name movie --attributes name:string,image:string,year:integer,rating:integer

npx sequelize-cli model:generate --name genre --attributes name:string

npx sequelize-cli model:generate --name movieGenre --attributes movieId:integer,genreId:integer
```

## 📗 ERD
![image](/public/ERD%20Movies.png)
