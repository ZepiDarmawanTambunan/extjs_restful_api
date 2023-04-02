/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define("LoginApp.view.main.Main", {
  extend: "Ext.tab.Panel",
  xtype: "app-main",
  plugins: "viewport",

  requires: [
    "Ext.plugin.Viewport",
    "Ext.window.MessageBox",
    "LoginApp.view.main.MainController",
    "LoginApp.view.main.MainModel",
    "LoginApp.view.main.List",
    "LoginApp.view.pegawais.Pegawais",
  ],

  controller: "main",
  viewModel: "main",

  ui: "navigation",

  tabBarHeaderPosition: 1,
  titleRotation: 0,
  tabRotation: 0,

  header: {
    layout: {
      align: "stretchmax",
    },
    title: {
      bind: {
        text: "{name}",
      },
      flex: 0,
    },
    iconCls: "fa-th-list",
  },

  tabBar: {
    flex: 1,
    layout: {
      align: "stretch",
      overflowHandler: "none",
    },
  },

  responsiveConfig: {
    tall: {
      headerPosition: "top",
    },
    wide: {
      headerPosition: "left",
    },
  },

  defaults: {
    bodyPadding: 20,
    scrollable: true, // panel dapat di-scroll
    tabConfig: {
      responsiveConfig: {
        wide: {
          iconAlign: "left",
          textAlign: "left",
        },
        tall: {
          iconAlign: "top",
          textAlign: "center",
          width: 120,
        },
      },
    },
  },

  items: [
    {
      title: "Home",
      iconCls: "fa-home",
      // The following grid shares a store with the classic version's grid as well!
      items: [
        {
          xtype: "mainlist",
        },
      ],
    },
    {
      title: "Users",
      iconCls: "fa-user",
      bind: {
        html: "{loremIpsum}",
      },
    },
    {
      title: "Pegawai",
      iconCls: "fa-user",
      items: [{ xtype: "viewpegawai" }],
    },
    {
      title: "Perusahaan",
      iconCls: "fa-users",
      items: [{ xtype: "viewperusahaan" }],
    },
    {
      title: "Settings",
      iconCls: "fa-cog",
      items: [
        {
          xtype: "button",
          text: "Keluar",
          iconCls: "x-fa fa-sign-out-alt",
          handler: "keluarAplikasi",
        },
      ],
    },
  ],
});
