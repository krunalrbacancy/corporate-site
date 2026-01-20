import React, { useState } from "react";
import Meta from "../components/common/Meta";
const APP_URL = import.meta.env.VITE_APP_URL;

const EMPTYSTATE = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type EmptyStateProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<EmptyStateProps>(EMPTYSTATE);
  const [error, setError] = useState<EmptyStateProps>(EMPTYSTATE);
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email address";
        }
        return "";

      case "subject":
        return value.trim() ? "" : "Subject is required";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) {
          return "Message lenght must be greater than 10 character";
        }
        return "";

      default:
        return "";
    }
  };

  const validateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setError((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));

    return "";
  };

  const isFormIncomplete = Object.values(formData).some(value => value.trim() === "");
  const hasError = Object.values(error).some(error => error !== "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };
  
  const fetchContactData = async (data: EmptyStateProps) => {
    const response = await fetch(`${APP_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Server error");
    }

    return result;
  }

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormIncomplete || hasError) return;

    setIsLoading(true);
    setApiError("");

    try {
      const result = await fetchContactData(formData);

      if (result.success) {
        setIsSuccess(true);
        setFormData(EMPTYSTATE);
        setError(EMPTYSTATE)
      }
    } catch (error) {
      setApiError("Something went wrong. Please try again later.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsSuccess(false), 6000);
    }
  };  

  return (
    <>
      <Meta title="Corporate | Contact us" />
      <section className="my-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-semibold text-center mb-5">Contact Us</h1>
          {isSuccess && <h2 className="text-2xl text-green-600 text-center mb-4">Thanks for Contact us we will get back to you soon.</h2>}
          {apiError && (
            <p className="text-red-600 text-center mb-4">
              {apiError}
            </p>
          )}
          
          <div className="w-3xl mx-auto bg-white shadow-lg border border-blue-200 rounded-md p-5">
            <form onSubmit={formHandler} className="mb-6 space-y-4">
              <div>
                <label
                  htmlFor="input-group-0"
                  className="block mb-1 text-sm font-medium text-heading"
                >
                  Your Name<span className="ms-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="input-group-0"
                  name="name"
                  value={formData.name}
                  onBlur={validateInput}
                  onChange={handleChange}
                  className="block w-full bg-text-black-50 border border-blue-100 border-default-medium text-heading text-sm rounded-md focus:ring-blue focus:border-blue-300 px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="name@flowbite.com"
                />
                {error.name && (
                  <p className="text-red-600 mt-1 text-sm">{error.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-group-1"
                  className="block mb-1 text-sm font-medium text-heading"
                >
                  Your Email<span className="ms-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="input-group-1"
                  value={formData.email}
                  onBlur={validateInput}
                  onChange={handleChange}
                  className="block w-full bg-text-black-50 border border-blue-100 border-default-medium text-heading text-sm rounded-md focus:ring-blue focus:border-blue-300 px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="name@flowbite.com"
                />
                {error.email && (
                  <p className="text-red-600 mt-1 text-sm">{error.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-group-2"
                  className="block mb-1 text-sm font-medium text-heading"
                >
                  Subject<span className="ms-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="input-group-2"
                    name="subject"
                    value={formData.subject}
                    onBlur={validateInput}
                    onChange={handleChange}
                    className="block w-full bg-text-black-50 border border-blue-100 border-default-medium text-heading text-sm rounded-md focus:ring-blue focus:border-blue-300 px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Let us know how we can help you"
                  />
                  {error.subject && (
                    <p className="text-red-600 mt-1 text-sm">{error.subject}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-medium text-heading"
                >
                  Your message<span className="ms-1 text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onBlur={validateInput}
                  onChange={handleChange}
                  className="bg-text-black-50 border border-blue-100 border-default-medium text-heading text-sm rounded-md focus:ring-blue focus:border-blue-300 block w-full p-3.5 shadow-xs placeholder:text-body"
                  placeholder="Write your thoughts here..."
                ></textarea>
                {error.message && (
                  <p className="text-red-600 mt-1 text-sm">{error.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isFormIncomplete || hasError || isLoading}
                className={`w-full text-white bg-blue-800 box-border border border-transparent hover:bg-blue-strong focus:ring-4 focus:ring-blue-medium shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none ${
                  isFormIncomplete || hasError || isLoading
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isLoading ? 'Please wait...' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
