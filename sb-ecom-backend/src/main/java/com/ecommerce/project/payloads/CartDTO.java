package com.ecommerce.project.payloads;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CartDTO {
	
	private Long cartId;
	private double totalPrice = 0.0;
	private List<ProductDTO> products = new ArrayList<>();
	
	public CartDTO() {
	}

	public CartDTO(Long cartId, double totalPrice, List<ProductDTO> products) {
		this.cartId = cartId;
		this.totalPrice = totalPrice;
		this.products = products;
	}

	public Long getCartId() {
		return cartId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<ProductDTO> getProducts() {
		return products;
	}

	public void setProducts(List<ProductDTO> products) {
		this.products = products;
	}
}
