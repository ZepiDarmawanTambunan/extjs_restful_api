Ext.define("LoginApp.view.pegawais.PegawaisController", {
  extend: "Ext.app.ViewController",
  alias: "controller.pegawais-pegawais",

  onItemSelected: function (sender, record) {
    Ext.Msg.confirm("Confirm", "Are you sure?", "onConfirm", this);
  },
});
