'use client'; // Mark this file as a client component

import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component
import Footer from '@/Components/Footer'; // Ensure this is the correct path
import Link from 'next/link';

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = () => {
    for (let i = 0; i < blog_data.length; i++) {
      // Ensure params.id is converted to a number before comparison
      if (Number(params.id) === blog_data[i].id) {
        setData(blog_data[i]);
        console.log(blog_data[i]); // Debugging log
        break;
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [params.id]); // Include params.id in the dependency array

  return (
    <>
      {data ? (
        <>
          <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              {/* Render logo */}
              <Link href='/'>
              <Image
                src={assets.logo}
                width={180}
                height={50}
                alt="Logo"
                className="w-[130px] sm:auto"
              />
              </Link>

              {/* Button */}
              <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                Get started
                <Image src={assets.arrow} alt="Arrow Icon" width={16} height={16} />
              </button>
            </div>

            {/* Content Section */}
            <div className="text-center my-24">
              <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
                {data.title}
              </h1>

              {/* Author Details */}
              {data.author_img && (
                <Image
                  className="mx-auto mt-6 border border-white rounded-full"
                  src={data.author_img}
                  width={60}
                  height={60}
                  alt={`${data.author}'s Profile`}
                />
              )}
              <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
            </div>
          </div>

          {/* Blog Image Section */}
          <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            {data.image && (
              <>
                <Image
                  className="rounded-lg border-4 border-white"
                  src={data.image}
                  width={1280}
                  height={720}
                  alt="Blog Content"
                />
                <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
                <p>{data.description}</p>

                {/* Steps */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <h3 className="my-5 text-[18px] font-semibold">
                      Step {index + 1}: Self-Reflection
                    </h3>
                    <p className="my-3">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                    <p className="my-3">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                  </div>
                ))}

                {/* Conclusion */}
                <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
                <p className="my-3">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                </p>

                {/* Social Media Section */}
                <div className="my-24">
                  <p className="text-black font-semibold my-4">Share this article on social media</p>
                  <div className="flex gap-4">
                    <Image src={assets.facebook_icon} width={50} height={50} alt="Facebook" />
                    <Image src={assets.twitter_icon} width={50} height={50} alt="Twitter" />
                    <Image src={assets.googleplus_icon} width={50} height={50} alt="Google Plus" />
                  </div>
                </div>
              </>
            )}
          </div>
          <Footer /> {/* Ensure Footer is placed outside the conditional content */}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-lg font-medium">Loading...</p>
          <Footer /> {/* Ensure Footer is included here */}
        </div>
      )}
    </>
  );
};

export default Page;
