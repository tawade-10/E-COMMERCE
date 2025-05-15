package com.ecommerce.project.payloads;

import lombok.Data;

@Data
public class OrderRequestDTO {
    private Long paymentId;
    private String paymentMethod;
    private String pgName;
    private String pgPaymentId;
    private String pgStatus;
    private String pgResponseMessage;
	
    public OrderRequestDTO() {
	}

	public OrderRequestDTO(Long paymentId, String paymentMethod, String pgName, String pgPaymentId, String pgStatus,
			String pgResponseMessage) {
		this.paymentId = paymentId;
		this.paymentMethod = paymentMethod;
		this.pgName = pgName;
		this.pgPaymentId = pgPaymentId;
		this.pgStatus = pgStatus;
		this.pgResponseMessage = pgResponseMessage;
	}

	public Long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getPgName() {
		return pgName;
	}

	public void setPgName(String pgName) {
		this.pgName = pgName;
	}

	public String getPgPaymentId() {
		return pgPaymentId;
	}

	public void setPgPaymentId(String pgPaymentId) {
		this.pgPaymentId = pgPaymentId;
	}

	public String getPgStatus() {
		return pgStatus;
	}

	public void setPgStatus(String pgStatus) {
		this.pgStatus = pgStatus;
	}

	public String getPgResponseMessage() {
		return pgResponseMessage;
	}

	public void setPgResponseMessage(String pgResponseMessage) {
		this.pgResponseMessage = pgResponseMessage;
	}
}
