drop table if exists users;
drop table if exists leaderboard;
drop table if exists words;

create table users (
  id serial primary key,
  email varchar(100) not null,
  password varchar(200) not null,
)

create table leaderboard (
  id serial primary key,
  user_id int references users(id),
  word_id int references words(id)
)

create table game (
  id serial primary key,
  word_id int references words(id),
  time TIMESTAMP not null default TO_CHAR(CURRENT_TIMESTAMP,'YYYYMM') 
)

create table words (
  id serial primary key,
  word varchar(200) not null,
)

  -- what kind of scoring system? 
  -- score out of 100
  -- if you completed the word or not

  -- bonus points
  -- body parts are worth bonus points
  -- timer bonus


