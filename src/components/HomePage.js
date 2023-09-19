import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    difficulty: 'easy',
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form data or handle it as needed
      console.log('Submitted:', formData);
    }
  };

  return (
    <div className="registration-container">
      <h1>User Registration</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile Number:
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label">
            Select Difficulty Level:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="form-select"
            value={formData.difficulty}
            onChange={handleInputChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {submitError && <div className="text-danger mt-2">{submitError}</div>}
      </form>
    </div>
  );
}

export default HomePage;
