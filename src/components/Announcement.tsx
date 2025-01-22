import React from 'react'

const Announcement = () => {
  return (
    <div className="bg-white p-4 rounded-md">
        {/* Title */}
        <div className="flex justify-between items-center">
            <h1 className='text-xl font-semibold'>Announcement </h1>
            <span className='text-xs  text-gray-400'>View all</span>
        </div>   
        <div className="flex flex-col gap-4  mt-4">
          <div className="bg-SkyLight p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Lorem ipsum dolor sit.</h1>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">01-01-2025</span>
            </div>
            <p className='text-sm text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, maxime.</p>
          </div>
          <div className="bg-PurpleLight p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Lorem ipsum dolor sit.</h1>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">01-01-2025</span>
            </div>
            <p className='text-sm text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, maxime.</p>
          </div>
          <div className="bg-YellowLight p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">Lorem ipsum dolor sit.</h1>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">01-01-2025</span>
            </div>
            <p className='text-sm text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, maxime.</p>
          </div>

          </div>   
    </div>
  )
}

export default Announcement