import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile, profileUpdate } from "../../app/Slicers/auth.Slice";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profile: "",
  });

  const getProfileImageUrl = (path) =>
    path ? `http://localhost:4001/${path.replace(/\\/g, "/")}` : "";

  useEffect(() => {
    if (user?.id) {
      dispatch(profile(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        profile: user.profile || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("USER :   ", user);
    dispatch(profileUpdate({ userId: user._id, formData }));
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Profile</h2>
          <p className="mt-2 text-sm text-white">
            This information will be displayed publicly, so be careful what you
            share.
          </p>
        </div>

        <div className="border-b border-gray-300 pb-6">
          <h3 className="text-lg font-semibold text-yellow-400">
            Profile Photo
          </h3>
          <div className="mt-4 flex items-center justify-center gap-x-4">
            {user?.profile ? (
              <img
                src={getProfileImageUrl(user.profile[0].path)}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="h-16 w-16 text-gray-300" />
            )}
            <label htmlFor="profile-photo">
              <button
                type="button"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </label>
            <input
              id="profile-photo"
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="border-b border-gray-300 pb-6">
          <h3 className="text-lg font-semibold text-yellow-400">
            Personal Information
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
