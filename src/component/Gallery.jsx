import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Gallery = () => {
  const [pageNo, setPageNo] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [jumpPage, setJumpPage] = useState("");

  const getData = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${pageNo}&limit=12`)
      .then((responce) => {
        setImageData(responce.data);
      })
      .catch((err) => {
        console.error(`We have some kind of error to get data: ${err}`);
      });
  };

  useEffect(() => {
    getData();
  }, [pageNo]);

  return (
    <div className="bg-black h-screen p-4 text-white overflow-auto">
      {/* <button
        onClick={getData}
        className="bg-fuchsia-600 mb-3 active:scale-95 text-white px-5 py-2 rounded"
      >
        Get Data
      </button> */}

      {imageData.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-4 px-10 py-9 ">
            {imageData.map((data, idx) => (
              <div key={idx}>
                <div className="h-50 w-55  bg-white rounded-xl overflow-hidden">
                  <a href={data.url} target="_blank">
                    <img
                      src={data.download_url}
                      alt={data.auther}
                      className="h-full w-full object-cover border-10 border-gray-300  "
                    />
                  </a>
                </div>
                <h2 className="font-bold text-lg">{data.author}</h2>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center p-4 gap-6">
            <button
              onClick={() => {
                if (pageNo > 0) {
                  setPageNo(pageNo - 1);
                  setImageData([]);
                }
              }}
              className={`bg-amber-400 cursor-pointer active:scale-95 text-sm text-black  rounded px-4 py-2 font-semibold ${
                pageNo === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Prev
            </button>
            {pageNo}
            <button
              onClick={() => {
                setPageNo(pageNo + 1);
                setImageData([]);
              }}
              className="bg-amber-400 cursor-pointer active:scale-95 text-sm text-black  rounded px-4 py-2 font-semibold"
            >
              Next
            </button>
          </div>

          <div className="flex justify-center items-center p-4 gap-6">
            <input
              name="jumpPage"
              type="text"
              placeholder="Jump to "
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setJumpPage(value);
              }}
              className="border-2 focus:border-green-400 rounded-2xl p-2"
            />
            <button
              disabled={jumpPage === ""}
              onClick={() => {
                if (jumpPage !== "") {
                  setPageNo(Number(jumpPage));
                  setImageData([]);
                }
              }}
              // style={{jumpPage ==="" ?" ": ""}}
              className="bg-amber-400 cursor-pointer active:scale-95 text-sm text-black  rounded px-4 py-2 font-semibold disabled:opacity-50"
            >
              {" "}
              Jump to{" "}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-black h-full text-white overflow-hidden">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Gallery;
