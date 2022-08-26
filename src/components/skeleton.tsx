import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    style={{
      marginBottom: 50 + "px",
      marginLeft: 40 + "px",
      marginTop: 25 + "px",
    }}
    speed={2}
    width={304}
    height={460}
    viewBox="0 0 304 460"
    backgroundColor="#f5f5f5"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="30" ry="30" width="304" height="460" />
    <rect x="45" y="89" rx="0" ry="0" width="10" height="5" />
    <circle cx="143" cy="135" r="98" />
  </ContentLoader>
);

export default Skeleton;
