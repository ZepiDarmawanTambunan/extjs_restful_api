Ext.define("LoginApp.view.login.Login", {
  extend: "Ext.window.Window",
  xtype: "app-login",

  requires: ["LoginApp.view.login.LoginController", "Ext.form.Panel"],
  controller: "login",

  closable: false,
  resizable: false,
  autoShow: true,
  maximized: true,
  modal: true,
  scrollable: true,
  header: false,
  style: "border-width: 0;",

  layout: {
    type: "vbox",
    align: "center",
    pack: "center",
  },

  items: [
    {
      xtype: "form",
      defaultButton: "loginButton",
      bodyPadding: "20 20",
      width: 415,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      defaults: {
        margin: "5 0",
      },
      title: "Login",
      items: [
        {
          xtype: "label",
          text: "Isi username dan password untuk masuk aplikasi:",
        },
        {
          xtype: "textfield",
          reference: "txtuserid",
          name: "username",
          height: 55,
          hideLabel: false,
          allowBlank: false,
          emptyText: "Username",
        },
        {
          xtype: "textfield",
          reference: "txtpassword",
          name: "password",
          inputType: "password",
          height: 55,
          hideLabel: true,
          allowBlank: false,
          emptyText: "Password",
        },
        {
          xtype: "button",
          reference: "loginButton",
          scale: "large",
          iconAlign: "right",
          iconCls: "x-fa fa-angle-right",
          text: "Masuk",
          formBind: true,
          listeners: {
            click: "onLoginClick",
          },
        },
      ],
    },
  ],
});
