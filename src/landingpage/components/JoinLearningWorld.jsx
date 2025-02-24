import React from "react";
import SignUpButton from "./SignUpButton";

function JoinLearningWorld() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-10 py-24 bg-sky-900">
      {/* Heading */}
      <h1 className="text-white text-6xl font-extrabold max-md:text-4xl">
        Join a World of Learning
      </h1>

      {/* Description */}
      <p className="mt-6 text-xl max-md:text-sm text-white">
      Enroll in your favorite courses on <strong>Learn & Grow</strong>  <br />
        Learn at your own pace and enhance your skills effectively.
      </p>

      <div className="mt-6">
        <SignUpButton />
      </div>
    </main>
  );
}

export default JoinLearningWorld;
