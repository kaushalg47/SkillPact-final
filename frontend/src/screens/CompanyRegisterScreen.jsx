import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterCompanyMutation } from "../slices/companyApiSlice";
import Loader from "../components/Loader";
import Form, { FormGroup, FormInput, FormTextarea, SubmitButton } from "../components/Form";

const CompanyRegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [registerCompany, { isLoading }] = useRegisterCompanyMutation();

  useEffect(() => {
    if (!userInfo) {
      toast.error("Login Required!");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.location) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await registerCompany({
        companyInfo: formData,
      }).unwrap();

      toast.success("Company registered successfully!");
      navigate("/company-info");
    } catch (err) {
      console.error("Company registration failed:", err);
      toast.error(err?.data?.message || "Failed to register company.");
    }
  };

  return (
    <Form title="Register Your Company" onSubmit={handleSubmit}>
      <FormGroup label="Company Name" required>
        <FormInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter company name"
          required
        />
      </FormGroup>

      <FormGroup label="Website">
        <FormInput
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Enter company website"
        />
      </FormGroup>

      <FormGroup label="Location" required>
        <FormInput
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter company location"
          required
        />
      </FormGroup>

      <FormGroup label="Description" fullWidth required>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter company description"
          required
        />
      </FormGroup>

      {isLoading && <Loader />}

      <SubmitButton>Register Company</SubmitButton>
    </Form>
  );
};

export default CompanyRegisterScreen;
