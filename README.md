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

### Subpart
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
