import React from "react";
import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post);
  
  return (
    <main>
      <Header />
    </main>
  );
}

export default Post;

// func() that returns an array of paths which gives us all the slugs that
// were going to need back
export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
    }`;
  const posts = await sanityClient.fetch(query);

  // todo: figure out the paths
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

//uses all the slugs to fetch information for each page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id, 
    title, 
    author -> {
    name, 
    image
  },
   'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true],
    description, 
    mainImage,
    slug, 
  body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    //updates the cache that revalidates the ISR
    revalidate: 60, //after 60 sec, this updates the old cached version 
  };
};
