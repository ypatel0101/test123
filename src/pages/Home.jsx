import React, { useState, useContext, useEffect } from "react"
import UserCarousel from "../components/UserCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { UserContext } from "../components/UserProvider.jsx"

const Home = () => {
  const { userId, isFetching } = useContext(AuthContext)
<<<<<<< HEAD
  const { freelancers, topRatedFreelancers } = useContext(UserContext)


  if (!userId && isFetching)  {
=======
  const { user, freelancers, topRatedFreelancers } = useContext(UserContext)

  if (!userId && isFetching) {
>>>>>>> main
    return <div>Loading</div>
  }
  return (
    <div>
      <div className="text-2xl m-10">
        <h2>Signed In As: {userId?.email ?? "No One.."}</h2>
        {/* { user && // TODO: for testing, remove
          Object.entries(user).map(([key, value]) => <div>{key}: {typeof(value) === "object" ? "object" : value}</div>)
        } */}
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <UserCarousel freelancers={freelancers}/>
        </div>
        <div>
          <UserCarousel topRatedFreelancers={topRatedFreelancers}/>
        </div>
      </div>
    </div>
  )
}

export default Home
