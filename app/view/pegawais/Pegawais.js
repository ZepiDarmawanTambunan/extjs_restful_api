Ext.define("LoginApp.view.pegawais.Pegawais", {
  extend: "Ext.panel.Panel",
  xtype: "viewpegawai",

  // import apa saja yg dibutuhkan
  requires: [
    "LoginApp.view.pegawais.PegawaisController",
    "LoginApp.view.pegawais.PegawaisModel",
    "LoginApp.store.Pegawai",
  ],

  // alias controller
  controller: "pegawais-pegawais",

  // title
  title: "Pegawai",

  // alias view model
  viewModel: {
    type: "pegawais-pegawais",
  },

  // items apa saja yg akan ditampilkan
  items: [
    {
      xtype: "grid",
      bind: {
        store: "{pegawai}", // ambil data dari store
      },
      columns: [
        { text: "Name", dataIndex: "name" },
        { text: "Email", dataIndex: "email", flex: 1 },
        { text: "Phone", dataIndex: "phone", flex: 1 },
      ],
      listeners: {
        select: "onItemSelected",
      },
    },
  ],
});
