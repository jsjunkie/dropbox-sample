import { Dropbox } from "dropbox";

const getFiles = (accessToken, callback, errorCallback) => {
  const dbx = new Dropbox({
    accessToken: accessToken
  });

  dbx
    .filesListFolder({ path: "" })
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      errorCallback(error);
    });
};

export const dropboxService = {
  getFiles: getFiles
};
