import { Link } from "react-router-dom";
const menuCategories = [
  {
    title: "Briyani",
    items: [
      "Chicken Firewood Briyani",
      "Mutton Firewood Briyani",
      "Special Family Briyani",
    ],
  },
  {
    title: "Starters",
    items: [
      "Chicken 65",
      "Pepper Chicken",
      "Crispy Chicken",
    ],
  },
  {
    title: "Main Course",
    items: [
      "Chicken Gravy",
      "Mutton Gravy",
      "Vegetable Kurma",
    ],
  },
  {
    title: "Gravies",
    items: [
      "Brinjal Dalcha",
      "Chicken Salna",
      "Mutton Salna",
    ],
  },
  {
    title: "Desserts",
    items: [
      "Bread Halwa",
      "Gulab Jamun",
      "Traditional Sweet",
    ],
  },
  {
    title: "Beverages",
    items: [
      "Fresh Juice",
      "Buttermilk",
      "Soft Drinks",
    ],
  },
];

function Menu() {
  return (
    <section className="menu-section" id="menu">
      <div className="menu-header">
        <p className="section-label">OUR MENU</p>

        <h2>
          Crafted For
          <br />
          Every Feast.
        </h2>

        <p>
          Build a menu that suits your celebration. From our signature
          firewood briyani to starters, gravies, desserts, and beverages,
          every selection can be planned around your event.
        </p>
      </div>

      <div className="menu-grid">
        {menuCategories.map((category, index) => (
          <article className="menu-category" key={category.title}>
            <div className="menu-category-top">
              <span>0{index + 1}</span>
              <h3>{category.title}</h3>
            </div>

            <div className="menu-items">
              {category.items.map((item) => (
                <div className="menu-item" key={item}>
                  <p>{item}</p>
                  <span>+</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="menu-bottom">
        <p>
          Need a customised menu for your event?
        </p>

        <Link to="/contact#quotation">
          Build Your Quotation
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default Menu;