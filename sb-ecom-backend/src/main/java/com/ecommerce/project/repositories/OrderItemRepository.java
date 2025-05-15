package com.ecommerce.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.project.models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long>{

}
