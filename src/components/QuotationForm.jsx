import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Contact from "./Contact";
import "./QuotationForm.css";

function QuotationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    guests: "",
    packageName: "",
  });

  const [quote, setQuote] = useState(null);

  const quoteRef = useRef(null);

  const packages = {
    "Chicken Firewood Briyani Package": 350,
    "Mutton Firewood Briyani Package": 450,
    "Premium Celebration Package": 550,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const guests = Number(formData.guests);
    const pricePerPerson = packages[formData.packageName];

    const subtotal = guests * pricePerPerson;

    const quotationNo =
      "DBQ-" + Date.now().toString().slice(-6);

    setQuote({
      ...formData,
      quotationNo,
      pricePerPerson,
      subtotal,
      total: subtotal,
    });
  };

  const handleWhatsApp = () => {
    if (!quote) return;

    const dhanushWhatsAppNumber = "919344496756";

    const message = `Hello Dhanush Briyani,

I would like to request a catering quotation.

Quotation No: ${quote.quotationNo}

Customer Name: ${quote.name}
Phone: ${quote.phone}

Event: ${quote.eventType}
Event Date: ${quote.eventDate}
Location: ${quote.location}
Guests: ${quote.guests}

Selected Package:
${quote.packageName}

Price Per Person: ₹${quote.pricePerPerson}

Estimated Total: ₹${quote.total.toLocaleString("en-IN")}

Please confirm availability and the final quotation.`;

    const whatsappUrl = `https://wa.me/${dhanushWhatsAppNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const downloadPDF = async () => {
    if (!quoteRef.current || !quote) return;

    const canvas = await html2canvas(quoteRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imageWidth = pdfWidth - 20;

    const imageHeight =
      (canvas.height * imageWidth) / canvas.width;

    pdf.addImage(
      imageData,
      "PNG",
      10,
      10,
      imageWidth,
      imageHeight
    );

    pdf.save(`${quote.quotationNo}-Dhanush-Briyani.pdf`);
  };

  return (
    <section className="quotation-section combined-planning" id="quotation" aria-labelledby="planning-heading">
      <span id="contact" className="planning-anchor" aria-hidden="true" />
      <div className="planning-layout">
      <div className="quotation-left">
        <p className="section-label">
          LET'S PLAN YOUR FEAST
        </p>

        <h2 id="planning-heading">
          Plan Your
          <br />
          Celebration.
        </h2>

        <p className="quotation-intro">
          Tell us about your celebration and receive an estimated catering
          quotation. Share your event details and we'll help you plan around
          your occasion, guest count and catering requirements.
        </p>
        <Contact />
      </div>

      <div className="quotation-right">
        <form
          className="quotation-form"
          onSubmit={handleSubmit}
        >
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

          <div className="form-group">
            <label htmlFor="quotation-guests">Number of Guests</label>

            <input
              type="number"
              id="quotation-guests"
              name="guests"
              placeholder="Example: 300"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quotation-packageName">Select Package</label>

            <select
              id="quotation-packageName"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              required
            >
              <option value="">
                Select package
              </option>

              <option>
                Chicken Firewood Briyani Package
              </option>

              <option>
                Mutton Firewood Briyani Package
              </option>

              <option>
                Premium Celebration Package
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="quotation-submit"
          >
            Calculate Quotation
          </button>
        </form>

        {quote && (
          <>
            <div
              className="quote-preview"
              ref={quoteRef}
            >
              <p className="quote-small">
                ESTIMATED QUOTATION
              </p>

              <div className="quote-top">
                <div>
                  <h3>Dhanush Briyani</h3>

                  <span>
                    Authentic Firewood Briyani
                  </span>
                </div>

                <strong>
                  {quote.quotationNo}
                </strong>
              </div>

              <div className="quote-details">
                <div>
                  <span>Customer</span>
                  <p>{quote.name}</p>
                </div>

                <div>
                  <span>Phone</span>
                  <p>{quote.phone}</p>
                </div>

                <div>
                  <span>Event</span>
                  <p>{quote.eventType}</p>
                </div>

                <div>
                  <span>Date</span>
                  <p>{quote.eventDate}</p>
                </div>

                <div>
                  <span>Guests</span>
                  <p>{quote.guests}</p>
                </div>

                <div>
                  <span>Location</span>
                  <p>{quote.location}</p>
                </div>

                <div>
                  <span>Package</span>
                  <p>{quote.packageName}</p>
                </div>

                <div>
                  <span>Price Per Person</span>
                  <p>₹{quote.pricePerPerson}</p>
                </div>
              </div>

              <div className="quote-calculation">
                <div>
                  <span>
                    {quote.guests} × ₹
                    {quote.pricePerPerson}
                  </span>

                  <span>
                    ₹
                    {quote.subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="quote-total">
                  <strong>
                    Estimated Total
                  </strong>

                  <strong>
                    ₹
                    {quote.total.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>

              <p className="quotation-note">
                *This is an estimated quotation.
                Final pricing and availability will
                be confirmed by Dhanush Briyani.
              </p>
            </div>

            <div className="quotation-actions">
              <button
                type="button"
                className="pdf-button"
                onClick={downloadPDF}
              >
                Download Quotation PDF
              </button>

              <button
                type="button"
                className="whatsapp-button"
                onClick={handleWhatsApp}
              >
                Send to WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </section>
  );
}

export default QuotationForm;