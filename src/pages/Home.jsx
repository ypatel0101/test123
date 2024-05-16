import React, { useState, useContext, useEffect } from "react"
import FreeLancerCarousel from "../components/FreeLancerCarousel.jsx"
import TopRevieweCarousel from "../components/TopRevieweCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"
import Fetcher from "../fetcher.js"

const Home = () => {
  const [freelancers, setFreelancers] = useState([])
  const [topRatedFreelancers, setTopRatedFreelancers] = useState([])
  const { userId, isFetching, handleLogout } = useContext(AuthContext)
  const fetcher = new Fetcher("api")

  useEffect(() => {
    fetcher.route("/users/freelancers").get(data => {
      const updatedFreelancers = data.map(freelancer => {
        const totalStars = freelancer.reviews_received.reduce(
          (acc, review) => acc + review.star_review,
          0
        )
        const averageRating =
          freelancer.reviews_received.length > 0
            ? totalStars / freelancer.reviews_received.length
            : 0
        return { ...freelancer, averageRating }
      })
      setFreelancers(updatedFreelancers)
    })
  }, [])

  useEffect(() => {
    const sortedFreelancers = [...freelancers].sort(
      (a, b) => b.averageRating - a.averageRating
    )
    const topRatedFreelancers = sortedFreelancers.slice(0, 10)
    setTopRatedFreelancers(topRatedFreelancers)
  }, [freelancers])

  if (!userId && isFetching) {
    return <div>Loading</div>
  }
  console.log(topRatedFreelancers)
  return (
    <div>
      <div>
        <h1>Homepage</h1>
        <h2>Signed In As: {userId ? userId : "No One"}</h2>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <FreeLancerCarousel freelancers={freelancers} />
        </div>
        <div>
          <FreeLancerCarousel topRatedFreelancers={topRatedFreelancers} />
        </div>
      </div>
    </div>
  )
}

export default Home
