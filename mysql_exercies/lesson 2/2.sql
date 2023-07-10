SELECT provider_name, COUNT(*)
FROM employees
         JOIN pension USING(employee_number)
         JOIN pension_provider USING(pension_provider_id)
GROUP BY provider_name;