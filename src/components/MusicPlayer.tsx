"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
} from "lucide-react";

type PlayerState = "playing" | "paused" | "loading";

export default function MusicPlayer() {
  const [state, setState] = useState<PlayerState>("paused");
  const [progress, setProgress] = useState(30);

  // Progress simulation

  useEffect(() => {
    if (state !== "playing") return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  // Toggle play with loading

  const handleToggle = () => {
    if (state === "loading") return;

    setState("loading");

    setTimeout(() => {
      setState((prev) => (prev === "playing" ? "paused" : "playing"));
    }, 500);
  };

  // Variants

  const containerVariants = {
    playing: {
      boxShadow: "0 0 40px rgba(139,92,246,0.4)",
      backgroundColor: "#0f0f16",
    },
    paused: {
      boxShadow: "0 0 20px rgba(0,0,0,0.6)",
      backgroundColor: "#0b0b10",
    },
    loading: {
      boxShadow: "0 0 30px rgba(139,92,246,0.2)",
      backgroundColor: "#0d0d14",
    },
  };

  const artworkVariants = {
    playing: { scale: 1 },
    paused: { scale: 0.95 },
    loading: { scale: 0.9 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        variants={containerVariants}
        animate={state}
        transition={{ duration: 0.3 }}
        className="w-125 p-8 rounded-3xl text-white"
      >
        {/* Top section */}
        <div className="flex gap-6">
          {/* Artwork */}
          <motion.div
            variants={artworkVariants}
            animate={state}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-30 h-30 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl"
          >
            <motion.div
              animate={state === "playing" ? { rotate: 360 } : { rotate: 0 }}
              transition={
                state === "playing"
                  ? {
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear",
                    }
                  : { duration: 0.3 }
              }
            >
              🎵
            </motion.div>
          </motion.div>

          {/* Song Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold">Awesome Song Title</h2>
            <p className="text-gray-400">Amazing Artist</p>

            {/* Equalizer */}
            <div className="flex gap-2 mt-3 items-end h-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={
                    state === "playing"
                      ? {
                          height: ["20%", "100%"],
                        }
                      : state === "loading"
                        ? { height: "50%", opacity: 0.5 }
                        : { height: "20%" }
                  }
                  transition={
                    state === "playing"
                      ? {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }
                      : { duration: 0.3 }
                  }
                  className="w-2 bg-purple-500"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-purple-500"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <Shuffle className="cursor-pointer hover:text-white transition" />
          <SkipBack className="cursor-pointer hover:text-white transition" />

          {/* Play button */}
          <motion.button
            onClick={handleToggle}
            disabled={state === "loading"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              state === "loading" ? "bg-gray-600" : "bg-purple-600"
            }`}
          >
            {state === "playing" ? <Pause /> : <Play />}
          </motion.button>

          <SkipForward className="cursor-pointer hover:text-white transition" />
          <Repeat className="cursor-pointer hover:text-white transition" />
        </div>

        {/* Volume */}
        <div className="mt-6 flex items-center gap-3">
          <Volume2 size={18} />
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden group">
            <motion.div
              className="h-full bg-gray-400 group-hover:bg-purple-500"
              style={{ width: "60%" }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
