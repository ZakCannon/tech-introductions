INSERT INTO pension_provider (is_default, provider_name)
VALUES (FALSE, 'PensionBee'),
       (FALSE, 'Crystal Trust'),
       (TRUE, 'NEST'),
       (FALSE, 'People\'s Pension');

INSERT INTO job_position (position)
VALUES ('New Starter'),
       ('Developer I'),
       ('Senior Developer'),
       ('Technical Lead'),
       ('Delivery Lead');

INSERT INTO employees (first_name, last_name, age, salary, job_position_id)
VALUES ('Zak', 'Cannon', 22, 12345, 2),
       ('Tom', 'Cusack', 23, 32154, 2),
       ('Benji', 'Marshall', 26, 23456, 3),
       ('Alice', 'Wenban', 25, 23118, 3),
       ('Matt', 'Barnfield', 29, 34567, 4),
       ('Seif', 'Ahmed', 19, 54321, 1),
       ('Simon', 'St John-Green', 37, 65432, 5),
       ('Frank', 'Ma', 24, 23441, 3);

INSERT INTO pension (employee_number, amount_contributed, pension_provider_id)
VALUES (1, 100, 2),
       (1, 321, 1),
       (2, 431, 4),
       (3, 715, 4),
       (4, 152, 1),
       (5, 45, 3),
       (5, 122, 1),
       (5, 72, 2),
       (6, 123, 1),
       (7, 712, 4);