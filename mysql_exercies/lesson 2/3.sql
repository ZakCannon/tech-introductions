SELECT DISTINCT(CONCAT(first_name, ' ', last_name))
FROM employees
         LEFT JOIN pension USING(employee_number)
WHERE pension_id IS NULL;
-- Happens to be null for the test data - very financially responsible