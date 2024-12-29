import React from "react";
import "./ProductLines.css";

const ProductLines = () => {
  const products = [
    {
      title: "Casual Shoes",
      description: "Stylish and comfortable footwear for everyday use.",
      img: "https://res.cloudinary.com/daxeovezx/image/upload/v1732753793/sandal_wqx3bt.png", // Replace with your Cloudinary link
    },
    {
      title: "Formal Shoes",
      description: "Perfectly crafted shoes for professional occasions.",
      img: "https://res.cloudinary.com/daxeovezx/image/upload/v1732752627/high-heel_hpbfhf.png", // Replace with your Cloudinary link
    },
    {
      title: "Sports Shoes",
      description: "Durable and high-performance shoes for athletes.",
      img: "https://res.cloudinary.com/daxeovezx/image/upload/v1732754065/run_itoz23.png", // Replace with your Cloudinary link
    },
    {
      title: "Custom Designs",
      description: "Tailor-made footwear  designed  just for you 💖.",
      img: "https://res.cloudinary.com/daxeovezx/image/upload/v1732752626/smart-shoe_suidyn.png", // Replace with your Cloudinary link
    },
  ];

  return (
    <div className="product-lines">
      <h2 className="section-title">Our Main Product Lines</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.img} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLines;
