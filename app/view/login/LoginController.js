Ext.define("LoginApp.view.login.LoginController", {
  extend: "Ext.app.ViewController",
  alias: "controller.login",
  onLoginClick: function () {
    // mendefinisikan variabel me dengan this (this = tampilan Login)
    var me = this,
      username = me.lookup("txtuserid").getValue(),
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
        url: "http://localhost:8000/sanctum/csrf-cookie",
        method: "GET",
        withCredentials: true,
        success: function (response) {
          let cookieXSRF_TOKEN =
            document.cookie
              .match("(^|;)\\s*" + "XSRF-TOKEN" + "\\s*=\\s*([^;]+)")
              ?.pop() || "";
          Ext.Ajax.request({
            url: "http://localhost:8000/login",
            method: "POST",
            params: {
              login: username,
              password: password,
              _token: cookieXSRF_TOKEN,
            },
            headers: {
              "X-XSRF-TOKEN": cookieXSRF_TOKEN,
            },
            withCredentials: true,
            success: function (response) {
              // do something after login is successful
              console.log(response);
              me.timer = null;
              Ext.MessageBox.hide();
              var resp = Ext.decode(response.responseText, true);
              if (resp !== null) {
                if (resp == "success") {
                  localStorage.setItem("PenggunaMasuk", true);
                  me.timer = null;
                  Ext.MessageBox.hide();
                  me.getView().destroy();
                  Ext.widget("app-main");
                } else {
                  Ext.Msg.alert("Gagal login", resp.msg);
                }
              } else {
                Ext.Msg.alert("Gagal login", response.responseText);
              }
            },
            failure: function (response) {
              // login error
              me.timer = null;
              Ext.MessageBox.hide();
              var resp = Ext.decode(response.responseText, true);
              if (resp !== null) {
                Ext.Msg.alert("Gagal login", resp.msg);
              } else {
                Ext.Msg.alert(response.responseText);
              }
            },
          });
        },
        failure: function (response) {
          // handle CSRF cookie retrieval errors
          me.timer = null;
          Ext.MessageBox.hide();
          var resp = Ext.decode(response.responseText, true);
          if (resp !== null) {
            Ext.Msg.alert("Gagal login", resp.msg);
          } else {
            Ext.Msg.alert(response.responseText);
          }
        },
      });
    }, 300);
  },
});
