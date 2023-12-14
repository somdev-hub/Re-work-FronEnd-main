import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import parse from "html-react-parser";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";

const SupportPage
  = () => {
    const [termsAndConditions, setTermsAndConditions] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      const toTop = () => {
        window.scrollTo(0, 0);
      };

      return () => {
        toTop();
      };
    }, []);

    const getTermsandConditions = async () => {
      setIsLoading(true)
      try {
        const result = await fetch(`${baseUrl}/users/getTermsAndConditions`);
        const jsonData = await result.json();

        if (!result.ok) {
          setIsLoading(false)
          throw new Error(jsonData.message);
        }
        setTermsAndConditions(jsonData.posts.termsAndConditions);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

    useEffect(() => {
      getTermsandConditions();
    }, []);

    return (
      <div>
        <div className="bg-gradient-to-r from-[#444DA1] to-[#2068FF]">
          <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24">
            <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold">
              Support Page

            </h2>
          </div>
        </div>

        <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">
          {/* {
          isLoading ? <div className="flex justify-center items-center"><Loader /></div>
            :
            <div className="flex flex-col gap-3">
              <p>{parse(termsAndConditions)}</p>
            </div>
        } */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
              General Disclaimers
            </h4>
            <p>
              The following terms and conditions are deemed to have been accepted
              by the User on usage of the website www.randstad.in. The terms "You"
              and "User" refer to all individuals and/or entities accessing this
              site for any reason
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
              No Warrenties
            </h4>
            <p>
              The following terms and conditions are deemed to have been accepted
              by the User on usage of the website www.randstad.in. The terms "You"
              and "User" refer to all individuals and/or entities accessing this
              site for any reason
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
              Indemnties
            </h4>
            <p>
              The following terms and conditions are deemed to have been accepted
              by the User on usage of the website www.randstad.in. The terms "You"
              and "User" refer to all individuals and/or entities accessing this
              site for any reason
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
              No Liability
            </h4>
            <p>
              The following terms and conditions are deemed to have been accepted
              by the User on usage of the website www.randstad.in. The terms "You"
              and "User" refer to all individuals and/or entities accessing this
              site for any reason
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
              Intellectual Property Rights
            </h4>
            <p>
              The following terms and conditions are deemed to have been accepted
              by the User on usage of the website www.randstad.in. The terms "You"
              and "User" refer to all individuals and/or entities accessing this
              site for any reason
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-lg md:text-2xl font-medium text-[color:var(--blue)]">
              Other Terms and Conditions
            </h4>
            <p>
              By using this web site you are indicating your acceptance to abide
              by the Terms and Conditions which can be updated or modified at any
              time by www.randstad.in.. www.randstad.in. do not disclose any
              personal information unless specifically requested by the user or
              required to do so by the law or in good faith that such disclosure
              is reasonably necessary to: (a) Comply with legal processes (b)
              Enforce the Terms and Conditions (c) Respond to claims that any
              content violates the rights of third parties or (d) Protect the
              rights, property or personal safety of www.randstad.in., its users
              and the public.
            </p>
            <p>
              hrough this website you may be re - directed to other sites for
              various purposes and links. www.randstad.in. shall not be liable for
              any of such sites and their related links. www.randstad.in. shall
              not be liable if any such links shall directly or indirectly lead to
              any slander, prohibited sites or obscene sites. This site and the
              intended activities are for the promotion and welfare of the society
              and does not contribute to any other unauthorized activities.
            </p>
            <p>The website and its users are subject to Chennai jurisdiction</p>
            <p>
              Registered Office At: 10XTO Internet Limited WeWork Forum, DLF Cyber
              City, DLF Phase- 03, Gurugram, Haryana-122002
            </p>
          </div>
        </div>
      </div>
    );
  };

export default SupportPage
  ;
