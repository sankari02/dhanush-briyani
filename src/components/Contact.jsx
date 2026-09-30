function Contact() {
  return (
    <>
      <div className="planning-contact-info">
        <div>
          <span>PHONE / WHATSAPP</span>
          <a href="tel:+918098878889">+91 80988 78889</a>
        </div>

        <div>
          <span>INSTAGRAM</span>

          <a
            href="https://www.instagram.com/dhanush_.briyani/"
            target="_blank"
            rel="noreferrer"
          >
            @dhanush_.briyani
          </a>
        </div>

        <div>
          <span>SPECIALITY</span>
          <p>Authentic Firewood Briyani & Catering</p>
        </div>
      </div>
      <a href="https://wa.me/918098878889" target="_blank" rel="noreferrer" className="planning-whatsapp">
        WhatsApp Us <span aria-hidden="true">&rarr;</span>
      </a>
    </>
  );
}

export default Contact;
