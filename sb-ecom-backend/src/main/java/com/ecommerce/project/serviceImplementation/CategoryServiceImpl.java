package com.ecommerce.project.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.models.Category;
import com.ecommerce.project.payloads.CategoryDTO;
import com.ecommerce.project.payloads.CategoryResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.services.CategoryService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize,  String sortBy, String sortOrder) {
		Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
				? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();
		
		Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
		Page<Category> categoryPage = categoryRepository.findAll(pageDetails);
		
		List<Category> categories = categoryPage.getContent();
		if(categories.isEmpty())
			throw new APIException("No category created till now.");
		
		List<CategoryDTO> categoryDtos = categories.stream()
				.map(category -> modelMapper.map(category, CategoryDTO.class))
				.collect(Collectors
				.toList());
		
		CategoryResponse categoryResponse = new CategoryResponse();
		categoryResponse.setContent(categoryDtos);
		categoryResponse.setPageNumber(categoryPage.getNumber());
		categoryResponse.setPageSize(categoryPage.getSize());
		categoryResponse.setTotalElements(categoryPage.getTotalElements());
		categoryResponse.setTotalPages(categoryPage.getTotalPages());
		categoryResponse.setLastPage(categoryPage.isLast());
		return categoryResponse;
	}

	@Override
	public CategoryDTO createCategory(CategoryDTO categoryDto) {
		Category category = modelMapper.map(categoryDto, Category.class);
		Category categoryFromDb = categoryRepository.findByCategoryName(category.getCategoryName());
		if(categoryFromDb != null)
			throw new APIException("Category with the name " + category.getCategoryName()+ "already exists !");
		Category savedCategory = categoryRepository.save(category);
		return modelMapper.map(savedCategory, CategoryDTO.class); 
	}

	@Override
	public CategoryDTO updateCategory(CategoryDTO categoryDto, Long categoryId) {
		
		Category savedCategory = categoryRepository.findById(categoryId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Resource not found"));
		
		Category category = modelMapper.map(categoryDto, Category.class);
		category.setCategoryId(categoryId);
		savedCategory = categoryRepository.save(category);
		return modelMapper.map(savedCategory, CategoryDTO.class); 
	}
	
	@Override
	public CategoryDTO deleteCategory(Long categoryId) {
		Category category = categoryRepository.findById(categoryId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Resource not found"));
		
		categoryRepository.delete(category);
		return modelMapper.map(category, CategoryDTO.class);
	}
}