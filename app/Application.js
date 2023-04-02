/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define("LoginApp.Application", {
  extend: "Ext.app.Application",

  name: "LoginApp",

  quickTips: false,
  platformConfig: {
    desktop: {
      quickTips: true,
    },
  },

  stores: ["Pegawai"],

  // LIFECYCLE
  launch: function () {
    Ext.getStore("Pegawai").load();
    // Storage yang mau dipake bebas bisa pake apa aja, ex: Cookies, LocalStorage, etc.
    let masukApp;

    const now = new Date().getTime();
    const tokenExpire = localStorage.getItem("token_expire");
    console.log(`${now} dan ${tokenExpire}`);
    if (now > tokenExpire) {
      // waktu kadaluarsa telah tercapai
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expire");
    } else {
      // waktu kadaluarsa masih berlaku
      masukApp = localStorage.getItem("access_token");
      console.log("Token: ", masukApp);
    }

    // cek di localStorage variabel masukApp (true / false)
    // true: gunakan tampilan Main
    // false: gunakan tampilan Login
    Ext.widget(masukApp ? "app-main" : "app-login");
  },

  onAppUpdate: function () {
    Ext.Msg.confirm(
      "Application Update",
      "This application has an update, reload?",
      function (choice) {
        if (choice === "yes") {
          window.location.reload();
        }
      }
    );
  },
});
