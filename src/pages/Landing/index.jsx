import Header from "@app/components/Header";
import Banner from "@app/components/Banner";
import Services from "@app/components/Services";
import Team from "@app/components/Team";
import Features from "@app/components/Features";
import Footer from "@app/components/Footer";
import Faq from "@app/components/Faq";
import CallToAction from "@app/components/CallToAction";

const Landing = () => {
  return (
    <>
      <Header />
      <Banner />
      <Features />
      <Services />
      <Faq />
      <Team />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Landing;
