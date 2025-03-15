import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  useGetUserCompanyInfoQuery, 
  useUpdateCompanyMutation 
} from "../slices/companyApiSlice";
import Form, { 
  FormGroup, 
  FormInput, 
  FormTextarea, 
  FormActions, 
  SubmitButton,
  EditButton,
  CancelButton,
  LinkButton
} from "../components/Form";
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";
const CompanyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  let { userInfo: tempData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const { data, isLoading, refetch } = useGetUserCompanyInfoQuery(tempData?._id, { 
    skip: !tempData 
  });
  
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  // Check authentication
  useEffect(() => {
    if (!tempData) {
      navigate("/login");
      toast.error("Login Required");
    }
  }, [tempData, navigate]);

  // Set form data from API data
  useEffect(() => {
    if (data && data.company) {
      setFormData({
        name: data.company.name || "",
        description: data.company.description || "",
        website: data.company.website || "",
        location: data.company.location || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (!data || !data.company || !data.company._id) {
		toast.error("Company information is missing.");
		console.error("Error: Missing company ID", data);
		return;
		}
	
		try {
		console.log("Updating company with ID:", data.company._id);
	
		await updateCompany({
			compId: data.company._id,
			data: { companyInfo: formData },
		}).unwrap();
	
		toast.success("Company information updated successfully");
		setIsEditing(false);
		refetch(); // Refresh the data after update
		} catch (err) {
		console.error("Update error:", err);
		toast.error(err?.data?.message || err.error);
		}
	};
  

  const handleCancel = () => {
    if (data && data.company) {
      setFormData({
        name: data.company.name || "",
        description: data.company.description || "",
        website: data.company.website || "",
        location: data.company.location || "",
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <Loader text="Loading company information..." />;
  }

  if (!data || !data.company) {
    return <ErrorScreen message="Company profile not found or not yet created." navigateTo="/company-register" />;
  }

  return (
    <Form title="Company Information" onSubmit={handleSubmit}>
      <FormGroup label="Company Name" required>
        <FormInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter company name"
          required
          readOnly={!isEditing}
        />
      </FormGroup>
      
      <FormGroup label="Website">
        <FormInput
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Enter company website"
          readOnly={!isEditing}
        />
      </FormGroup>
      
      <FormGroup label="Location">
        <FormInput
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter company location"
          readOnly={!isEditing}
        />
      </FormGroup>
      
      <FormGroup label="Description" fullWidth>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter company description"
          readOnly={!isEditing}
        />
      </FormGroup>
      
      <FormActions>
        <div>
          {isEditing ? (
            <>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <SubmitButton>{isUpdating ? "Updating..." : "Save Changes"}</SubmitButton>
            </>
          ) : (
            <EditButton onClick={() => setIsEditing(true)} />
          )}
        </div>
        
        {!isEditing && (
          <div>
            <LinkButton to="/company-jobs">View Jobs</LinkButton>
            <LinkButton to="/post-jobs">Post Jobs</LinkButton>
          </div>
        )}
      </FormActions>
    </Form>
  );
};

export default CompanyInfo;
