Ext.define("LoginApp.model.Pegawai", {
  extend: "LoginApp.model.Base",

  fields: [
    "id",
    "firstName",
    "email",
    "phone",
    { name: "limit", type: "int" },
    { name: "total", type: "int" },
  ],
});
