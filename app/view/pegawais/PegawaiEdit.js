Ext.define("LoginApp.view.pegawais.PegawaiEdit", {
  extend: "Ext.window.Window",
  xtype: "pegawai-edit",
  requires: ["LoginApp.store.Pegawai"],

  title: "Edit Pegawai",
  modal: true,
  closable: true,
  autoShow: true,
  width: 500,

  items: [
    {
      xtype: "form",
      reference: "pegawaiForm",
      bodyPadding: 10,
      defaults: {
        xtype: "textfield",
        allowBlank: false,
        anchor: "100%",
        labelAlign: "left",
        labelWidth: 60,
      },
      items: [
        {
          fieldLabel: "ID",
          name: "id",
          readOnly: true,
        },
        {
          fieldLabel: "Nama",
          name: "firstName",
        },
        {
          fieldLabel: "Email",
          name: "email",
          vtype: "email",
        },
        {
          fieldLabel: "Telpon",
          name: "phone",
          xtype: "numberfield",
        },
      ],
    },
  ],

  buttons: [
    {
      text: "Edit",
      formBind: true,
      handler: function () {
        var form = this.up("window").down("form");
        if (form.isValid()) {
          var values = form.getValues(); // ambil nilai dari form
          Ext.Ajax.request({
            url: "https://dummyjson.com/users/" + values.id,
            method: "PUT",
            jsonData: values, // kirim nilai form dalam bentuk JSON
            success: function (response, options) {
              var jsonResponse = Ext.decode(response.responseText);
              Ext.Msg.alert("Sukses", "Data pegawai berhasil diubah.");
              form.reset();
              form.up("window").close();
              Ext.getCmp("pegawai").store.reload(); //id grid di pegawai.js
            },
            failure: function (response, options) {
              var jsonResponse = Ext.decode(response.responseText);
              Ext.Msg.alert(
                "Gagal",
                "Terjadi kesalahan saat menyimpan data pegawai."
              );
            },
          });
        }
      },
    },
  ],

  loadRecord: function (record) {
    this.down("form").loadRecord(record);
  },
});
