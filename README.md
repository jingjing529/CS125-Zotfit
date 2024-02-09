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
npm install @react-native-community/masked-view react-native-safe-area-context
npm install react-native-gesture-handler
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
npx expo start
```

### Note

lkt user is temporary user from Jingjing's VScode, Jingjing just figured out that her pushes are Anonymous.
