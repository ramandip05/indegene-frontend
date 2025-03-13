'use client';
import JobListing from "./job-listing/page";

export default function Home() {
  return (
    <div className="w-full min-h-screen">

       {/* <Provider store={store}></Provider> */}
      <JobListing />
    </div>
  );
}
