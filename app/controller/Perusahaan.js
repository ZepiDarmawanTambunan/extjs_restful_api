Ext.define("LoginApp.controller.Perusahaan", {
  extend: "Ext.app.ViewController",
  alias: "controller.perusahaan",

  onItemSelected: function (sender, record) {
    Ext.MessageBox.confirm("Confirm", "Are you sure?", function (choice) {
      if (choice === "yes") {
      }
    });
  },
  formTambah: function () {
    var view = this.getView(),
      window = Ext.create("LoginApp.view.perusahaan.PerusahaanCreate");
    view.add(window);
  },
  onEditClick: function (grid, rowIndex, colIndex) {
    console.log(colIndex);
    console.log(rowIndex);
    console.log(grid);
    var view = this.getView(),
      record = grid.getStore().getAt(rowIndex),
      window = Ext.create("LoginApp.view.perusahaan.PerusahaanEdit", {
        record: record,
      });
    view.add(window);
    window.loadRecord(record); // menampilkan data ke dalam form textfield
  },
  onHapusClick: function (grid, rowIndex, colIndex) {
    const data = JSON.parse(localStorage.getItem("data"));
    const token = data.token_type + " " + data.access_token;
    const record = grid.getStore().getAt(rowIndex);

    Ext.MessageBox.confirm("Confirm", "Are you sure?", function (choice) {
      if (choice === "yes") {
        const id = record.get("id");
        Ext.Ajax.request({
          url: `http://localhost:8000/api/company/${id}`,
          headers: {
            Authorization: token, // token diambil dari localStorage
          },
          method: "DELETE",
          success: function (response) {
            Ext.getCmp("perusahaan").store.reload(); //id grid di perusahaan.js
            Ext.Msg.alert("Sukses", "Data perusahaan berhasil dihapus.");
          },
          failure: function (response) {
            console.log("Delete failed!");
          },
        });
      }
    });
  },
  tesClick: function () {
    Ext.Ajax.request({
      url: "http://localhost:8000/api/company",
      method: "GET",
      success: function (response) {
        console.log(response.responseText);
        // melakukan sesuatu dengan data yang diterima
      },
      failure: function (response) {
        console.log("AJAX request failed");
        // menangani error jika AJAX request gagal
      },
    });
  },
  onSearch: function (textfield, newValue, oldValue, eOpts) {
    var store = this.getViewModel().getStore("perusahaan");
    store.clearFilter();
    if (newValue) {
      store.filter({
        property: "name",
        value: newValue,
        anyMatch: true,
        caseSensitive: false,
      });
    }
  },
});
