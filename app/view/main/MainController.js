/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define("LoginApp.view.main.MainController", {
  extend: "Ext.app.ViewController",

  alias: "controller.main",

  keluarAplikasi: function () {
    var me = this;
    Ext.MessageBox.confirm(
      "Konfirmasi",
      "Kamu yakin mau keluar dari aplikasi?",
      function (choice) {
        if (choice == "yes") {
          // Hapus variabel PenggunaMasuk dari localStorage
          localStorage.removeItem("PenggunaMasuk");

          // Hapus tampilan Main / utama
          me.getView().destroy();

          // Buka tampilan Login
          Ext.widget("app-login");
        }
      }
    );
  },

  onItemSelected: function (sender, record) {
    Ext.Msg.confirm("Confirm", "Are you sure?", "onConfirm", this);
  },

  onConfirm: function (choice) {
    if (choice === "yes") {
      //
    }
  },
});
