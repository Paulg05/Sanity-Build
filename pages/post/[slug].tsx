import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";

function Post() {
  return (
    <main>
      <Header />
    </main>
  );
}

export default Post;

// func() that tells next.js with paths to pre-build
export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
    }`;
  const posts = await sanityClient.fetch(query);

  // todo: figure out the paths
};
