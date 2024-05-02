import styles from "./FormWrap.module.scss";
import Image from "next/image";
import localFont from "next/font/local";

const Bodoni = localFont({
  src: "../../app/assets/fonts/Bodoni-24-Medium.ttf",
});

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={` ${styles["signup--container"]} ${styles["p-4"]}`}>
      <div className={styles["signup-wrap"]}>
        <div className={`${styles["signup--cutout"]} ${styles["p-2"]}`}>
          <div className={styles["signup--cutout__content"]}>
            <p
              className={` ${Bodoni.className} ${styles["tagline"]} ${styles["font-5xl"]} ${styles["fw-semibold"]} ${styles["pb-8"]} ${styles["pl-10"]}`}
            >
              Buy <br />
              Everything <br />
              You Want
            </p>
          </div>
        </div>
        <div className={`${styles["signup--form"]} ${styles["p-6"]}`}>
          <div className={styles["signup--form__wrap"]}>
            <Image
              src="/img/Dziram.png"
              alt="Site logo"
              height={60}
              width={101}
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrap;
