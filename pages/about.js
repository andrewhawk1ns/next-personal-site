import Layout from "../components/Layout";
import { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "./_error";

export default class About extends Component {
  state = {
    user: null,
  };

  //Renders on the server
  static async getInitialProps() {
    const res = await fetch("https://api.github.com/users/reedbarger");
    const statusCode = res.status > 200 ? res.status : false;
    const data = await res.json();

    return { user: data, statusCode }; //Adds as a prop
  }

  render() {
    const { user, statusCode } = this.props;

    if (statusCode) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout title="About">
        {JSON.stringify(user.name)}
        <img src={user.avatar_url} alt="JavaScript" height="200px" />
      </Layout>
    );
  }
}
