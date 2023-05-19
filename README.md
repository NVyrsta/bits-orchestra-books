# Getting Started with Create React App

## Project Setup

To get started with this project, follow the steps below:

1. Fork the repository and clone it to your local machine.
2. Navigate to the project directory and run the following command to install the dependencies:
   ```
   npm install
   ```
3. Once the dependencies are installed, you can start the development server by running the command:

To run the project with the `npm run start-dev` command, you need to install the `concurrently` package globally. Follow the steps below to install it:

3.1 Open your terminal or command prompt.
3.2 Run the following command to install `concurrently` globally:

```
npm install -g concurrently
```

After installing `concurrently` globally, you can run the project using the `npm run start-dev` command. This command will concurrently start the development server and any other necessary scripts.

Note: If you encounter any permission issues while installing the package globally, you may need to use `sudo` or run the command prompt as an administrator.

```
npm run start-dev
```

This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will automatically reload if you make any edits, and you will see any lint errors in the console.

## Project Details

This project implements CRUD functionality using React, TypeScript (ts), SCSS, and React Hooks. It provides the following features:

- Create: You can add new books by filling in the title, image URL, author, category, and ISBN fields in the form.
- Read: The app displays a list of books showing their titles, authors, categories, and other details.
- Update: You can edit the existing book details by clicking on the edit button for a specific book.
- Delete: You can remove a book from the list by clicking on the delete button for a specific book.

The project utilizes React Hooks for managing state and side effects in a functional component-based approach. TypeScript is used for type-checking and providing static types to the code. SCSS is used for styling the components, providing a visually appealing user interface.
