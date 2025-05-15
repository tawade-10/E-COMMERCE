package com.ecommerce.project.services;

import com.ecommerce.project.payloads.OrderDTO;

import jakarta.transaction.Transactional;

public interface OrderService {
	@Transactional
    OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage);
}
