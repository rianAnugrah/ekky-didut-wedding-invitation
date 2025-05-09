"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Music, Coffee, Utensils, Church } from "lucide-react";
import Image from "next/image";
import { Guest } from "@/app/guests/actions";

export default function TimeLine({ guest }: { guest: Guest }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "The Holy Matrimony",
      time: "08:00 - 11:00",
      location: "St. Stefanus Church, Cilandak",
      address:
        "Jl. KH Muhasim Raya No.2, RT.12/RW.6, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan",
      mapUrl: "https://maps.app.goo.gl/MQr8Jcnh7M9MmDE58",
      icon: <Church className="h-6 w-6" />,
      color: "bg-amber-900 text-white",
      borderColor: "border-amber-600",
      fieldKey: "GEREJA",
    },
    {
      id: 2,
      title: "Tea Pai",
      time: "12:00 - 15:00",
      location: "Onni Garden House",
      address: "Jl. Lebak Bulus I No.9, Lb. Bulus, Kec. Cilandak, Jakarta",
      mapUrl: "https://maps.app.goo.gl/Ab99Kd87YoxzMK8z9",
      icon: <Coffee className="h-6 w-6" />,
      color: "bg-amber-900 text-white",
      borderColor: "border-amber-600",
      fieldKey: "TEA PAI",
    },
    {
      id: 3,
      title: "Soirée",
      time: "16:30 - 18:00",
      location: "Onni Garden House",
      address: "Jl. Lebak Bulus I No.9, Lb. Bulus, Kec. Cilandak, Jakarta",
      mapUrl: "https://maps.app.goo.gl/Ab99Kd87YoxzMK8z9",
      icon: <Utensils className="h-6 w-6" />,
      color: "bg-amber-900 text-white",
      borderColor: "border-amber-600",
      fieldKey: "SOIREE",
    },
    {
      id: 4,
      title: "After Party",
      time: "19:00 - 22:00",
      location: "Onni Garden House",
      address: "Jl. Lebak Bulus I No.9, Lb. Bulus, Kec. Cilandak, Jakarta",
      mapUrl: "https://maps.app.goo.gl/Ab99Kd87YoxzMK8z9",
      icon: <Music className="h-6 w-6" />,
      color: "bg-amber-900 text-white",
      borderColor: "border-amber-600",
      fieldKey: "AFTER PARTY",
    },
  ];

  // Filter events based on guest.fields
  const filteredEvents = events.filter(
    (event) => guest && guest.fields && guest.fields[event.fieldKey]
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleEventClick = (event) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  // Check if there are any events to display
  const hasEvents = filteredEvents.length > 0;

  return (
    <div className=" bg-[#422922] pb-8 relative  w-full flex items-start justify-center">
      <Image
          alt="bg"
          src="/frame_page_2_top.png"
          width={1080}
          height={1920}
          className="absolute object-contain w-full h-[100svh] z-0 border"
        />
      <motion.div
        className="max-w-[20rem] mx-auto  pt-[17%]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="inline-block mb-4"
          >
            <Image src="/bow_logogram.svg" alt="bow" width={100} height={100} />
          </motion.div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Our Special Day
          </h1>
          <p className="text-[#dcbfc9]">
            We&apos;re excited to have you join our celebration!
          </p>

          {/* Display event badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {guest?.fields?.GEREJA && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Holy Matrimony
              </span>
            )}
            {guest?.fields?.["TEA PAI"] && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Tea Pai
              </span>
            )}
            {guest?.fields?.SOIREE && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Soirée
              </span>
            )}
            {guest?.fields?.["AFTER PARTY"] && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                After Party
              </span>
            )}
          </div>
        </div>

        {hasEvents ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={item}
                className={`relative ${
                  index !== filteredEvents.length - 1 ? "pb-8" : ""
                }`}
              >
                {index !== filteredEvents.length - 1 && (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-amber-700"
                    aria-hidden="true"
                  ></span>
                )}

                <motion.div
                  className={`relative flex space-x-3 cursor-pointer`}
                  onClick={() => handleEventClick(event)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${event.color} border-2 ${event.borderColor}`}
                  >
                    {event.icon}
                  </div>

                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-lg font-medium text-white">
                        {event.title}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-[#dcbfc9]">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {selectedEvent?.id === event.id && (
                  <motion.div
                    className="mt-3 ml-12 bg-amber-800 bg-opacity-50 p-4 rounded-lg shadow-md border border-amber-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-amber-300 mr-2" />
                        <h3 className="font-medium text-white">
                          {event.location}
                        </h3>
                      </div>
                      <p className="text-sm text-[#dcbfc9] ml-6">
                        {event.address}
                      </p>
                    </div>
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-6 px-3 py-1.5 border border-amber-600 text-xs font-medium rounded-md shadow-sm text-amber-900 bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
                    >
                      View on Maps
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white p-6 bg-amber-800 bg-opacity-30 rounded-lg border border-amber-700"
          >
            <p>No events are scheduled for this guest.</p>
          </motion.div>
        )}

        {hasEvents && (
          <motion.div
            className="mt-12 text-center text-white text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p>Tap on an event to view location details</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
