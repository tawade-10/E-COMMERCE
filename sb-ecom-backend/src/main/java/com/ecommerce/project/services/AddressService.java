package com.ecommerce.project.services;

import java.util.List;

import com.ecommerce.project.models.User;
import com.ecommerce.project.payloads.AddressDTO;

public interface AddressService {

	AddressDTO createAddress(AddressDTO addressDTO, User user);

	List<AddressDTO> getAddresses();

	AddressDTO getAddressById(Long addressId);

	List<AddressDTO> getUserAddresses(User user);

	AddressDTO updateAddress(Long addressId, AddressDTO addressDTO);

	String deleteAddress(Long addressId);

}
