const repoNameEl = document.querySelector("#repo-name");
const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");

const getRepoName = function () {
  const queryString = document.location.search;
  const repoName = queryString.split("=")[1];

  if (repoName) {
    repoNameEl.textContent = repoName;

    getRepoIssues(repoName);
  } else {
    document.location.replace("./index.html");
  }
};

const getRepoIssues = function (repo) {
  const apiUrl = `https://www.loc.gov/search/?q=baseball&fo=json`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      document.location.replace("./index.html");
    }
  });
};
