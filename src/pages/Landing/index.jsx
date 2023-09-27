import Header from "@app/components/Header";
import Banner from "@app/components/Banner";
import Services from "@app/components/Services";
import Team from "@app/components/Team";
import Features from "@app/components/Features";
import Footer from "@app/components/Footer";
import Faq from "@app/components/Faq";
import CallToAction from "@app/components/CallToAction";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

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
