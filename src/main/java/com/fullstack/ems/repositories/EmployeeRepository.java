package com.fullstack.ems.repositories;

import com.fullstack.ems.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {


}


