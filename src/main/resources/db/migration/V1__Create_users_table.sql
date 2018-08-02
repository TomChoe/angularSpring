create table USERS (
    ID serial PRIMARY KEY,
    USER_NAME varchar(100) NOT NULL,
    FIRST_NAME varchar(100) NOT NULL,
    LAST_NAME varchar(100) NOT NULL,
    EMAIL varchar(100) NOT NULL
);