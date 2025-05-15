package com.ecommerce.project.payloads;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddressDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressId;
	
	@NotBlank
	@Size(min = 5, message = "Street name must be atleast 5 characters")
	private String street;
	
	@NotBlank
	@Size(min = 5, message = "Building name must be atleast 5 characters")
	private String buildingName;
	
	@NotBlank
	@Size(min = 5, message = "City name must be atleast 2 characters")
	private String city;
	
	@NotBlank
	@Size(min = 2, message = "State name must be atleast 2 characters")
	private String state;
	
	@NotBlank
	@Size(min = 2, message = "Country name must be atleast 2 characters")
	private String country;
	
	@NotBlank
	@Size(min = 6, message = "Pincode must be atleast 6 characters")
	private String pincode;

	public AddressDTO() {
	}

	public AddressDTO(Long addressId,
			@NotBlank @Size(min = 5, message = "Street name must be atleast 5 characters") String street,
			@NotBlank @Size(min = 5, message = "Building name must be atleast 5 characters") String buildingName,
			@NotBlank @Size(min = 5, message = "City name must be atleast 2 characters") String city,
			@NotBlank @Size(min = 2, message = "State name must be atleast 2 characters") String state,
			@NotBlank @Size(min = 2, message = "Country name must be atleast 2 characters") String country,
			@NotBlank @Size(min = 6, message = "Pincode must be atleast 6 characters") String pincode) {
		this.addressId = addressId;
		this.street = street;
		this.buildingName = buildingName;
		this.city = city;
		this.state = state;
		this.country = country;
		this.pincode = pincode;
	}

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
}

