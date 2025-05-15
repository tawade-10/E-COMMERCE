package com.ecommerce.project.exceptions;

public class ResourceNotFoundException extends RuntimeException{
	
	String resourceName;
	String field;
	Object fieldId;
	
	public ResourceNotFoundException() {
	
	}

	public ResourceNotFoundException(String resourceName, String field, Object fieldId) {
		super(String.format("%s not found with %s", resourceName, field, fieldId));
		this.resourceName = resourceName;
		this.field = field;
		this.fieldId = fieldId;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public Object getFieldId() {
		return fieldId;
	}

	public void setFieldId(Long fieldId) {
		this.fieldId = fieldId;
	}	
}
