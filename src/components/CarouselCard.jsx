import React from "react"

const CarouselCard = ({ freelancer }) => {
  const profileImage = freelancer.images.find(image => image.isProfile)

  return (
    <div className="rounded shadow-m p-10 birds-nest">
      {profileImage && (
        <img
          className="rounded-md"
          src={profileImage.image_url}
          alt="Profile"
        />
      )}
      <h2 className="text-lg font-bold">{freelancer.username}</h2>
      <h2>
        <span aria-label="a rocket blasting off" role="img">
          ⭐
        </span>
        {freelancer.averageRating}
      </h2>

      <p className="text-gray-600">{freelancer.email}</p>
    </div>
  )
}

export default CarouselCard
