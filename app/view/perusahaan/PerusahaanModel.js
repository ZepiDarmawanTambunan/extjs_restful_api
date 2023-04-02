Ext.define("LoginApp.view.perusahaan.PerusahaanModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.perusahaan",
  stores: {
    // nama store yg akan dipakai diview
    perusahaan: {
      type: "perusahaan", // alias: store.pegawai
      autoLoad: true,
    },
  },
});
