import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyNotifications from './CompanyNotifications';
import { GrFormNext } from "react-icons/gr";
import { useEffect } from 'react';
import { baseUrl } from '../../baseUrl';
import moment from 'moment'
import Loader from '../../hook/Loader';



const CompanyCreditsHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const companyId = localStorage.getItem("userId");
  let token = localStorage.getItem('token')
  const getData = async () => {
    try {
      const result = await fetch(`${baseUrl}/company/getPaymentHistoryByCompanyId/${companyId}`, {
        headers: {
          "Authorization":`Bearer ${token}`
        }
      });
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }

      setPayments(jsonData.posts);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {
        isLoading ? <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>

          :
          <>
            {/* navbar */}

            <div className="border-b-2 border-black mb-4">
              <div className="flex items-center justify-between gap-5">
                <nav
                  aria-label="breadcrumb"
                  className="w-full md:p-4 text-[color:var(--blue)] font-semibold "
                >
                  <ol className="flex h-8 md:space-x-2">
                    <li className="flex items-center">
                      <Link
                        to={"/company"}
                        title="Back to homepage"
                        className="hover:underline md:text-xl"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="flex items-center md:space-x-2">
                      <GrFormNext></GrFormNext>
                      <Link
                        to="/company/credits"
                        className="flex items-center px-1 capitalize hover:underline md:text-xl"
                      >
                        Credits
                      </Link>
                    </li>
                    <li className="flex items-center md:space-x-2">
                      <GrFormNext></GrFormNext>
                      <Link className="flex items-center px-1 capitalize md:text-xl">
                        History
                      </Link>
                    </li>
                  </ol>
                </nav>

                <div>
                  <CompanyNotifications />
                </div>
              </div>
            </div>

            {/* secon part  */}
            <div>
              <h2 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
                Credit History
              </h2>
            </div>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead class=" bg-primary font-semibold border-b text-center text-gray-900">
                        <tr>
                          <th class="px-6 py-4  ">Purchase ID</th>
                          <th class="px-6 py-4  ">Date</th>
                          <th class="px-6 py-4  ">Plan Used</th>
                          <th class="px-6 py-4  ">Amount</th>
                          <th class="px-6 py-4  ">Credit received</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => {

                          return <tr key={payment._id} className="whitespace-nowrap text-center border-b ">
                            <td class=" py-4 text-md  whitespace-pre-wrap text-sm font-medium text-gray-900">
                              {payment._id}
                            </td>
                            <td class="py-4 text-md  whitespace-pre-wrap text-sm font-medium text-gray-900">
                              {moment(payment.updatedAt).format('DD/MM/YYYY')}
                            </td>
                            <td class="py-4 text-md  whitespace-pre-wrap text-sm font-medium text-gray-900 ">
                              {payment.planName}
                            </td>
                            <td class="py-4 text-md  whitespace-pre-wrap text-sm font-medium text-gray-900  text-md ">
                              ₹ {payment.amount}
                            </td>
                            <td class="py-4 text-md  whitespace-pre-wrap text-sm font-medium text-gray-900 ">
                              {payment.credites}
                            </td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </div >
  );
};

export default CompanyCreditsHistory;