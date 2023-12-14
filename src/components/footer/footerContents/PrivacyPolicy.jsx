//import { parse } from "postcss";
import React, { useEffect } from "react";
import { useState } from "react";
import parse from "html-react-parser";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [updatedAt, setUpdatedAt] = useState();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };

    return () => {
      toTop();
    };
  }, []);

  const getPrivacyPolicy = async () => {
    setIsLoading(true)
    try {
      const result = await fetch(`${baseUrl}/users/getPrivacyPolicy`);
      const jsonData = await result.json();

      if (!result.ok) {
        setIsLoading(false)
        throw new Error(jsonData.message);
      }
      // console.log(jsonData);
      setPolicy(jsonData.posts.privacyPolicy);
      setIsLoading(false)
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = new Date(jsonData.posts.updatedAt);
      const adjDate = ` ${months[date.getMonth()]} ${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        }, ${date.getFullYear()}`;
      // console.log(adjDate);
      setUpdatedAt(adjDate);
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#444DA1] to-[#2068FF]">
        <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24">
          <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold">
            Privacy Policy
          </h2>
        </div>
      </div>

      <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">

        {
          isLoading ? <div className="flex justify-center items-center"><Loader /></div>
            :
            <div className="flex flex-col gap-3 ">
              <p className="font-medium text-lg">Last updated: {updatedAt}</p>
              <p>{parse(policy)}</p>
            </div>
        }

        {/* <div className="flex flex-col gap-3">
          <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
            Interpretation and Definations
          </h4>
          <p>
            3. The words of which the initial letter is capitalized have
            meanings defined under the following conditions.
          </p>
          <p>
            4. The following definitions shall have the same meaning regardless
            of whether they appear in singular or in plural. Definitions For the
            purposes of this Privacy Policy:
          </p>
          <p>
            5. You means the individual accessing or using the Service, or the
            Agency, or other legal entity on behalf of which such individual is
            accessing or using the Service, as applicable.
          </p>
          <p>
            6. Agency (referred to as either "the Agency", "We", "Us" or "Our"
            in this Agreement) refers to EngineerBabu IT Services Pvt. Ltd.,
            EngineerBabu, Plot no 156, Scheme no 78 - Part 2, Behind Vrindawan
            Restaurant, Infront of Prestige College, Vijay Nagar, Indore, Madhya
            Pradesh 452010.
          </p>
          <p>
            7. Affiliate means an entity that controls, is controlled by or is
            under common control with a party, where "control" means ownership
            of 50% or more of the shares, equity interest or other securities
            entitled to vote for election of directors or other managing
            authority.
          </p>
          <p>
            8. Account means a unique account created for You to access our
            Service or parts of our Service. 9. Website refers to Supersourcing,
            accessible from https://www.supersourcing.com 10. Service refers to
            the Website.
          </p>
          <p>11. Country refers to: Madhya Pradesh, India.</p>
          <p>
            12. Service Provider means any natural or legal person who processes
            the data on behalf of the Agency. It refers to third-party companies
            or individuals employed by the Agency to facilitate the Service, to
            provide the Service on behalf of the Agency, to perform services
            related to the Service or to assist the Agency in analyzing how the
            Service is used.
          </p>
          <p>
            13. Third-party Social Media Service refers to any website or any
            social network website through which a User can log in or create an
            account to use the Service.
          </p>
          <p>
            14. Personal Data is any information that relates to an identified
            or identifiable individual.
          </p>
          <p>
            15. Cookies are small files that are placed on Your computer, mobile
            device or any other device by a website, containing the details of
            Your browsing history on that website among its many uses.
          </p>
          <p>
            16. Device means any device that can access the Service such as a
            computer, a cellphone or a digital tablet.
          </p>

          <p>
            17. Usage Data refers to data collected automatically, either
            generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
            Collecting and Using Your Personal Data
          </h4>
          <h4 className="text-lg md:text-xl font-medium">
            Types of Data Collected
          </h4>
          <h4 className="text-lg md:text-xl font-medium">Personal Data</h4>
          <p>
            3. The words of which the initial letter is capitalized have
            meanings defined under the following conditions.
          </p>
          <p>
            4. The following definitions shall have the same meaning regardless
            of whether they appear in singular or in plural. Definitions For the
            purposes of this Privacy Policy:
          </p>
          <p>
            5. You means the individual accessing or using the Service, or the
            Agency, or other legal entity on behalf of which such individual is
            accessing or using the Service, as applicable.
          </p>
          <p>
            6. Agency (referred to as either "the Agency", "We", "Us" or "Our"
            in this Agreement) refers to EngineerBabu IT Services Pvt. Ltd.,
            EngineerBabu, Plot no 156, Scheme no 78 - Part 2, Behind Vrindawan
            Restaurant, Infront of Prestige College, Vijay Nagar, Indore, Madhya
            Pradesh 452010.
          </p>
          <p>
            7. Affiliate means an entity that controls, is controlled by or is
            under common control with a party, where "control" means ownership
            of 50% or more of the shares, equity interest or other securities
            entitled to vote for election of directors or other managing
            authority.
          </p>
          <p>
            8. Account means a unique account created for You to access our
            Service or parts of our Service. 9. Website refers to Supersourcing,
            accessible from https://www.supersourcing.com 10. Service refers to
            the Website.
          </p>
          <p>11. Country refers to: Madhya Pradesh, India.</p>
          <p>
            12. Service Provider means any natural or legal person who processes
            the data on behalf of the Agency. It refers to third-party companies
            or individuals employed by the Agency to facilitate the Service, to
            provide the Service on behalf of the Agency, to perform services
            related to the Service or to assist the Agency in analyzing how the
            Service is used.
          </p>
          <p>
            13. Third-party Social Media Service refers to any website or any
            social network website through which a User can log in or create an
            account to use the Service.
          </p>
          <p>
            14. Personal Data is any information that relates to an identified
            or identifiable individual.
          </p>
          <p>
            15. Cookies are small files that are placed on Your computer, mobile
            device or any other device by a website, containing the details of
            Your browsing history on that website among its many uses.
          </p>
          <p>
            16. Device means any device that can access the Service such as a
            computer, a cellphone or a digital tablet.
          </p>

          <p>
            17. Usage Data refers to data collected automatically, either
            generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </p>
        </div>*/}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
