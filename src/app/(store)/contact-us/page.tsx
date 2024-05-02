import Image from "next/image";
import contact from "./page.module.scss";

const ContactUsPage = () => {
  return (
    <div className={contact.container}>
      <section className={contact.wrapper}>
        <section className={contact["get-in-touch"]}>
          <div className={contact["get-in-touch__head"]}>
            <div className={contact["outer-circle"]}>
              <div className={contact["inner-circle"]}></div>
            </div>
            <h3 className={contact["get-in-touch__head-title"]}>
              Get in contact with our team
            </h3>
            <p className={contact["get-in-touch__head-subtitle"]}>
              Get in touch with our sales and support teams for custom apparel,
              site navigation, or product questions.
            </p>
          </div>
          <div className={contact["get-in-touch__grid"]}>
            <div className={contact["get-in-touch__grid--item"]}>
              <div className={contact["item-icon__wrap"]}>
                <Image
                  src="/img/icons/comment-dots.svg"
                  alt="comment-dots"
                  width={25}
                  height={25}
                />
              </div>
              <p className={`${contact["title"]} ${contact["fw-semibold"]}`}>
                Chat to sales
              </p>
              <p className={contact["subtitle"]}>Speak to our friendly team.</p>
              <button
                className={`${contact["btn-hover"]} ${contact["fw-semibold"]}`}
              >
                Chat to sales
              </button>
            </div>
            <div className={contact["get-in-touch__grid--item"]}>
              <div className={contact["item-icon__wrap"]}>
                <Image
                  src="/img/icons/comment.svg"
                  alt="comments"
                  width={25}
                  height={25}
                />
              </div>
              <p className={`${contact["title"]} ${contact["fw-semibold"]}`}>
                Chat to support
              </p>
              <p className={contact["subtitle"]}>We&rsquo;re here to help.</p>
              <button
                className={`${contact["btn-hover"]} ${contact["fw-semibold"]}`}
              >
                Chat to support
              </button>
            </div>
            <div className={contact["get-in-touch__grid--item"]}>
              <div className={contact["item-icon__wrap"]}>
                <Image
                  src="/img/icons/phone.svg"
                  alt="phone"
                  width={25}
                  height={25}
                />
              </div>
              <p className={`${contact["title"]} ${contact["fw-semibold"]}`}>
                Call us
              </p>
              <p className={contact["subtitle"]}>Mon-Fri from 8am to 5pm.</p>
              <button
                className={`${contact["btn-hover"]} ${contact["fw-semibold"]}`}
              >
                Call our team
              </button>
            </div>
            <div className={contact["get-in-touch__grid--item"]}>
              <div className={contact["item-icon__wrap"]}>
                <Image
                  src="/img/icons/compass.svg"
                  alt="compass"
                  width={25}
                  height={25}
                />
              </div>
              <p className={`${contact["title"]} ${contact["fw-semibold"]}`}>
                Visit us
              </p>
              <p className={contact["subtitle"]}>Visit our office HQ.</p>
              <button
                className={`${contact["btn-hover"]} ${contact["fw-semibold"]}`}
              >
                Get directions
              </button>
            </div>
          </div>
          <div className={contact["message-us"]}>
            <h3 className={contact["message-us__title"]}>Message us</h3>
            <p className={contact["message-us__subtitle"]}>
              We&rsquo;ll get back to you within 24 hours.
            </p>
            <form action="" className={contact["form"]}>
              <div className={contact["form-control-group"]}>
                <div
                  className={`${contact["form-control"]} ${contact["mt-4"]}`}
                >
                  <label htmlFor="first_name">First Name</label>
                  <input
                    className={contact["mt-1"]}
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div
                  className={`${contact["form-control"]} ${contact["mt-4"]}`}
                >
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    className={contact["mt-1"]}
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
              <div className={`${contact["form-control"]} ${contact["mt-4"]}`}>
                <label htmlFor="email">Email</label>
                <input
                  className={contact["mt-1"]}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={`${contact["form-control"]} ${contact["mt-4"]}`}>
                <label htmlFor="number">Phone Number</label>
                <input
                  className={contact["mt-1"]}
                  id="number"
                  name="number"
                  type="text"
                  placeholder="Enter your phone number"
                  required
                />
                <div
                  className={`${contact["form-control"]} ${contact["mt-4"]}`}
                >
                  <label htmlFor="message">Message</label>
                  <textarea
                    className={contact["mt-1"]}
                    name="message"
                    id="message"
                    cols={30}
                    rows={10}
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
              </div>
              <button
                className={`${contact["btn-default"]} ${contact["btn-default-hover"]} ${contact["fw-semibold"]} ${contact["active"]} ${contact["mt-6"]}`}
                type="submit"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ContactUsPage;
