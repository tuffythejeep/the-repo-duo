let searchList = JSON.parse(localStorage.getItem("searched")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const formEntry = $("#searchForm");
const searchEntry = $("#search");
const formatEntry = $("#formatSelect");

function generateSearchID() {
  //Get the current timestamp
  const timestamp = new Date().getTime();

  // Increment the task ID counter
  nextId++;

  // Save the updated task ID counter to localStorage
  localStorage.setItem("nextId", JSON.stringify(nextId));

  // Return the task ID as a string
  return "search-" + timestamp + "-" + nextId;
}

function handleSearch(event) {
  // Prevent the default behavior
  event.preventDefault();

  // Prints the location entered to console
  console.log("Search entery:", searchEntry.val(), ",", formatEntry.val());

  const searchEntered = document.getElementById("search").value;
  const formatEntered = document.getElementById("formatSelect").value;

  if (searchEntered === "" || formatEntered === "") {
    // Prevent form submission
    event.preventDefault();
  } else {
    const searched = {
      id: generateSearchID(),
      searchEntered: searchEntered,
      formatEntered: formatEntered,
    };

    // Check if the task with the same ID already exists in taskList
    const searchID = searchList.findIndex(
      (location) => location.id === searched.id
    );

    if (searchID !== -1) {
      // Update the existing task if found
      searchList[searchID] = searched;
    } else {
      // Add the new task to taskList
      searchList.push(searched);
    }

    // Save the updated task list to localStorage
    localStorage.setItem("searched", JSON.stringify(searchList));

    // Clear input fields
    $('input[type="text"]').val("");
  }
}

// Submit event on the form
formEntry.on("submit", handleSearch);
