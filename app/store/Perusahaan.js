const data = JSON.parse(localStorage.getItem("data"));
const token = data.token_type + " " + data.access_token;

Ext.define("LoginApp.store.Perusahaan", {
  extend: "Ext.data.Store",

  alias: "store.perusahaan",

  model: "LoginApp.model.Perusahaan",

  proxy: {
    type: "ajax",
    url: "http://localhost:8000/api/company",
    reader: {
      type: "json",
      rootProperty: "result.data",
    },
    headers: {
      Authorization: token, // token diambil dari localStorage
    },
  },
  autoLoad: true, // digunakan agar store ini otomatis memuat data dari API ketika dibuat.
});
