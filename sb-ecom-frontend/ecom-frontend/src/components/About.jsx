import React from "react";
import ProductCard from "./shared/ProductCard";

const products = [
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-3xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left lg:mr-10">
          <p className="text-lg mb-8">
            Welcome to our Store! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Consectetur tempora consequatur itaque?
            Consequatur ullam libero sapiente beatae! Cupiditate accusantium,
            delectus, repellendus perspiciatis iste ipsum similique, deserunt
            blanditiis adipisci quaerat reiciendis!
          </p>
          <p className="text-lg">
            Our mission is to provide high-quality products with excellent
            customer service. We believe in creating a seamless shopping
            experience for everyone.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://placehold.co/600x400"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      <div>
        <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              productName={product.productName}
              description={product.description}
              specialPrice={product.specialPrice}
              price={product.price}
              about
            />
          ))}
        </div>
      </div>
      {/* <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>Customer Satisfaction</li>
          <li>Quality Products</li>
          <li>Innovation</li>
          <li>Integrity</li>
        </ul> 
      </div> */}
    </div>
  );
};

export default About;
