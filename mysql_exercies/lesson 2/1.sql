SELECT position, AVG(salary)
FROM employees
         JOIN job_position USING(job_position_id)
GROUP BY position;