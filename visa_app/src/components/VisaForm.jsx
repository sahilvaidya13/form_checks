import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SubmissionSuccessModal = ({ onClose, id }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close hover:cursor-pointer text-2xl" onClick={onClose}>
          &times;
        </span>
        <h2>Submission Successful!</h2>
        <h3>Your Visa Applicant ID is: {id}</h3>
        <p>Your form has been submitted successfully.</p>
      </div>
    </div>
  );
};

const VisaForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appId, setId] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    mission: "",
    nationality: "",
    dob: "",
    email: "",
    reEnterEmail: "",
    expectedDate: "",
    visaType: "",
    purpose: "",
    captcha: "",
  });

  const [errors, setErrors] = useState({});

  const generateCaptcha = () => {
    return "ABCD"; // For now, returning a static captcha code
  };
  const handleCaptchaChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      captcha: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }
    if (!formData.mission.trim()) {
      newErrors.mission = "Office is required.";
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required.";
    }
    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.reEnterEmail.trim()) {
      newErrors.reEnterEmail = "Please re-enter your email.";
    } else if (formData.email !== formData.reEnterEmail) {
      newErrors.reEnterEmail = "Emails do not match.";
    }
    if (!formData.expectedDate.trim()) {
      newErrors.expectedDate = "Expected Date of Approval is required.";
    }
    if (!formData.visaType.trim()) {
      newErrors.visaType = "Visa Type is required.";
    }
    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required.";
    }
    if (!formData.captcha.trim()) {
      newErrors.captcha = "Please enter the captcha.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // Submit the form
      try {
        const response = await fetch("http://localhost:5000/api/addApplicant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        const responseData = await response.json();
        await console.log(responseData.data);
        await setId(responseData.data.applicant_id);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setIsModalOpen(true);
    } else {
      console.log("Form has errors:", errors);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h4
        className="hover:cursor-pointer text-red-600"
        onClick={() => navigate("/admin")}
      >
        Click for Admin Login
      </h4>
      <h2 className="text-2xl font-semibold mb-4">Visa Application Form</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-gray-700 font-semibold mb-2"
          >
            Country/Region applying visa from:
          </label>
          <select
            name="country"
            id="country"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.country}
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="UAE">UAE</option>
            <option value="Japan">Japan</option>
            <option value="Russia">Russia</option>
          </select>
          {errors.country && (
            <span className="text-red-500">{errors.country}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="mission"
            className="block text-gray-700 font-semibold mb-2"
          >
            Indian Mission/Office:
          </label>
          <select
            name="mission"
            id="mission"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.mission}
          >
            <option value="">Select Office</option>
            <option value="MAIN">Main Office</option>
          </select>
          {errors.mission && (
            <span className="text-red-500">{errors.mission}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="nationality"
            className="block text-gray-700 font-semibold mb-2"
          >
            Nationality:
          </label>
          <select
            name="nationality"
            id="nationality"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.nationality}
          >
            <option value="">Select Nationality</option>
            <option value="USA">American</option>
            <option value="UK">British</option>
            <option value="UAE">Arab</option>
            <option value="Japan">Japanese</option>
            <option value="Russia">Russian</option>
          </select>
          {errors.nationality && (
            <span className="text-red-500">{errors.nationality}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-gray-700 font-semibold mb-2"
          >
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.dob}
          />
          {errors.dob && <span className="text-red-500">{errors.dob}</span>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.email}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="reEnterEmail"
            className="block text-gray-700 font-semibold mb-2"
          >
            Re-enter Email:
          </label>
          <input
            type="email"
            name="reEnterEmail"
            id="reEnterEmail"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.reEnterEmail}
          />
          {errors.reEnterEmail && (
            <span className="text-red-500">{errors.reEnterEmail}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="expectedDate"
            className="block text-gray-700 font-semibold mb-2"
          >
            Expected Date of Approval:
          </label>
          <input
            type="date"
            name="expectedDate"
            id="expectedDate"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.expectedDate}
          />
          {errors.expectedDate && (
            <span className="text-red-500">{errors.expectedDate}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="visaType"
            className="block text-gray-700 font-semibold mb-2"
          >
            Visa Type:
          </label>
          <select
            name="visaType"
            id="visaType"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.visaType}
          >
            <option value="">Select Type</option>
            <option value="GEN">General</option>
          </select>
          {errors.visaType && (
            <span className="text-red-500">{errors.visaType}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="purpose"
            className="block text-gray-700 font-semibold mb-2"
          >
            Purpose:
          </label>
          <input
            type="text"
            name="purpose"
            id="purpose"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.purpose}
          />
          {errors.purpose && (
            <span className="text-red-500">{errors.purpose}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="captcha"
            className="block text-gray-700 font-semibold mb-2"
          >
            Captcha:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="captcha"
              id="captcha"
              className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={handleCaptchaChange}
              value={formData.captcha}
            />
            <span className="ml-2">{generateCaptcha()}</span>
          </div>
          {errors.captcha && (
            <span className="text-red-500">{errors.captcha}</span>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </div>
        {isModalOpen && (
          <SubmissionSuccessModal onClose={closeModal} id={appId} />
        )}
      </form>
    </div>
  );
};

export default VisaForm;
