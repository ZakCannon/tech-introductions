INSERT INTO pension (employee_number, amount_contributed, pension_provider_id)
SELECT employee_number, 0, (SELECT pension_provider_id FROM pension_provider WHERE is_default)
FROM employees
         LEFT JOIN pension USING (employee_number)
WHERE pension_id IS NULL;