import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from "next-sanity";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",

  useCdn: process.env.NODE_ENV === "production",
};

//function to fetch information, make queries. Sets up clients for fetching data in the getProps function

export const sanityClient = createClient(config);

//helper func() that generates img URLs with only the asset reference data in your documents
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
