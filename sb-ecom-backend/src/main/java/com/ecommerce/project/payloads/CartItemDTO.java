package com.ecommerce.project.payloads;

import lombok.Data;

@Data
public class CartItemDTO {
	
	private Long cartItemId;
	private CartDTO cart;
	private ProductDTO productDTO;
	private Integer quantity;
	private double discount;
	private double productPrice;
	
	public CartItemDTO() {
	}

	public CartItemDTO(Long cartItemId, CartDTO cart, ProductDTO productDTO, Integer quantity, double discount,
			double productPrice) {
		this.cartItemId = cartItemId;
		this.cart = cart;
		this.productDTO = productDTO;
		this.quantity = quantity;
		this.discount = discount;
		this.productPrice = productPrice;
	}

	public Long getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}

	public CartDTO getCart() {
		return cart;
	}

	public void setCart(CartDTO cart) {
		this.cart = cart;
	}

	public ProductDTO getProductDTO() {
		return productDTO;
	}

	public void setProductDTO(ProductDTO productDTO) {
		this.productDTO = productDTO;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}
}
