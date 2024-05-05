"use client";
import Image from "next/image";
import "../globals.css";
import home from "./page.module.scss";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
};

export const revalidate = 0;

export default function Home() {
  const router = useRouter();
  type ShopWithUs = {
    src: string;
    heading: string;
    body: string;
    alt: string;
  };

  type Exclusives = {
    src: string;
    alt: string;
    price: string;
    discount: string;
    title: string;
    desc: string;
  };

  const shopWithUs: ShopWithUs[] = [
    {
      src: "face-smile2.svg",
      heading: "Exquisite Collections for Every Taste",
      body: "Each piece is a testament to timeless elegance and contemporary trends. ensuring your wardrobe is a reflection of your discerning taste.",
      alt: "Smiley face",
    },
    {
      src: "shirt.svg",
      heading: "Made with superior materials",
      body: "Our garments are more than just fashion; they are a manifestation of uncompromising quality to elevate your every moment.",
      alt: "shirt icon",
    },
    {
      src: "truck.svg",
      heading: "Swift and Dependable Shipping",
      body: "Experience the sensation of arriving on time. Our efficient delivery system ensures your latest fashion items arrive right at your doorstep.",
      alt: "truck icon",
    },
    {
      src: "credit-card.svg",
      heading: "Intuitively Interface for Effortless Shopping",
      body: "Experience the sensation of arriving on time. Our efficient delivery system ensures your latest fashion items arrive right at your doorstep.",
      alt: "Credit card icon",
    },
  ];

  const Exclusives: Exclusives[] = [
    {
      src: "hijabi.jpg",
      alt: "hijabi woman",
      title: "Hijab styled woman trend",
      desc: "Cotton combat 30s long-sleeve high quality premium materials",
      price: "36.50",
      discount: "40",
    },
    {
      src: "simple-man.jpg",
      alt: "Asian man in turtleneck",
      title: "Simple fashion man",
      desc: "Cotton combat 30s long-sleeve high quality premium materials",
      price: "44.99",
      discount: "60",
    },
    {
      src: "long-sleeve.jpg",
      alt: "Woman in long sleeve sweatshirt",
      title: "Long-sleeved sweatshirt",
      desc: "Cotton combat 30s long-sleeve high quality premium materials",
      price: "40.50",
      discount: "40",
    },
  ];

  return (
    <main className={home.container}>
      <div className={home.wrapper}>
        <section className={home.jumbotron}>
          <div className={home.overlay}></div>
          <div className={home["jumbotron-title__wrap"]}>
            <h1 className={home["jumbotron-title"]}>
              Discover
              <br />
              <span className={home["title-accent"]}>our curated </span>
              <br />
              Collection Style
            </h1>
          </div>
          <div className={home["cta-section"]}>
            <p className={home["cta-tagline"]}>
              Drive into the latest fashion trends that redefine elegance and
              comfort.
            </p>
            <div className={home["cta-btn-group"]}>
              <button
                onClick={() => router.push("/shop")}
                className={`${home["btn-default"]} ${home["btn-default-hover"]} ${home["active"]} ${home["fw-semibold"]} ${home["w-full"]}`}
              >
                Discover
              </button>
              <button
                className={`${home["btn-default"]} ${home["btn-default-hover"]} ${home["fw-semibold"]} ${home["w-full"]}`}
              >
                Get Vouchers
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className={home.wrapper}>
        <section className={home["collections-grid"]}>
          <article className={home["grid-col-span-2"]}>
            <div className={home["collection-text__wrapper"]}>
              <p className={home["collection-text"]}>
                World fashion is an ever-evolving and dynamic industry that
                reflects the diverse cultural, social, and artistic expressions
                from around the globe.
              </p>
              <button
                onClick={() => router.push("/shop")}
                className={`${home["btn-default"]} ${home["btn-default-hover"]} ${home["fw-semibold"]} ${home["active"]} ${home["mt-2"]}`}
              >
                Shop Now
              </button>
            </div>
          </article>

          <article className={`${home["collection"]} ${home["women"]}`}>
            <div className={home["frosted-glass__section"]}>
              <p
                className={`${home["collection-title"]} ${home["fw-semibold"]}`}
              >
                Women&rsquo;s <br />
                Collections
              </p>
              <a className={home["hover-underline-animation-white"]} href="#">
                View more
              </a>
            </div>
          </article>

          <article
            className={`${home["collection"]} ${home["grid-row-span-2"]} ${home.men}`}
          >
            <div className={home["frosted-glass__section"]}>
              <p
                className={`${home["collection-title"]} ${home["fw-semibold"]}`}
              >
                Men&rsquo;s <br />
                Collections
              </p>
              <a className={home["hover-underline-animation-white"]} href="#">
                View more
              </a>
            </div>
          </article>
          <article className={`${home["collection"]} ${home["all-gender"]}`}>
            <div className={home["frosted-glass__section"]}>
              <p
                className={`${home["collection-title"]} ${home["fw-semibold"]}`}
              >
                All Gender <br />
                Collection
              </p>
              <a className={home["hover-underline-animation-white"]} href="#">
                View more
              </a>
            </div>
          </article>
          <article
            className={`${home["collection"]} ${home["collection__new"]}`}
          >
            <div className={home["collection-content__wrapper"]}>
              <div>
                <p className={home["collection-discount"]}>20% off</p>
                <p className={home["collection-discount__season"]}>
                  For this eid season holiday
                </p>
              </div>
              <button
                onClick={() => router.push("/shop")}
                className={`${home["new-collection"]} ${home["btn-default-hover"]} ${home["fw-semibold"]} ${home["btn-hover"]}`}
              >
                New Collection
              </button>
            </div>
          </article>
        </section>
      </div>
      <section className={home.wrapper}>
        <div className={home["exclusive-deals"]}>
          <section className={home["exclusive-deals-header"]}>
            <h3 className={home["exclusive-deals-header__title"]}>
              Exclusive Holiday Deals
            </h3>
            <p>
              Shop exclusive holiday deals at Dziram Maxwell. Elevate your style
              with chic winter essentials and glamorous party outfits. Enjoy
              discounts on premium materials. Stand out and shine brighter this
              season. Shop now!
            </p>
            <button
              className={`${home["btn-default"]} ${home["btn-default-hover"]} ${home["active"]} ${home["fw-semibold"]}`}
            >
              See More
            </button>
          </section>
          <section className={home["exclusive-deals-grid"]}>
            {Exclusives.map(({ src, alt, discount, title, desc, price }) => (
              <article className={home["exclusive-deals-grid__item"]} key={src}>
                <div className={home["overflow-control"]}>
                  <div id={home["burst-8"]}>
                    <p className={`${home["disc"]} ${home["fw-semibold"]}`}>
                      Disc
                    </p>
                    <p className={`${home["percent"]} ${home["fw-semibold"]}`}>
                      {discount}%
                    </p>
                  </div>
                  <Image
                    src={`/img/home/${src}`}
                    alt={alt}
                    className={home["exclusive-deals-grid__item--img"]}
                    fill
                  />
                </div>

                <div className={home["exclusive-deals-grid__item--content"]}>
                  <h3 className={home["exclusive-deals-grid__item--title"]}>
                    {title}
                  </h3>
                  <p className={home["exclusive-deals-grid__item--desc"]}>
                    {desc}
                  </p>
                  <div className={home["exclusive-deals-grid__prices"]}>
                    <div className={home["price-group"]}>
                      <p className={`${home["price"]} ${home["fw-semibold"]}`}>
                        ${price}
                      </p>
                      <p
                        className={`${home["discount-price"]} ${home["strike"]}`}
                      >
                        $36.50
                      </p>
                    </div>

                    <button
                      className={`${home["btn-hover"]} ${home["fw-semibold"]}`}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
      <section className={home.wrapper}>
        <div className={home["shop-with-us"]}>
          <div className={home["shop-with-us-head"]}>
            <div className={home["shop-with-us__img-wrap"]}>
              <Image
                src="/img/home/model.jpg"
                alt="Male model in van"
                className={home["shop-with-us__img"]}
                fill
              />
            </div>
            <div className={home["shop-with-us__text"]}>
              <h3
                className={`${home["shop-with-us__text-title"]} ${home["fw-bold"]}`}
              >
                Why should you shop at our store immediately?
              </h3>
              <p className={home["shop-with-us__text-body"]}>
                Each piece is a celebration of timeless elegance and
                contemporary trends, ensuring your wardrobe is a canvas of
                refined taste. Elevate your style with pieces that speak to the
                connoisseur in you.
              </p>
            </div>
          </div>
          <div className={home["shop-with-us-grid"]}>
            {shopWithUs.map(({ src, heading, body, alt }) => (
              <div className={home["shop-with-us-grid__item"]} key={src}>
                <div className={home["shop-with-us-grid__item-img_wrap"]}>
                  <Image
                    src={`/img/icons/${src}`}
                    alt={alt}
                    className={home["shop-with-us-grid__item-img"]}
                    width={25}
                    height={25}
                  />
                </div>
                <h3
                  className={`${home["shop-with-us-grid__item-heading"]} ${home["fw-medium"]}`}
                >
                  {heading}
                </h3>
                <p className={home["shop-with-us-grid__item-body"]}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={home.wrapper}>
        <div className={home.testimonials}>
          <h2 className={`${home["testimonials-title"]} ${home["fw-bold"]}`}>
            Words from Our Happy Customers
          </h2>
          <p className={home["testimonials-body"]}>
            &quot;Fashion is a form of expression, and Luxe truly understands
            that. Their pieces speak volumes, and I always find something that
            resonates with my style. The quality is exceptional, and I
            appreciate the brand&quot;s commitment to staying on- trend.&quot;
          </p>
          <div className={home["navigation"]}>
            <button className={home["btn-arrow"]}>
              <Image
                src="./img/icons/arrow-left-long.svg"
                alt="right arrow"
                className={home["icon"]}
                width={64}
                height={64}
              />
            </button>
            <div className={home["user-info"]}>
              <Image
                src="/img/home/profile-pic.jpg"
                alt="customers picture"
                className={home["user-img"]}
                width={60}
                height={60}
              />
              <div className={home["username__wrap"]}>
                <p className={`${home["username"]} ${home["fw-semibold"]}`}>
                  Japheth Ariyibi
                </p>
                <p className={home["user-location"]}>Port-harcourt</p>
              </div>
            </div>
            <button className={home["btn-arrow"]}>
              <Image
                src="/img/icons/arrow-right-long.svg"
                alt="right arrow"
                className={home["icon"]}
                width={64}
                height={64}
              />
            </button>
          </div>
        </div>
      </section>

      <section className={home.wrapper}>
        <div className={`${home["management-quote__wrapper"]}`}>
          <div className={`${home["management-quote__img"]}`}></div>
          <div className={`${home["management-quote__content"]}`}>
            <Image
              src="./img/icons/quote-right.svg"
              alt="quotation mark"
              className={`${home["quotation-mark"]}`}
              width={128}
              height={147}
            />
            <p className={`${home["management-quote__text"]}`}>
              &quot;Fashion is about dressing according to what&quot;s
              fashionable. Style is more about being yourself.&quot;
            </p>

            <div className={`${home["management-info"]}`}>
              <p
                className={`${home["management-name"]} ${home["fw-semibold"]}`}
              >
                Jeremiah Charles
              </p>
              <p
                className={`${home["management-position"]} ${home["fw-light"]}`}
              >
                CEO of <span>Dziram Maxwell</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
