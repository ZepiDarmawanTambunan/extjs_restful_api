Ext.define("LoginApp.store.Pegawai", {
  extend: "Ext.data.Store",

  alias: "store.pegawai",

  model: "LoginApp.model.Pegawai",
  // definisikan kolom kolom yang ada

  proxy: {
    type: "ajax",
    url: "https://jsonplaceholder.typicode.com/users",
    reader: {
      type: "json",
      rootProperty: "",
    },
  },

  autoLoad: true, // digunakan agar store ini otomatis memuat data dari API ketika dibuat.
});
