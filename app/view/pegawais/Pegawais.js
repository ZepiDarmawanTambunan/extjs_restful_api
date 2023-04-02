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
  title: "Pegawai | get api && post api: https://dummyjson.com/docs/users",

  // alias view model
  viewModel: {
    type: "pegawais-pegawais",
  },

  // items apa saja yg akan ditampilkan
  items: [
    {
      xtype: "button",
      text: "Tambah",
      iconCls: "x-fa fa-sign-out-alt",
      handler: "formTambah",
      margin: "10 0 10 0",
    },
    {
      xtype: "grid",
      id: "pegawai", //
      bind: {
        store: "{pegawai}", // ambil data dari store
      },
      bbar: {
        xtype: "pagingtoolbar",
        bind: {
          store: "{pegawai}",
        },
        displayInfo: true,
        displayMsg: "Menampilkan data {0} - {1} dari {2}",
        emptyMsg: "Tidak ada data untuk ditampilkan",
        listeners: {
          beforechange: "onPageChange",
        },
        items: function () {
          var store = this.up("grid").getStore();
          var total = store.getTotalCount();
          var limit = store.getPageSize();
          var pageCount = Math.ceil(total / limit);
          var items = [];
          for (var i = 1; i <= pageCount; i++) {
            items.push({
              text: i,
              value: i,
              enableToggle: true,
            });
          }
          return items;
        },
      },
      columns: [
        { text: "ID", dataIndex: "id" },
        { text: "Name", dataIndex: "firstName" },
        { text: "Email", dataIndex: "email", flex: 1 },
        { text: "Phone", dataIndex: "phone", flex: 1 },
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
