import { useId } from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/images/about-banner-briyani.png";
import "../pages/About.css";
import "./InnerPageHero.css";

export default function InnerPageHero({ title, breadcrumbLabel = title }) {
  const headingId = useId();
  return (
    <header className="about-page-banner" aria-labelledby={headingId} style={{ backgroundImage: `url(${bannerImage})` }}>
      <h1 id={headingId}>{title}</h1>
      <nav className="about-page-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{breadcrumbLabel}</span>
      </nav>
    </header>
  );
}
