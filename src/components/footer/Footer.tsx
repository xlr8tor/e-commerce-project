import footer from "./Footer.module.scss";
import NavLink from "../navbar/links/Link";
import Image from "next/image";

const Footer = () => {
  const Featured = [
    "MEN",
    "WOMEN",
    "BOYS",
    "GIRLS",
    "NEW ARRIVALS",
    "SHOES",
    "CLOTHES",
  ];

  const Company = [
    "Careers",
    "Why Dziram Maxwell",
    "Partner Program",
    "Contact Sale",
    "Customer Referral Program",
  ];

  const Policies = [
    "Privacy",
    "Terms of Use",
    "Refund Policy",
    "Return Policy",
  ];

  const Socials = [
    {
      name: "facebook",
      src: "facebook-f.svg",
    },
    {
      name: "linkedin",
      src: "linkedin-in.svg",
    },
    {
      name: "instagram",
      src: "instagram.svg",
    },
    {
      name: "twitter",
      src: "twitter.svg",
    },
  ];
  return (
    <footer className={footer.wrapper}>
      <section className={footer.footer}>
        <div className={footer["footer__top"]}>
          <ul className={footer["footer__top-features-list"]}>
            <li className={footer["footer__top-features-list__item"]}>
              Featured
            </li>
            {Featured.map((feature, index) => (
              <li
                className={footer["footer__top-features-list__item"]}
                key={index}
              >
                <NavLink
                  href="/"
                  className={`${footer["footer__top-features-list__link"]} ${footer["hover-underline-animation-white"]}`}
                  title={feature}
                />
              </li>
            ))}
          </ul>

          <ul className={footer["footer__top-company-list"]}>
            <li className={footer["footer__top-company-list__item"]}>
              Company
            </li>
            {Company.map((company, index) => (
              <li
                className={footer["footer__top-company-list__item"]}
                key={index}
              >
                <NavLink
                  href="/"
                  className={`${footer["footer__top-company-list__link"]} ${footer["hover-underline-animation-white"]}`}
                  title={company}
                />
              </li>
            ))}
          </ul>

          <ul className={footer["contact-us-list"]}>
            <li className={footer["contact-us-list__item"]}>Contact Us</li>
            <li className={footer["contact-us-list__item"]}>
              <address className={footer["contact-us-list__item-address"]}>
                <span className={footer["fw-semibold"]}>Address</span> <br />
                123 Dulbey Street, Califonia, USA. <br />
              </address>
              <address className={footer["contact-us-list__item-address"]}>
                <span className={footer["fw-semibold"]}>Phone</span> <br />
                (+1) 123 45678 <br />
              </address>
              <address className={footer["contact-us-list__item-address"]}>
                <span className={footer["fw-semibold"]}> Email </span>
                <br />
                <a
                  className={footer["hover-underline-animation-white"]}
                  href="mailto:hello@dzirammaxwell.com"
                >
                  hello@dzirammaxwell.com
                </a>
                <br />
              </address>
            </li>
          </ul>
          <ul className={footer["instagram-grid"]}>
            <li className={footer["instagram-grid__item"]}>Instagram</li>
            <li className={footer["instagram-grid__item"]}>
              {[1, 2, 3, 4, 5].map((val) => (
                <img
                  key={val}
                  src={`/img/insta/${val}.jpg`}
                  alt="instagram photo"
                  className={footer["instagram-grid__item-photo"]}
                />
              ))}
            </li>
          </ul>
        </div>
        <div className={footer["footer__bottom"]}>
          <Image
            src="/img/Dziram-white.png"
            alt="logo"
            className={footer["footer__bottom-logo"]}
            width={140}
            height={140}
          />

          <p className={footer["footer__bottom-note"]}>
            Elevate your style at Dziram Maxwell – your ultimate fashion
            destination. Discover chic essentials and statement pieces, defining
            your style journey effortlessly. Fashion excellence simplified.
          </p>
          <ul className={footer["socials-list"]}>
            {Socials.map(({ name, src }) => (
              <li className={footer["socials-list__item"]} key={name}>
                <NavLink href="/" className={`${footer["socials-list__link"]}`}>
                  <Image
                    src={`/img/icons/${src}`}
                    alt={`${name} icon`}
                    className={footer["socials-list__link-img"]}
                    width={25}
                    height={25}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className={footer["policies-list"]}>
            {Policies.map((policy, index) => (
              <li className={footer["policies-list__item"]} key={index}>
                <NavLink
                  href="/"
                  className={`${footer["policies-list__link"]} ${footer["hover-underline-animation-white"]}`}
                  title={policy}
                />
              </li>
            ))}
          </ul>
          <p className={footer["rights-reserved"]}>
            Dziram Maxwell &copy; 2024. All Rights Reserved
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
