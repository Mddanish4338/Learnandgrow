import { motion } from "framer-motion";

const THeader = () => {
  return (
    <motion.div
      className="p-4 flex justify-center items-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Animated Text */}
      <motion.h2
        className="text-4xl font-bold text-blue-600"
        initial={{ scale: 0.8, rotateX: -90 }}
        animate={{ scale: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 120 }}
        whileHover={{ scale: 1.1, rotateZ: 5 }}
        whileTap={{ scale: 0.9, rotateZ: -5 }}
      >
        Trainer Dashboard
      </motion.h2>
    </motion.div>
  );
};

export default THeader;