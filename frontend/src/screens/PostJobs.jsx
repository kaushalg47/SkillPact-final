import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostJobMutation } from "../slices/jobsApiSlice";
import Form, { 
  FormGroup, 
  FormInput, 
  FormTextarea, 
  FormSelect, 
  FormActions, 
  SubmitButton,
  CancelButton
} from "../components/Form";

const checkAuthentication = (tempData, navigate) => {
  if (!tempData) {
    toast.error("Login Required");
    navigate("/login");
    return false;
  }
  return true;
};

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    minqualification: "",
    position: "",
    location: "",
    duration: "",
    startsOn: "",
    stipend: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [postJob, { isLoading }] = usePostJobMutation();
  const navigate = useNavigate();
  let { userInfo: tempData } = useSelector((state) => state.auth);

  useEffect(() => {
    checkAuthentication(tempData, navigate);
  }, [tempData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postJob(formData).unwrap();
      console.log(res);
      toast.success("Job Posted successfully");
      navigate("/company-jobs"); // redirect to home page after update
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCancel = () => {
    navigate("/company-jobs");
  };

  const categoryOptions = [
    { value: "Software", label: "Software" },
    { value: "AI/ML", label: "AI/ML" },
    { value: "Data Science", label: "Data Science" },
    { value: "Cloud", label: "Cloud" },
    { value: "DevOps", label: "DevOps" },
    { value: "Security", label: "Security" },
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
  ];

  return (
    <Form title="Post a New Job" onSubmit={handleSubmit}>
      <FormGroup label="Job Title" required>
        <FormInput
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
          required
        />
      </FormGroup>
      
      <FormGroup label="Category" required>
        <FormSelect
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          required
        />
      </FormGroup>
      
      <FormGroup label="Description" fullWidth>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
        />
      </FormGroup>
      
      <FormGroup label="Minimum Qualification">
        <FormInput
          name="minqualification"
          value={formData.minqualification}
          onChange={handleChange}
          placeholder="Enter minimum qualifications"
        />
      </FormGroup>
      
      <FormGroup label="Position">
        <FormInput
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter job position"
        />
      </FormGroup>
      
      <FormGroup label="Location">
        <FormInput
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter job location"
        />
      </FormGroup>
      
      <FormGroup label="Duration">
        <FormInput
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Enter job duration (e.g., 3 months)"
        />
      </FormGroup>
      
      <FormGroup label="Starts On" required>
        <FormInput
          type="date"
          name="startsOn"
          value={formData.startsOn}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup label="Stipend">
        <FormInput
          type="number"
          name="stipend"
          min="0"
          value={formData.stipend}
          onChange={handleChange}
          placeholder="Enter stipend amount"
        />
      </FormGroup>
      
      <FormActions>
        <div>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <SubmitButton>{isLoading ? "Posting..." : "Post Job"}</SubmitButton>
        </div>
      </FormActions>
    </Form>
  );
};

export default PostJobs;