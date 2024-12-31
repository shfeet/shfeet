import React, { useState, useEffect } from 'react';

import ReviewCarousel from './ReviewCarousel';
import "./Review.css";



function Review() {
    const [reviews, setReviews] = useState([]); 
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 

  useEffect(() => {
    
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://shfeet-backend-3.vercel.app/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again later.');
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting review with formData:', formData);
    try {
      const response = await fetch('https://shfeet-backend-3.vercel.app/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Server response:', response);


      const newReview = await response.json();
      console.log('Response body:', newReview); 


      if (!response.ok) {
        throw new Error(newReview.message || 'Failed to submit review');
      }

      setReviews((prevReviews) => [...prevReviews, newReview]); // Update reviews dynamically
      setFormData({ name: '', review: '', rating: 0 }); // Reset form
      setSuccessMessage('Review submitted successfully!'); // Set success message
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.'); // Set error message
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  
  return (
    <> 
    <div className='div'>
    <h2 className="section-title">What Our Clients Say</h2>
{/* Display Review Carousel */}
<ReviewCarousel reviews={reviews} />
</div>

    <div className="review-section">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Review:
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rating:
          {[...Array(5)].map((star, index) => (
            <span
              key={index}
              className={`star ${formData.rating > index ? 'filled' : ''}`}
              onClick={() => handleRatingChange(index + 1)}
              role="button" // Added role for better accessibility
              tabIndex={0} // Added tabindex for better accessibility
              onKeyPress={(e) => e.key === 'Enter' && handleRatingChange(index + 1)} // Handle keyboard events
            >
              &#9733;
            </span>
          ))}
        </label>
        <button type="submit">Submit Review</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>

      
    </div>
    </>
  )
}


export default Review;