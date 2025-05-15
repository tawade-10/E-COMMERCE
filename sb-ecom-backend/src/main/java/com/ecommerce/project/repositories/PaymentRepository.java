package com.ecommerce.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.project.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Long>{

}
