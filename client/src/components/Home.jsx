import { useState } from "react";

import { Link } from "react-router-dom";

function Home() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="">
      <Link to={"/room"}>
        {!joined && (
          <button
            className="bg-green-400 font-semibold font-sans text-xl px-2 py-1 rounded-sm mt-10  ml-8 hover:bg-green-600 hover:text-white"
            onClick={() => setJoined(true)}
          >
            Join Room
          </button>
        )}
      </Link>

      <Link to={"/home"}>
        {joined && (
          <>
            <button
              className="bg-green-400 font-semibold font-sans text-xl px-2 py-1 rounded-sm mt-10  ml-8 hover:bg-green-600 hover:text-white"
              onClick={() => setJoined(false)}
            >
              To Lobby
            </button>
          </>
        )}
      </Link>
    </div>
  );
}

export default Home;
