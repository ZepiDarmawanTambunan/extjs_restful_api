Ext.define("LoginApp.view.pegawais.PegawaiCreate", {
  extend: "Ext.window.Window",
  xtype: "pegawai-create",
  requires: ["LoginApp.store.Pegawai"],

  title: "Tambah Pegawai",
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
      text: "Simpan",
      formBind: true,
      handler: function () {
        var form = this.up("window").down("form");
        if (form.isValid()) {
          var values = form.getValues(); // ambil nilai dari form
          Ext.Ajax.request({
            url: "https://dummyjson.com/users/add",
            method: "POST",
            jsonData: values, // kirim nilai form dalam bentuk JSON
            success: function (response, options) {
              var jsonResponse = Ext.decode(response.responseText);
              Ext.Msg.alert("Sukses", "Data pegawai berhasil disimpan.");
              form.reset();
              form.up("window").close();
              var pegawaiStore = Ext.getStore("pegawai");
              pegawaiStore.reload();
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
});
