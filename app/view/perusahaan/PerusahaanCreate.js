Ext.define("LoginApp.view.perusahaan.PerusahaanCreate", {
  extend: "Ext.window.Window",
  xtype: "perusahaan-create",
  requires: ["LoginApp.store.Perusahaan"],

  title: "Tambah Perusahaan",
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
          fieldLabel: "Nama",
          name: "name",
        },
      ],
    },
  ],

  buttons: [
    {
      text: "Simpan",
      formBind: true,
      handler: function () {
        const data = JSON.parse(localStorage.getItem("data"));
        const token = data.token_type + " " + data.access_token;
        var form = this.up("window").down("form");

        if (form.isValid()) {
          var values = form.getValues(); // ambil nilai dari form
          Ext.Ajax.request({
            url: "http://localhost:8000/api/company",
            method: "POST",
            jsonData: values, // kirim nilai form dalam bentuk JSON
            headers: {
              Authorization: token, // token diambil dari localStorage
            },
            success: function (response, options) {
              var jsonResponse = Ext.decode(response.responseText);
              Ext.Msg.alert("Sukses", "Data perusahaan berhasil disimpan.");
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
});
