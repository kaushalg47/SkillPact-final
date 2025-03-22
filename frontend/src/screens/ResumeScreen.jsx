import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllPurchasedCoursesQuery } from "../slices/coursePurchaseApiSlice";
import { useGetUserApplicationsQuery } from "../slices/applicationApiSlice";
import { useGetUserProfileQuery } from "../slices/usersApiSlice";
import { Link } from "react-router-dom";
import Loader from '../components/Loader';
import { Badge } from "react-bootstrap";
import ErrorScreen from './ErrorScreen';
import { Copy } from "lucide-react";
const ResumeScreen = () => {
	const {
		data,
		error: applicationError,
		isLoading: applicationDataLoading,
	} = useGetUserApplicationsQuery();
	const [name, setName] = useState("");
	let { userInfo: tempData } = useSelector((state) => state.auth);
	const {
		data: userInfo,
		error: userDataError,
		isLoading: userDataLoading,
	} = useGetUserProfileQuery(tempData?._id);

	const { data: purchasedCourses, error: purchasedCoursesError, isLoading: purchasedCoursesLoading } = useGetAllPurchasedCoursesQuery();

	const displayLinkCode = `/public-profile-url`;
	const linkCode = `https://skillpact.co.in/profile/${userInfo?._id}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

	useEffect(() => {
		if (tempData) {
			setName(tempData.name || "N/A");
		}
	}, [tempData]);
	if (applicationDataLoading || userDataLoading) {
		return <Loader text="Loading your profile information..." />;
	}

	if (applicationError || userDataError) {
		return <ErrorScreen message="Failed to load your profile data." 
		retry={() => window.location.reload()} 
		/>;
	}

	if (purchasedCoursesLoading) return <div className="text-center mt-5">Loading...</div>;
	if (purchasedCoursesError)
		return (
			<div className="text-center mt-5 text-danger">
				Error: {purchasedCoursesError?.data?.message || purchasedCoursesError?.message || "An unknown error occurred"}
			</div>
		);

	const applications = data?.application || [];
	const badgesCount = userInfo?.badges?.length || 0;
	const favoriteBadges = userInfo?.badges || [];

	if (purchasedCoursesLoading) return <div className="text-center mt-5">Loading...</div>;
	if (purchasedCoursesError)
		return (
			<div className="text-center mt-5 text-danger">
				Error: {purchasedCoursesError?.data?.message || purchasedCoursesError?.message || "An unknown error occurred"}
			</div>
		);

		const getStatusVariant = (status) => {
			switch (status) {
				case "pending":
					return "warning";
				case "accepted":
					return "success";
				case "rejected":
					return "danger";
				default:
					return "secondary";
			}
		};

	return (
		<div className="container py-4">
			{!userInfo?.resume && (
				<div className="mb-4 alert alert-danger text-center" role="alert">
					Please update your resume through Edit Profile
				</div>
			)}

			<div className="row mb-4">
				<div className="col-md-4">
					<div className="card shadow-sm h-100">
						<div className="card-body">
							<h4 className="card-title text-primary">{name}</h4>
							<p className="text-muted">{userInfo?.email || "No bio available"}</p>
							<center>
								<div className="d-flex align-items-center justify-content-center">
									<code className="text-sm text-gray-700 p-2 bg-white rounded-md border">{displayLinkCode}</code>
									<button className="ml-2 p-2 bg-white rounded" onClick={copyToClipboard}>
										<Copy size={16} />
									</button>
								</div>
								{copied && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
							</center>
							<div className="d-flex align-items-center mb-2">
								<span className="me-2">📍</span>
								<span className="text-muted">{userInfo?.location || "Not provided"}</span>
							</div>
							<div className="d-flex align-items-center">
								<span className="me-2">🏆</span>
								<span className="text-muted">{badgesCount} badge(s)</span>
							</div>
							
							<Link className="btn btn-secondary mt-3" to="/profile/edit">Edit profile</Link>
						</div>
					</div>
				</div>

				<div className="col-md-8">
					<div className="card shadow-sm h-100">
						<div className="card-body equal-height">
							<h5 className="card-title mb-5">Achievements</h5>
							<div className="achievement-stats">
								<div className="row w-100">
									{[
										{ title: "Badges", count: badgesCount },
										{ title: "Courses", count: purchasedCourses?.length || 0 },
										{ title: "Internships", count: applications.filter(app => app.status === "accepted").length || 0 },
									].map((achievement, index) => (
										<div className="col-md-4" key={index}>
											<div className="card bg-light h-100">
												<div className="card-body text-center">
													<h3>{achievement.count}</h3>
													<p className="mb-0">{achievement.title}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-4">
				<h5 className="mb-3">Badges</h5>
				<div className="row g-3">
					{favoriteBadges.length > 0 ? (
						favoriteBadges.map((badge, index) => (
							<div className="col-md-3" key={index}>
								<div className="card shadow-sm text-center">
									<div className="card-body">
										<img src={badge.imageUrl} alt={badge.title} className="img-fluid mb-2" />
										<h6 className="card-title">{badge.title}</h6>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="text-muted text-center">No favorite badges available</p>
					)}
				</div>
			</div>

			<div className="mt-4">
				<h5 className="mb-3">Purchased Courses</h5>
				{purchasedCourses?.length > 0 ? (
					<div className="row">
						{purchasedCourses.map((course) => (
							<div className="col-md-4 mb-3" key={course._id}>
								<div className="card shadow-sm">
									<div className="card-body">
										<h6 className="card-title">{course.title}</h6>
										<p className="text-muted small">Instructor: {course.instructor}</p>
										<p className="text-muted small">Status: {course.status}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted text-center">No purchased courses available</p>
				)}
			</div>

			<div className="mt-4">
				<h5 className="mb-3">Applied Jobs</h5>
				{applications.length > 0 ? (
					<div className="row">
						{applications.map((application) => (
							<div className="col-md-4 mb-3" key={application._id}>
								<div className="card shadow-sm">
									<div className="card-body">
										<h6 className="card-title">{application.job?.title || "N/A"}</h6>
										<p className="text-muted small">Company: {application.job?.company.name || "N/A"}</p>
										<p className="text-muted small">
											Status:{" "}
											<Badge bg={getStatusVariant(application.status)}>
												{application.status}
											</Badge>
										</p>

									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted text-center">Not applied for any jobs yet</p>
				)}
			</div>
		</div>
	);
};

export default ResumeScreen;
