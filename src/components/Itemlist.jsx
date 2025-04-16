import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// Create some dummy data with IDs or indexes
import axios from "axios";

const LIMIT = 10;

const Itemlist = ({ data, isLoading }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const [launches, setLaunches] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchLaunches = async () => {
    try {
      const response = await axios.post(
        "https://api.spacexdata.com/v4/launches/query",
        {
          query: {},
          options: {
            limit: LIMIT,
            offset: offset,
            sort: {
              date_utc: "asc",
            },
          },
        }
      );

      const newLaunches = response.data.docs;
      const total = response.data.totalDocs;

      setLaunches((prev) => [...prev, ...newLaunches]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(launches.length + newLaunches.length < total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching launches:", error);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  return (
    <div className="launch__list">
      {loading ? (
        <>
          <Spinner></Spinner>
        </>
      ) : (
        <>
          <InfiniteScroll
            style={{ padding: "5px 5px" }}
            className="launch__list"
            next={fetchLaunches}
            dataLength={launches.length}
            hasMore={hasMore}
            loader={<Spinner></Spinner>}
            endMessage={<p>End of List</p>}
          >
            {launches.map((launch, index) => (
              <div key={index} className="launch__item">
                <div className="launch_body">
                  <div style={{ display: "flex" }}>
                    <h2>
                      {launch.name} {index + 1}
                    </h2>
                    <div className="launch_status">
                      <span
                        className={`
                          ${
                            launch.success
                              ? "launch__status--success"
                              : launch.upcoming
                              ? "launch__status--info"
                              : "launch__status--danger"
                          }
                        `}
                      >
                        {launch.success
                          ? "Success"
                          : launch.upcoming
                          ? "Upcoming"
                          : "Failed"}
                      </span>
                    </div>
                  </div>

                  <LaunchDetails launch={launch} open={openIndex === index} />

                  <div
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="btn btn--primary"
                  >
                    <div>{openIndex === index ? "Hide" : "View"}</div>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

const LaunchDetails = ({ launch, open = false }) => {
  return open ? (
    <div className="details">
      <div className="launch__meta">
        <div className="launch__meta-item">12 Years Ago</div>
        <a href={launch.links.article} className="launch__meta-item">
          Article
        </a>
        <a href="" className="launch__meta-item">
          Video
        </a>
      </div>
      <div className="media">
        <div>
          <img src="https://picsum.photos/200" alt="" />
        </div>
        <div className="launch__details">{launch.details}</div>
      </div>
    </div>
  ) : null;
};

export default Itemlist;
