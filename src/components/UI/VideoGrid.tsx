import { motion } from 'framer-motion'
import React from 'react'

interface GridVideo {
  title: string
  video: string
  alt: string
}

interface VideoGridProps {
  videos: GridVideo[]
}

const GridItem: React.FC<{ video: GridVideo; className?: string }> = ({ video, className = '' }) => (
  <motion.div
    className={`relative rounded-2xl overflow-hidden ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <video
      src={video.video}
      // alt={video.alt}
      className="absolute w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
      <div className="absolute bottom-4 left-4 text-white font-medium">
        <span className="uppercase text-sm tracking-wide">{video.title}</span>
      </div>
    </div>
  </motion.div>
)

export default function VideoGrid({ videos }: VideoGridProps) {
  // Dynamic class assignments based on number of videos
  const getGridClasses = (index: number, total: number) => {
    // Default classes for different layouts
    const layouts = {
      5: [
        'col-span-3 row-span-2', // Experience Wildlife
        'col-span-2 row-span-3', // Chase Adventure
        'col-span-1 row-span-3', // Find Opportunities
        'col-span-3 row-span-4', // Live Culture
        'col-span-3 row-span-3'  // Witness History
      ],
      4: [
        'col-span-3 row-span-2', // Family Vacations (top left)
        'col-span-3 row-span-2', // Business Trips (top right)
        'col-span-3 row-span-2', // Group Series (bottom left)
        'col-span-3 row-span-2'  // Private Tour (bottom right)
      ],
      3: [
        'col-span-4 row-span-2', // First image
        'col-span-2 row-span-2', // Second image
        'col-span-6 row-span-2'  // Third image
      ],
      2: [
        'col-span-3 row-span-3', // First image
        'col-span-3 row-span-3'  // Second image
      ],
      1: [
        'col-span-6 row-span-4'  // Single image
      ]
    }

    // Get the appropriate layout based on total videos
    const layoutArray = layouts[total as keyof typeof layouts] || layouts[5]
    return layoutArray[index] || 'col-span-3 row-span-2'
  }

  return (
    <div className="grid grid-cols-6 gap-4 auto-rows-[100px] w-full">
      {videos.map((video, index) => (
        <GridItem
          key={index}
          video={video}
          className={getGridClasses(index, videos.length)}
        />
      ))}
    </div>
  )
}

// Example usage:
export function ExampleUsage() {
  const videos = [
    {
      title: 'Experience Wildlife',
      video: '/videos/wildlife.mp4',
      alt: 'Wildlife experience'
    },
    {
      title: 'Chase Adventure',
      video: '/videos/adventure.mp4',
      alt: 'Hot air balloons'
    },
    {
      title: 'Find Opportunities',
      video: '/videos/opportunities.mp4',
      alt: 'Business meeting'
    },
    {
      title: 'Live Culture',
      video: '/videos/culture.mp4',
      alt: 'Cultural experience'
    },
    {
      title: 'Witness History',
      video: '/videos/history.mp4',
      alt: 'Historical monument'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-4">
      <VideoGrid videos={videos} />
    </div>
  )
}