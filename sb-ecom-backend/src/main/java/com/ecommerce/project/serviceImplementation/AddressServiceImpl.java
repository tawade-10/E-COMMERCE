package com.ecommerce.project.serviceImplementation;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.models.Address;
import com.ecommerce.project.models.User;
import com.ecommerce.project.payloads.AddressDTO;
import com.ecommerce.project.repositories.AddressRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.services.AddressService;

@Service
public class AddressServiceImpl implements AddressService{

	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	AddressRepository addressRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public AddressDTO createAddress(AddressDTO addressDTO, User user) {
		Address address = modelMapper.map(addressDTO, Address.class);
		List<Address> addressList = user.getAddresses();
		addressList.add(address);
		user.setAddresses(addressList);
		address.setUser(user);
		Address savedAddress = addressRepository.save(address);
		return modelMapper.map(savedAddress, AddressDTO.class);
	}

	@Override
	public List<AddressDTO> getAddresses() {
		List<Address> addresses = addressRepository.findAll();
		List<AddressDTO> addressDTOs = addresses.stream()
		.map(address -> modelMapper.map(address,AddressDTO.class))
		.toList();
		return addressDTOs;
	}

	@Override
	public AddressDTO getAddressById(Long addressId) {
		Address address = addressRepository.findById(addressId)
		.orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
		return modelMapper.map(address, AddressDTO.class);
	}

	@Override
	public List<AddressDTO> getUserAddresses(User user) {
		List<Address> addresses = user.getAddresses();
		return addresses.stream()
		.map(address -> modelMapper.map(address,AddressDTO.class))
		.toList();
	}

	@Override
	public AddressDTO updateAddress(Long addressId, AddressDTO addressDTO) {
		Address addressFromDatabase = addressRepository.findById(addressId)
				.orElseThrow(() -> new ResourceNotFoundException("Address","addressId",addressId));
		addressFromDatabase.setCity(addressDTO.getCity());
		addressFromDatabase.setBuildingName(addressDTO.getBuildingName());
		addressFromDatabase.setCountry(addressDTO.getCountry());
		addressFromDatabase.setPincode(addressDTO.getPincode());
		addressFromDatabase.setState(addressDTO.getState());
		addressFromDatabase.setStreet(addressDTO.getStreet());
		
		Address updatedAddress = addressRepository.save(addressFromDatabase);
		User user = addressFromDatabase.getUser();
		user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
		user.getAddresses().add(updatedAddress);
		userRepository.save(user);
		return modelMapper.map(addressFromDatabase,AddressDTO.class);
	}

	@Override
	public String deleteAddress(Long addressId) {
		Address addressFromDatabase = addressRepository.findById(addressId)
				.orElseThrow(() -> new ResourceNotFoundException("Address","addressId",addressId));
		
		User user = addressFromDatabase.getUser();
		user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
		userRepository.save(user);
		addressRepository.delete(addressFromDatabase);
		return "Address Deleted Successfully with addressId: " + addressId;
	}

}
