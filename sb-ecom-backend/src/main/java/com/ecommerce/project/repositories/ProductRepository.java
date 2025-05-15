package com.ecommerce.project.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.ecommerce.project.models.Category;
import com.ecommerce.project.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{

	 Page<Product> findByCategoryOrderByPriceAsc(Category category, Pageable pageDetails);

	    Page<Product> findByProductNameLikeIgnoreCase(String keyword, Pageable pageDetails);

}