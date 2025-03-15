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
  CancelButton,
} from "../components/Form";

// 🔒 Authentication check
const checkAuthentication = (user, navigate) => {
  if (!user) {
    toast.error("Login Required");
    navigate("/login");
    return false;
  }
  return true;
};

const PostJobs = () => {
  // 🎯 State management
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
    badges: [],
  });
  const [selectedBadges, setSelectedBadges] = useState([]);

  const [postJob, { isLoading }] = usePostJobMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // 🔥 Check auth on mount
  useEffect(() => {
    checkAuthentication(userInfo, navigate);
  }, [userInfo, navigate]);

  // ✍️ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.slice(0, 500), // Limit input length
    });
  };

  // 🏅 Handle badge selection
  const handleBadgeChange = (e) => {
    const value = e.target.value;
    if (value && !selectedBadges.includes(value)) {
      setSelectedBadges([...selectedBadges, value]);
    }
  };

  const removeBadge = (badge) => {
    setSelectedBadges(selectedBadges.filter((b) => b !== badge));
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalData = { ...formData, badges: selectedBadges };

      const res = await postJob(finalData).unwrap();
      console.log(res);

      toast.success("Job posted successfully");
      navigate("/company-jobs"); // Redirect to job listing page
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCancel = () => navigate("/company-jobs");

  // 📍 Dropdown options
  const categoryOptions = [
    "Software",
    "AI/ML",
    "Data Science",
    "Cloud",
    "DevOps",
    "Security",
    "Frontend",
    "Backend",
  ];

  const badgeOptions = [
    { value: "Team Player", label: "Team Player" },
    { value: "Innovative", label: "Innovative" },
  ];

  return (
    <Form title="Post a New Job" onSubmit={handleSubmit}>
      {/* ✏️ Job Title */}
      <FormGroup label="Job Title" required>
        <FormInput
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
          required
        />
      </FormGroup>

      {/* 🛠️ Category */}
      <FormGroup label="Category" required>
        <FormSelect
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions.map((cat) => ({ value: cat, label: cat }))}
          required
        />
      </FormGroup>

      {/* 📄 Description */}
      <FormGroup label="Description" fullWidth>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          maxLength="500"
        />
        <div style={{ textAlign: "right", fontSize: "12px", color: "#666" }}>
          {formData.description.length}/500 characters
        </div>
      </FormGroup>

      {/* 🎓 Minimum Qualification */}
      <FormGroup label="Minimum Qualification">
        <FormInput
          name="minqualification"
          value={formData.minqualification}
          onChange={handleChange}
          placeholder="Enter minimum qualifications"
        />
      </FormGroup>

      {/* 👥 Position */}
      <FormGroup label="Position">
        <FormInput
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter job position"
        />
      </FormGroup>

      {/* 📍 Location */}
      <FormGroup label="Location">
        <FormInput
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter job location"
        />
      </FormGroup>

      {/* 🕒 Duration */}
      <FormGroup label="Duration">
        <FormInput
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Enter job duration (e.g., 3 months)"
        />
      </FormGroup>

      {/* 📅 Start Date */}
      <FormGroup label="Starts On" required>
        <FormInput
          type="date"
          name="startsOn"
          value={formData.startsOn}
          onChange={handleChange}
          required
        />
      </FormGroup>

      {/* 💸 Stipend */}
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

      {/* 🏅 Badges */}
      <FormGroup label="Required Badges">
        <label className="form-label">Select multiple badges:</label>
        <select
          className="form-select"
          onChange={handleBadgeChange}
          value=""
        >
          <option value="" disabled>
            Select badges...
          </option>
          {badgeOptions.map((badge) => (
            <option key={badge.value} value={badge.value}>
              {badge.label}
            </option>
          ))}
        </select>

        {/* 🎯 Show selected badges */}
        <div className="mt-2 d-flex flex-wrap gap-2">
          {selectedBadges.map((badge) => (
            <span key={badge} className="badge bg-primary p-2">
              {badge}
              <button
                type="button"
                className="btn-close ms-2"
                aria-label="Remove"
                onClick={() => removeBadge(badge)}
              ></button>
            </span>
          ))}
        </div>
      </FormGroup>

      {/* 🛠️ Actions */}
      <FormActions>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        <SubmitButton>{isLoading ? "Posting..." : "Post Job"}</SubmitButton>
      </FormActions>
    </Form>
  );
};

export default PostJobs;
