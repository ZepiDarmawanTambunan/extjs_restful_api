Ext.define("LoginApp.view.login.LoginController", {
  extend: "Ext.app.ViewController",
  alias: "controller.login",
  onLoginClick: function () {
    // mendefinisikan variabel me dengan this (this = tampilan Login)
    var me = this,
      email = me.lookup("txtemail").getValue(),
      password = me.lookup("txtpassword").getValue();

    // tampilkan pesan loading
    Ext.MessageBox.show({
      msg: "Harap tunggu.",
      progressText: "Memuat...",
      width: 300,
      wait: {
        interval: 100,
      },
      animateTarget: true,
    });

    // Set timer lamanya menampilkan pesan loading
    me.timer = Ext.defer(function () {
      Ext.Ajax.request({
        url: "http://localhost:8000/api/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        jsonData: {
          email,
          password,
        },
        success: function (response) {
          me.timer = null; //stop loading
          Ext.MessageBox.hide(); // stop messagebox atau popup

          if (response !== null) {
            if (response.status <= 204) {
              // TOKEN EXPIRED
              const now = new Date();
              const expireTime = now.getTime() + 24 * 60 * 60 * 1000; // ditambah 24 jam (dalam milidetik)
              localStorage.setItem("token_expire", expireTime);

              // TOKEN
              let token = JSON.parse(response.responseText).result.access_token;
              localStorage.setItem("access_token", token);

              me.getView().destroy(); // view login dihapus
              Ext.widget("app-main"); //pindah ke app-main
            } else {
              Ext.Msg.alert("Gagal login", response.responseText);
            }
          } else {
            Ext.Msg.alert("Gagal login", response.responseText);
          }
        },
        failure: function (response) {
          // login error
          me.timer = null;
          Ext.MessageBox.hide();
          if (response !== null) {
            Ext.Msg.alert("Gagal login", response.responseText);
          } else {
            Ext.Msg.alert(response.responseText);
          }
        },
      });
    }, 300);
  },
});
