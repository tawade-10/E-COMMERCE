package com.ecommerce.project.services;


import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.project.payloads.CartDTO;

public interface CartService {

	CartDTO addProductToCart(Long productId, Integer quantity);

	List<CartDTO> getAllCarts();

	CartDTO getCart(String emailId, Long cartId);

	@Transactional
	CartDTO updateProductQuantityInCart(Long productId,Integer quantity);

	String deleteProductFromCart(Long cartId, Long productId);

	void updateProductInCarts(Long cartId, Long productId);
}
