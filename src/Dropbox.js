import React, { Component } from "react";
import "./Dropbox.css";
import { dropboxService } from "./dropboxService";

const ShowFiles = props => (
  <div>
    <button className="button" onClick={() => props.showFiles()}>
      Show my files
    </button>
    {props.filesShown ? <div>These are my files</div> : ""}
    {props.files && props.files.length > 0 ? (
      <ul className="files">
        {props.files.map(file => (
          <li key={file.id} className="file">
            {file.name}
          </li>
        ))}
      </ul>
    ) : (
      ""
    )}
  </div>
);

export default class Dropbox extends Component {
  constructor() {
    super();
    this.state = {
      connected: false,
      filesShown: false,
      files: []
    };
  }
  connect() {
    if (!this.state.connected) {
      window.location = `https://dropbox.com/oauth2/authorize?response_type=token&client_id=${"0u3ru1gy7azjx6x"}&redirect_uri=${"https://w7nlo3wj4l.codesandbox.io/"}`;
    } else {
      localStorage.removeItem("accesstoken");
      this.setState({ connected: false });
    }
  }

  getToken() {
    let hash = window.location.hash;
    if (hash !== "") {
      let queryString = hash.replace("#", "");
      let params = queryString.split("&");
      let parameters = params.reduce((acc, param) => {
        let parts = param.split("=");
        acc[parts[0]] = parts[1];
        return acc;
      }, {});

      let accesstoken = parameters.access_token;
      window.location.hash = "";
      localStorage.setItem("accesstoken", accesstoken);
      this.setState({ connected: true });
    }
  }

  componentDidMount() {
    if (localStorage.getItem("accesstoken") === null) {
      this.getToken();
    } else {
      this.setState({ connected: true });
    }
  }

  showFiles() {
    dropboxService.getFiles(
      localStorage.getItem("accesstoken"),
      files => {
        let reqFiles = files.entries
          .filter(entry => entry[".tag"] === "file")
          .map(file => ({ name: file.name, id: file.id }))
          .slice(0, 10);
        this.setState({ filesShown: true, files: reqFiles });
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <div>
        <span>Connect{this.state.connected ? "ed" : ""} to dropbox</span>
        <button className="button" onClick={() => this.connect()}>
          {this.state.connected ? "Disconnect" : "Connect"}
        </button>
        {this.state.connected ? (
          <ShowFiles
            showFiles={() => this.showFiles()}
            filesShown={this.state.filesShown}
            files={this.state.files}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
