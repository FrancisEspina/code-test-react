import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { motion } from "motion/react";
const LIMIT = 10;

const Itemlist = ({ data, isLoading, searched }) => {
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
              date_utc: "desc",
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

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searched.toLowerCase())
  );

  if (!filteredLaunches.length) {
    return <div>{loading ? <Spinner></Spinner> : "No Available Launches"}</div>;
  }
  return (
    <>
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
              {filteredLaunches &&
                filteredLaunches.map((launch, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }} // triggers when 20% is in view
                    key={index}
                    className="launch__item "
                  >
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

                      <LaunchDetails
                        launch={launch}
                        open={openIndex === index}
                      />

                      <div
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                        className="btn btn--primary"
                      >
                        <div>{openIndex === index ? "Hide" : "View"}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};

const LaunchDetails = ({ launch, open = false }) => {
  return open ? (
    <div className="details ">
      <div className="launch__meta">
        <div className="launch__meta-item">{getYearsAgo(launch.date_utc)}</div>
        {launch.links.article && (
          <>
            <a href={launch.links.article} className="launch__meta-item">
              Article
            </a>
            <a href={launch.links.webcast} className="launch__meta-item">
              Video
            </a>
          </>
        )}
      </div>
      <div className="media">
        <div>
          {launch.links.patch.small ? (
            <img src={launch.links.patch.large} />
          ) : (
            <div className="no-content">No Image Yet</div>
          )}
        </div>
        <div>
          {launch.details ? (
            <div className="launch__details ">{launch.details}</div>
          ) : (
            <>
              <div className="no-content">No Details Yet</div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

function getYearsAgo(dateString) {
  const inputDate = new Date(dateString);
  const now = new Date();
  const diff = now.getFullYear() - inputDate.getFullYear();
  return `${diff} year${diff !== 1 ? "s" : ""} ago`;
}

export default Itemlist;
