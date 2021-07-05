drop table if exists leaderboard;

create table leaderboard (
  id serial primary key,
  name varchar(100) not null,
  word varchar(100) not null,
  points int not null
)