# MERN Server

I have created the following directories:
- `routes`;
- `controllers`;
- `utils`;
- `test`; and
- `data`.
    - Inside this folder, I've created a file called `vitamin_data.json` that contains one entry for manual testing.

I defined the application in `app.js` within the root directory.

Built the router in the file `data_routes.js`.

Created `utilities.js` under `utils` folder. Here, I defined the core logic for the routes in `data_routes.js`. This is where we are reading the data in `vitamin_data.json`. There are three (3) helper functions to enable testing: `setDataFile`, `loadData`, and `getDataFileRelativeToApp`.

Created `data_controller.js` which defines the functions used in `data_routes.js`. I tested localhost:3000/data and it does return the data in the JSON file!