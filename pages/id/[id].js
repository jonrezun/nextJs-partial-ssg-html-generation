import React from "react";

const Test = ({ data }) => {
  return (
    <div>
      <h1>Tttle - {data.title}</h1>
    </div>
  );
};

export async function getStaticPaths() {
  let url = "https://jsonplaceholder.typicode.com/todos";
  //different request in depends of command
  if (process.env.CHANGEOUT) {
    url = "https://jsonplaceholder.typicode.com/todos";
  }

  const response = await fetch(url);
  const json = await response.json();

  const paths = [];
  json.forEach((el) => {
    if (el.id < 6) paths.push({ params: { id: el.id + "" } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/" + params.id
  );
  const json = await response.json();

  return {
    props: {
      data: json,
    },
  };
}

export default Test;
