Ext.define("LoginApp.view.pegawais.PegawaisModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.pegawais-pegawais",
  stores: {
    // nama store yg akan dipakai diview
    pegawai: {
      type: "pegawai", // alias: store.pegawai
      autoLoad: true,
    },
  },
});
