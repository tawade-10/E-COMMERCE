package com.ecommerce.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.project.models.Order;

public interface OrderRepository extends JpaRepository<Order,Long>{

}
