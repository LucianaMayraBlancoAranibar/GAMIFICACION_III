import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [inputs, setInputs] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!inputs.currentPassword) {
      isValid = false;
      errors['currentPassword'] = 'Please enter your current password.';
    }

    const passwordRegex = {
      lowerCase: new RegExp('(?=.*[a-z])'),
      upperCase: new RegExp('(?=.*[A-Z])'),
      number: new RegExp('(?=.*[0-9])'),
      specialChar: new RegExp('(?=.*[!@#$%^&*])'),
      minLength: new RegExp('(?=.{8,})') // Adjust the minimum length as needed
    };

    if (!inputs.newPassword) {
      isValid = false;
      errors['newPassword'] = 'Please enter your new password.';
    } else {
      if (!passwordRegex.lowerCase.test(inputs.newPassword)) {
        isValid = false;
        errors['newPassword'] = 'Password must include at least one lowercase letter.';
      }
      if (!passwordRegex.upperCase.test(inputs.newPassword)) {
        isValid = false;
        errors['newPassword'] = 'Password must include at least one uppercase letter.';
      }
      if (!passwordRegex.number.test(inputs.newPassword)) {
        isValid = false;
        errors['newPassword'] = 'Password must include at least one number.';
      }
      if (!passwordRegex.specialChar.test(inputs.newPassword)) {
        isValid = false;
        errors['newPassword'] = 'Password must include at least one special character (!@#$%^&*).';
      }
      if (!passwordRegex.minLength.test(inputs.newPassword)) {
        isValid = false;
        errors['newPassword'] = 'Password must be at least 8 characters long.';
      }
    }

    if (inputs.newPassword !== inputs.confirmPassword) {
      isValid = false;
      errors['confirmPassword'] = 'The new passwords do not match.';
    }

    setErrors(errors);
    return isValid;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const userID = localStorage.getItem("userID");

    if (!userID) {
      // Handle the case where userID is not set, which could indicate the user is not logged in
      console.error("No user ID found in local storage. User might not be logged in.");
      return;
    }

    try {
      // Replace with your API endpoint
      const endpoint = 'https://localhost:7205/api/Usuarios/api/users/change-password';
      const payload = {
        userId: userID,
        currentPassword: inputs.currentPassword,
        newPassword: inputs.newPassword
      };
      const response = await axios.post(endpoint, payload);
      // Handle the response accordingly
      console.log(response.data);
      // Clear the form or provide further user feedback
    } catch (error) {
      // Handle errors such as incorrect current password, etc.
      console.error(error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={inputs.currentPassword}
          onChange={handleInputChange}
        />
        {errors.currentPassword && <p>{errors.currentPassword}</p>}
      </div>

      <div>
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleInputChange}
        />
        {errors.newPassword && <p>{errors.newPassword}</p>}
      </div>

      <div>
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
