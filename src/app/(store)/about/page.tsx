import about from "@/app/(store)/about/page.module.scss";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "About",
};

const AboutPage = () => {
  const Records: { title: string; subTitle: string }[] = [
    {
      title: "15",
      subTitle: "Years in Establishment",
    },
    {
      title: "23",
      subTitle: "Vogue Appearances",
    },
    {
      title: "1300+",
      subTitle: "Positive Reviews",
    },
    {
      title: "100k",
      subTitle: "Trusted Shoppers",
    },
  ];

  const Cards: { src: string; name: string; position: string }[] = [
    {
      src: "model-1.jpg",
      name: "Joseph Smith",
      position: "Lead Designer",
    },
    {
      src: "model-3.jpg",
      name: "Sandy Cho",
      position: "Lead Stylist",
    },
    {
      src: "model-2.jpg",
      name: "Henry Collin",
      position: "Photographer",
    },
    {
      src: "model-4.jpg",
      name: "Joline Cork",
      position: "Markup Artist",
    },
    {
      src: "model-7.jpg",
      name: "Hadeesa Abdul",
      position: "Shoot Coordinator",
    },
    {
      src: "model-5.jpg",
      name: "Naomi Rachael",
      position: "Lead Textiles",
    },
  ];

  return (
    <div>
      <section className={about.wrapper}>
        <section className={about["how-it-started"]}>
          <div className={about["col-1"]}>
            <p className="how-it-started__tag fw-semibold">How It Started</p>
            <h3 className={about["how-it-started__title"]}>
              Our Dream is Accessible Fashion
            </h3>
            <p className={about["how-it-started__body"]}>
              Dziram Maxwell was founded by Jeremiah Charles, a dedicated
              lifelong fashion enthusiast, and a visionary in the world of
              style. His dream was to establish a digital hub of fashion
              knowledge accessible to all. Insipred by his belief in the
              transformative power of fashion, he embarked on a journey to build
              &quot;Dziram Maxwell.&quot; With unwavering dedication, they
              assembled a team of experts and launched this innovative platform,
              creating a global community of passionate fashion enthusiasts, all
              connected by the desire to explore, express, and elevate their
              style.
            </p>
          </div>
          <div className={about["col-2"]}>
            <div className={about["col-2__img-wrap"]}>
              <img
                src="/img/about/office.jpg"
                alt="Office Interior"
                className={about["col-2__img"]}
              />
            </div>
            <div className={about["col-2__text-grid"]}>
              {Records.map(({ title, subTitle }, index) => (
                <div className={about["col-2__text"]} key={index}>
                  <h3
                    className={`${about["col-2__text-title"]} ${about["fw-semibold"]}`}
                  >
                    {title}
                  </h3>
                  <p className={about["col-2__text-subtitle"]}>{subTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className={about.wrapper}>
        <section className={about.company}>
          <div className={`${about["company-values"]} ${about["vision"]}`}>
            <p
              className={`${about["company-values__tag"]} ${about["fw-semibold"]}`}
            >
              Our Vision
            </p>
            <h3 className={about["company-values__title"]}>Empowering Style</h3>
            <p className={about["company-values__body"]}>
              Through Fashion Our unwavering vision is to empower lives through
              accessible, high-quality fashion. By fostering a global community
              of fashion enthusiasts, we aim to inspire personal style, drive
              innovation in clothing choices, and shape a trendsetting future
              for all.
            </p>
          </div>
          <div className={`${about["company-values"]} ${about["mission"]}`}>
            <p
              className={`${about["company-values__tag"]} ${about["fw-semibold"]}`}
            >
              Our Mission
            </p>
            <h3 className={about["company-values__title"]}>Fashion for All</h3>
            <p className={about["company-values__body"]}>
              Everywhere Our unwavering mission is to provide everyone with
              access to stylish, high-quality clothing. By fostering a global
              community of fashion lovers, we aim to make trendy and quality
              fashion accessible to all, inspiring confidence, innovation, and a
              stylish future for everyone.
            </p>
          </div>
        </section>
      </section>
      <section className={about.wrapper}>
        <section className={about.team}>
          <p
            className={`${about["team-section__tag"]} ${about["fw-semibold"]}`}
          >
            Meet the Team
          </p>
          <h3 className={about["team-section__title"]}>
            Meet Our Dedicated Team of Designers and Stylists
          </h3>
          <section className={about["team-section__grid"]}>
            {Cards.map(({ src, name, position }) => (
              <div className={about["team-member__card"]} key={src}>
                <div className={about["overlay"]}></div>
                <img
                  src={`/img/about/${src}`}
                  alt="Team member picture"
                  className={about["team-member__img"]}
                  loading="lazy"
                />
                <div className={about["team-member-profile"]}>
                  <div className={about["team-member-profile__text"]}>
                    <p
                      className={`${about["team-member-name"]} ${about["fw-semibold"]}`}
                    >
                      {name}
                    </p>
                    <p className={about["team-member-position"]}>{position}</p>
                  </div>
                  <div className={about["linkedIn__wrap"]}>
                    <Image
                      className={about["linkedin-logo"]}
                      src="/img/icons/linkedin-in.svg"
                      alt="linkedIn logo"
                      height={20}
                      width={20}
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
      </section>
    </div>
  );
};

export default AboutPage;
