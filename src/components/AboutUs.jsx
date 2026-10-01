import Team from "./Team";

function AboutUs() {
  return (
    <div className="mt-5 mb-5">
      <section className="mb-12">
        <h1 className="mb-4 text-2xl font-semibold">About Us</h1>
        <p className="text-muted-foreground">
          We are a fashion e-commerce brand dedicated to bringing you a collection that blends style and comfort.
          Since our founding, we have grown into a trusted destination for modern, high-quality clothing for
          women, men and kids. Our mission is to make it easy for every customer to express their personal
          style while enjoying a seamless shopping experience.
        </p>
      </section>

      <Team />
    </div>
  );
}

export default AboutUs;
