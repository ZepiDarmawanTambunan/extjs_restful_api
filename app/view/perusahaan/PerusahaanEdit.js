Ext.define("LoginApp.view.perusahaan.PerusahaanEdit", {
  extend: "Ext.window.Window",
  xtype: "perusahaan-edit",
  requires: ["LoginApp.store.Perusahaan"],

  title: "Edit Perusahaan",
  modal: true,
  closable: true,
  autoShow: true,
  width: 500,

  items: [
    {
      xtype: "form",
      reference: "perusahaanForm",
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
          name: "name",
        },
      ],
    },
  ],

  buttons: [
    {
      text: "Edit",
      formBind: true,
      handler: function () {
        const data = JSON.parse(localStorage.getItem("data"));
        const token = data.token_type + " " + data.access_token;
        var form = this.up("window").down("form");

        if (form.isValid()) {
          var values = form.getValues(); // ambil nilai dari form
          console.log(values);
          Ext.Ajax.request({
            url: "http://localhost:8000/api/company/update/" + values.id,
            method: "POST",
            jsonData: values, // kirim nilai form dalam bentuk JSON
            headers: {
              Authorization: token, // token diambil dari localStorage
            },
            success: function (response, options) {
              var jsonResponse = Ext.decode(response.responseText);
              Ext.Msg.alert("Sukses", "Data perusahaan berhasil diubah.");
              form.reset();
              form.up("window").close();
              Ext.getCmp("perusahaan").store.reload(); //id grid di perusahaan.js
            },
            failure: function (response, options) {
              var jsonResponse = Ext.decode(response.responseText);
              Ext.Msg.alert(
                "Gagal",
                "Terjadi kesalahan saat menyimpan data perusahaan."
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