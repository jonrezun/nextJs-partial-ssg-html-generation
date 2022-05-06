import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

const Test = ({ data, id }) => {
  return (
    <div>
      <h1 className={styles.title}>Tttle - {data.title}</h1>
      <Link href={`/id/${+id + 1}`}>
        <a>Page - {+id + 1}</a>
      </Link>
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
      id: params.id,
    },
  };
}

export default Test;
