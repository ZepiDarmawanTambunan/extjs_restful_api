Ext.define("LoginApp.store.Pegawai", {
  extend: "Ext.data.Store",

  alias: "store.pegawai",

  model: "LoginApp.model.Pegawai",
  // definisikan kolom kolom yang ada

  proxy: {
    type: "ajax",
    url: "https://dummyjson.com/users?select=firstName,email,phone",
    reader: {
      type: "json",
      rootProperty: "users",
    },
  },

  autoLoad: true, // digunakan agar store ini otomatis memuat data dari API ketika dibuat.
});
