import React from "react";
import { Badge, CircularProgress, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";

const PostPage = ({ data, fetchMorePosts, hasMore, isLoggedIn }) => (
  <InfiniteScroll
    dataLength={data.length}
    next={fetchMorePosts}
    hasMore={hasMore}
    loader={<CircularProgress />}
    endMessage={
      <Typography variant="body2" color="textSecondary" align="center">
        You have reached the end of the feed.
      </Typography>
    }
  >
    {data.map((post, index) => (
      <div key={index} style={{ position: "relative" }}>
        <Badge
          badgeContent={index + 1}
          color="primary"
          overlap="circular"
          sx={{ left: 15, top: 15 }}
        />
        <Post initialPostDetails={post} isLoggedIn={isLoggedIn} />
      </div>
    ))}
  </InfiniteScroll>
);

export default PostPage;
