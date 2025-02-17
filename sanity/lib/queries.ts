import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && 
  defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
    title,
    slug,
    _createdAt,
    author -> {
      _id, name,image,bio
    },
    views,description,category,
    image
  }`);

export const STARTUP_QUERY =
	defineQuery(`*[_type == "startup" && _id == $startupId][0] {
      _id, 
    title,
    slug,
    _createdAt,
    author -> {
      _id, name,image,bio, username
    },
    views,description,category,
    image,
    pitch
    }`);

export const STARTUP_VIEWS =
	defineQuery(`*[_type == "startup" && _id == $startupId][0] {
  views, _id
}`);
