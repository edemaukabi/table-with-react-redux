Accomplishment: In this application, I fixed and completed this application that fetches data from an API and displays it in a table. I completed all the requirements, including the bonus except the server-side pagination as I don't really have much control over the API used.

Steps to run and test the app:

    Clone or download the file from this repo to your local machine.
    Change directory into the root folder and run npm install.
    Run npm start to run the app and navigate to the appropriate port in your browser.
    You can then search, filter, select by gender and check every other features in the requirements.
    To run the test, in your terminal, run <npm run test>.
    The tests contains basic tests to mock some features of how the components, store and reducer function ought to work. It is unit tests. There is also a possibility for me to write end to end integration tests for it. But I just did the unit tests for now.


Task: Create a web application that fetches data from an API and displays it in a table. The application should also allow the user to search and filter the data.

What I did in addition to the starter code:

    I had to write the reducer function as there was none originally.
    I rendered the table and pagination in the return section of the App component by calling the already existing renderTableHeader, renderTableBody and renderPagination JSX functions.
    I then followed the requirements to ensure I fixed the sorting by writing a compare function that I passed to the sort method I chained to the array of data returned from the API call.
    I added the Gender Column because one of the requirements had filtering by gender. The data returned from the API had no gender, so I just mocked a possible real life scenario by intercepting and adding gender to the data in the fetchUsers function in the userActions file. I did a random gender generation so the names may not totally match in real life. I could just filter by it without adding to the table since it was not needed originally but I had to include it since there was a filter by gender requirement.
    I wrote css styles for it enduring that it is responsive and simple in all screen sizes. I made the table data to overflow and be horizontally scrollable in small screens while also styling the pagination section.
    I tested manually for the requirements in the README.md file to ensure it worked.
    I wrote unit tests to mock the actions of the Component, reducers etc.
    If there are other edge cases I didn't capture, I am open to fixing as well. Thank you

Requirements:

    The application should be built using ReactJS and Redux.
    The API endpoint to fetch data from is https://jsonplaceholder.typicode.com/users. Fetch the data when the application loads.
    Display the data in a table with the following columns: Name, Username, Email, Phone, and Website.
    The table should have pagination that allows the user to navigate through the data.
    The user should be able to search for data by entering a search term in an input field. The search should be performed on the Name and Username columns only.
    The user should be able to filter the data by selecting a value from a dropdown list. The dropdown list should have the following options: All, Male, and Female. Filtering should be performed on the Gender column.
    The user should be able to clear the search term and filter by clicking on a "Clear" button.
    The application should have a clean and responsive design.

Bonus:

    Implement client-side sorting of the table data.
    Implement server-side pagination and sorting.
    Add tests for your components and reducers.

Notes:
    You can use any UI library or CSS framework you like, or write your own styles.
    You don't need to use any specific libraries for search or filtering, but you should be able to explain how your implementation works.
    You can use any testing framework you like, or write your own tests.

Submission

Please submit your code as a GitHub repository with a README file explaining how to run your tests.
Good luck!
