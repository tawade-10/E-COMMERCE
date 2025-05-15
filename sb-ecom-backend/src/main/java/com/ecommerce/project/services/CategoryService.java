
package com.ecommerce.project.services;

import com.ecommerce.project.payloads.CategoryDTO;
import com.ecommerce.project.payloads.CategoryResponse;

public interface CategoryService {

	CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
	CategoryDTO createCategory(CategoryDTO category);
	CategoryDTO deleteCategory(Long categoryId);
	CategoryDTO updateCategory(CategoryDTO categoryDto, Long categoryId);
}
