# Zotfit App

## Requirements

To run the Zotfit app, please ensure that your development environment meets the following requirements:

### Node.js Version

Ensure that you have Node.js version 20.11.0 installed. Run the following commands to use version 20.11.0:

```bash
nvm use v20.11.0
```

If version 20.11.0 is not installed, you can install it using:

```bash
nvm install v20.11.0
```

### Dependencies Installation

Install the required dependencies for the app:

```bash
cd Zotfit
npm install
```

### iOS Specific Configuration

For iOS, additional configuration steps are required:

1. Crate a ios foulder

```bash
npx expo run:ios
```

2. Add the line `use_modular_headers!` globally in the Podfile located under the iOS directory of your project.

3. Navigate to the iOS directory:

```bash
cd ios
```

4. Run pod install:

```bash
pod install
```

5. Return to the project root directory:

```bash
cd ..
```

### Running the App

To start the development server:

```bash
nmp install
```

```bash
npx expo start
```

### Note

lkt user is temporary user from Jingjing's VScode, Jingjing just figured out that her pushes are anonymous.

### Database part (Cheng)
#### How `menuGetter` Works

The `menuGetter` function interacts with the UCI Campus Dish API to retrieve the latest menu information for a specified dining hall and meal period (e.g., breakfast, lunch, dinner). It organizes this information into a user-friendly format, allowing Zotfit users to view meal options, nutritional information, and allergen warnings directly within the app.

#### Using `menuGetter` in Zotfit

1. **Setting Up**: Ensure your development environment is set up according to the Zotfit app requirements outlined above.
2. **Integration**: To use the `menuGetter` function :
   - Import the function into the relevant module of your Zotfit app.
   - Decide on the parameters you wish to query (dining location, date, meal period).
3. **Fetching Menu Data**:
   - Call `menuGetter` with the desired parameters. For example, to fetch the dinner menu for Brandywine on the current date:
     ```
     menu_items = menuGetter("daily", "3314", "107")
     ```
   - This call returns a list of menu items, each item containing details like name, description, allergens, calories, and serving size.
4. **Creating MYSQL Database**:
   - **Access MySQL**: Open your terminal or command prompt and log into MySQL as the root user by running `mysql -u root -p`. Enter your root password when prompted.
   - **Create Database**: Once logged in, create the `menu_items` database with the command:
     ```
     CREATE DATABASE menu_items;
     ```
   - **Select Database**: Switch to the newly created database with the command:
     ```
     USE menu_items;
     ```
   - **Create Table**: Execute the following command to create the `food` table where menu items will be stored:
     ```
     CREATE TABLE food (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         calories VARCHAR(50),
         meal_type VARCHAR(50) NOT NULL
     );
     ```
   This setup prepares the MySQL environment to store menu data fetched by `menuGetter`.

5. **Importing Data**:
   Before running the import script, ensure you have `pymysql` installed in your Python environment. If not, install it using pip:
   ```
   pip install pymysql
   ```
   - **Configure the Script**: Open `mysqlIMPORT.py` with a text editor. Update the MySQL connection parameters (`user`, `password`, `db`) to match your setup. Also, ensure the file path to `menu_items.txt` is correct.
   - **Run the Script**: Execute the script from your terminal or command line to import data into your MySQL database:
  ```
  python mysqlIMPORT.py
  ```
   The script reads menu data from `menu_items.txt` and inserts it into the `food` table, making it accessible to the Zotfit app for querying and display.

6. **Run Backend**:
   ```
   npm install mysql@latest
   node server.js
   ```
   If getting the error 'Client does not support authentication protocol requested by server; consider upgrading MySQL client', run below command and replace 'username' with your MySQL username and 'password' with your MySQL password.
   ```
   ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
   ```
   


#### How `recommendation` Works
The `recommendation` module interacts with the OpenAI API to send the user's personal information and meal consumed today from the UCI dining hall. It fetches the recommendation into a user-friendly format, allowing Zotfit users to view their personal health recommendation directly within the app.

#### Using `recommendation` in Zotfit

1. **Setting Up**: Ensure your development environment is set up according to the Zotfit app requirements outlined above.
2. **Integration**: To use the `recommendation` function :
   - Simply update the API key with from own OpenAI account.
   ```
   const openai = new OpenAI({
        apiKey: "" // Add your OpenAI API key here
   });
   ```
3. **Fetching Recommendation Data**:
   - Call `recommendation` with the user's personal information and selectedFoods.
   - This call returns a string of personal recommendations.

