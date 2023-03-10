/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
  extend: "LoginApp.Application",

  name: "LoginApp",

  requires: [
    // This will automatically load all classes in the LoginApp namespace
    // so that application classes do not need to require each other.
    "LoginApp.*",
  ],

  // komen / hapus config mainView, agar app.js sama seperti Application.js
  //mainView: 'MantapApp.view.main.Main'
});
