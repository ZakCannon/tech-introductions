CREATE TABLE employees
(
    employee_number int         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name      varchar(50) NOT NULL,
    last_name       varchar(50) NULL,
    age             int         NOT NULL,
    salary          decimal     NOT NULL
);

CREATE TABLE job_position
(
    job_position_id int          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position        varchar(100) NOT NULL
);

ALTER TABLE employees
    ADD job_position_id int NOT NULL,
    ADD FOREIGN KEY (job_position_id) REFERENCES job_position (job_position_id);

CREATE TABLE pension_provider
(
    pension_provider_id int          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    is_default          boolean      NOT NULL,
    provider_name       varchar(100) NOT NULL
);

CREATE TABLE pension
(
    pension_id          int     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_number     int     NOT NULL,
    FOREIGN KEY (employee_number) REFERENCES employees (employee_number),
    amount_contributed  decimal NULL,
    pension_provider_id int     NOT NULL,
    FOREIGN KEY (pension_provider_id) REFERENCES pension_provider (pension_provider_id)
);