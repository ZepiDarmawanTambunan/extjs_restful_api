Ext.define("LoginApp.view.pegawais.PegawaisController", {
  extend: "Ext.app.ViewController",
  alias: "controller.pegawais-pegawais",

  onItemSelected: function (sender, record) {},
  formTambah: function () {
    var view = this.getView(),
      window = Ext.create("LoginApp.view.pegawais.PegawaiCreate");
    view.add(window);
  },
  onEditClick: function (grid, rowIndex, colIndex) {
    console.log(colIndex);
    console.log(rowIndex);
    console.log(grid);
    var view = this.getView(),
      record = grid.getStore().getAt(rowIndex),
      window = Ext.create("LoginApp.view.pegawais.PegawaiEdit", {
        record: record,
      });
    view.add(window);
    window.loadRecord(record); // menampilkan data ke dalam form textfield
  },
  onHapusClick: function (grid, rowIndex, colIndex) {
    const record = grid.getStore().getAt(rowIndex);
    Ext.MessageBox.confirm("Confirm", "Are you sure?", function (choice) {
      if (choice === "yes") {
        const id = record.get("id");
        Ext.Ajax.request({
          url: `https://dummyjson.com/users/${id}`,
          method: "DELETE",
          success: function (response) {
            Ext.getCmp("pegawai").store.reload(); //id grid di pegawai.js
            Ext.Msg.alert("Sukses", "Data pegawai berhasil dihapus.");
          },
          failure: function (response) {
            console.log("Delete failed!");
          },
        });
      }
    });
  },
  onPageChange: function (pagingToolbar, page, eOpts) {
    var limit = pagingToolbar.store.getPageSize();
    var skip = (page - 1) * limit;
    var url =
      "https://dummyjson.com/users?select=firstName,email,phone&skip=" + skip;
    pagingToolbar.store.getProxy().setUrl(url);
    pagingToolbar.store.load();
  },
});
