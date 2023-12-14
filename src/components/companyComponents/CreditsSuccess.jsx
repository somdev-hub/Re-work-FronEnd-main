import React from 'react'
import Credits from './Credits';
import { useEffect } from 'react';
import { baseUrl } from '../../baseUrl';

export const CreditsSuccess = () => {

    useEffect(() => {
        let success = async () => {
            let tokenP = window.localStorage.getItem('token')

            const bodyDataC = {
                Plan_id: localStorage.getItem('Plan_id'),
                companyId: localStorage.getItem('userId'),
                paymentIntent: JSON.parse(localStorage.getItem('paymentIntentD'))
            }

            const result = await fetch(`${baseUrl}/payment/checkoutCredit`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${tokenP}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(bodyDataC),
            });

            const json = await result.json();

            if (!result.ok) {
                console.log(json.message);
                throw new Error(json.message);
            }
        }
        success()
        window.location.href = '/company/credits'
    }, [])




    return (
        <div>
            <div className="bg-gradient-to-r from-[#444DA1] to-[#2068FF]">
                <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24">
                    <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold">
                        Your Credits Added SuccessFully            </h2>
                </div>
            </div>



        </div>)
}
