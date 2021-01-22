DROP DATABASE IF EXISTS moviePlanner_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE moviePlanner_db;

USE moviePlanner_db;

-- Create the table tasks.
CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  movie varchar(255) NOT NULL,
  PRIMARY KEY (id)
);