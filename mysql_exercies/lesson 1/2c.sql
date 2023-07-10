UPDATE pension, employees
SET amount_contributed = amount_contributed + (0.05 * (employees.salary / 12))
WHERE pension.employee_number = employees.employee_number;