import React from "react";
import Spinner from "../components/Spinner/Spinner";

const data = Array.from({ length: 50 });

const Itemlist = () => {
  return (
    <div className="launch__list">
      {data &&
        data.map((entry) => (
          <>
            <div className="launch__item ">
              <div className="launch_body">
                <div style={{ display: "flex" }}>
                  <h2>Name</h2>
                  <div className="launch_status">
                    <span className="launch__status--success">Status</span>
                  </div>
                </div>

                <div className="details">
                  <div className="launch__meta">
                    <div className="launch__meta-item">12 Years Ago </div>
                    <a href="" className="launch__meta-item">
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
                    <div className="launch__details">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nobis saepe, suscipit dignissimos commodi consectetur qui
                      tempora sint porro provident necessitatibus cum ad
                      similique, tenetur possimus beatae. Ullam itaque nobis
                      reiciendis.
                    </div>
                  </div>
                </div>

                <div className="btn">View</div>
              </div>
            </div>
          </>
        ))}

      {/* Conditional Rendering */}
      <Spinner></Spinner>
      <p>End of List</p>
    </div>
  );
};

export default Itemlist;
