import { useState } from "react";
import Contact from "./Contact";
import "./QuotationForm.css";

function QuotationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
  });
  const [validationMessage, setValidationMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (validationMessage) setValidationMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      ["name", "Customer Name"],
      ["phone", "Phone Number"],
      ["eventType", "Event Type"],
      ["eventDate", "Event Date"],
      ["location", "Event Location"],
    ];
    const missingField = requiredFields.find(([key]) => !formData[key].trim());

    if (missingField) {
      setValidationMessage(`${missingField[1]} is required.`);
      return;
    }

    setValidationMessage("");
    const message = `Hello Dhanush Briyani,

I would like to enquire about catering for my event.

Customer Name: ${formData.name}
Phone Number: ${formData.phone}
Event Type: ${formData.eventType}
Event Date: ${formData.eventDate}
Event Location: ${formData.location}

Please share the catering details.

Thank you.`;
    const whatsappUrl = `https://wa.me/8098878889?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="quotation-section combined-planning" id="quotation" aria-labelledby="planning-heading">
      <span id="contact" className="planning-anchor" aria-hidden="true" />
      <div className="planning-layout">
        <div className="quotation-left">
          <p className="section-label">LET'S PLAN YOUR FEAST</p>

          <h2 id="planning-heading">
            Plan Your
            <br />
            Celebration.
          </h2>

          <p className="quotation-intro">
            Tell us about your celebration and share your event details with us.
            Our team will connect with you on WhatsApp to discuss your catering
            requirements and help plan your occasion.
          </p>
          <Contact />
        </div>

        <div className="quotation-right">
          <form className="quotation-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="quotation-name">Customer Name</label>
              <input
                type="text"
                id="quotation-name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quotation-phone">Phone Number</label>
              <input
                type="tel"
                id="quotation-phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quotation-eventType">Event Type</label>
              <select
                id="quotation-eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select event</option>
                <option>Wedding</option>
                <option>Engagement</option>
                <option>Reception</option>
                <option>Birthday</option>
                <option>Family Function</option>
                <option>Corporate Event</option>
                <option>Bulk Order</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quotation-eventDate">Event Date</label>
              <input
                type="date"
                id="quotation-eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="quotation-location">Event Location</label>
              <input
                type="text"
                id="quotation-location"
                name="location"
                placeholder="Enter event location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {validationMessage && (
              <p className="form-validation-message" role="alert">
                {validationMessage}
              </p>
            )}

            <button type="submit" className="quotation-submit">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default QuotationForm;
