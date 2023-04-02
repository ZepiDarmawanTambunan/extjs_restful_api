Ext.define("LoginApp.view.perusahaan.Perusahaan", {
  extend: "Ext.panel.Panel",
  xtype: "viewperusahaan",
  requires: [
    "LoginApp.controller.Perusahaan",
    "LoginApp.model.Perusahaan",
    "LoginApp.store.Perusahaan",
  ],
  controller: "perusahaan",
  title: "Daftar Perusahaan",
  // alias view model
  viewModel: {
    type: "perusahaan",
  },
  items: [
    {
      xtype: "textfield", // Tambahkan textfield
      emptyText: "Cari berdasarkan nama",
      margin: "10 0 10 0",
      listeners: {
        change: "onSearch", // Panggil fungsi pencarian saat nilai pada textfield berubah
      },
    },
    {
      xtype: "button",
      text: "Tambah",
      iconCls: "x-fa fa-sign-out-alt",
      handler: "formTambah",
      margin: "10 0 10 0",
    },
    {
      xtype: "grid",
      id: "perusahaan",
      bind: {
        store: "{perusahaan}",
      },
      columns: [
        { text: "ID", dataIndex: "id" },
        { text: "Name", dataIndex: "name", flex: 1 },
        {
          text: "Aksi",
          xtype: "actioncolumn",
          width: 100,
          items: [
            {
              iconCls: "x-fa fa-edit",
              tooltip: "Edit",
              handler: "onEditClick",
            },
            {
              flex: "1",
            },
            {
              iconCls: "x-fa fa-trash",
              tooltip: "Hapus",
              handler: "onHapusClick",
            },
          ],
        },
      ],
      listeners: {
        select: "onItemSelected",
      },
    },
  ],
});
