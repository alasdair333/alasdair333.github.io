"use strict";

define("nodes/components/driver-proxmoxve/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+DQogIHt7I2FjY29yZGlvbi1saXN0IHNob3dFeHBhbmRBbGw9ZmFsc2UgYXMgfCBhbCBleHBhbmRGbiB8fX0NCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQ0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+DQoNCiAgICB7eyEtLSBBbiBleGFtcGxlIGlucHV0IG9wdGlvbiAtLX19DQogICAgPGRpdiBjbGFzcz0icm93IGJveCBtdC0yMCI+DQogICAgICA8aDQ+SW5zdGFuY2UgT3B0aW9uczwvaDQ+DQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPg0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPg0KICAgICAgICAgIDxsYWJlbD5DUFVzPC9sYWJlbD4NCiAgICAgICAgPC9kaXY+DQoNCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMSI+DQogICAgICAgICAge3tjb25maWcuY3B1Q291bnR9fQ0KICAgICAgICA8L2Rpdj4NCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMyI+DQogICAgICAgICAge3tpbnB1dC1zbGlkZXIgdmFsdWU9Y29uZmlnLmNwdUNvdW50IHZhbHVlTWluPTEgdmFsdWVNYXg9MzJ9fQ0KICAgICAgICA8L2Rpdj4NCg0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPg0KICAgICAgICAgIDxsYWJlbD5NZW1vcnkgU2l6ZTwvbGFiZWw+DQogICAgICAgIDwvZGl2Pg0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4NCiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+DQogICAgICAgICAgICB7e2lucHV0LWludGVnZXIgbWluPTEgdmFsdWU9Y29uZmlnLm1lbW9yeVNpemUgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIn19DQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5NQjwvZGl2Pg0KICAgICAgICAgIDwvZGl2Pg0KICAgICAgICA8L2Rpdj4NCiAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KDQogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0NCiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj48c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+DQoNCiAgICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbg0KICAgICAgbW9kZWw9bW9kZWwNCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlDQogICAgfX0NCg0KICAgIHt7Zm9ybS11c2VyLWxhYmVscw0KICAgICAgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscw0KICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpDQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsDQogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikNCiAgICB9fQ0KDQogICAge3tmb3JtLWVuZ2luZS1vcHRzDQogICAgICBtYWNoaW5lPW1vZGVsDQogICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwNCiAgICB9fQ0KICB7ey9hY2NvcmRpb24tbGlzdH19DQoNCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19DQogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0NCg0KICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19DQogIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPSJjYW5jZWwifX0NCjwvc2VjdGlvbj4=";
  const computed = Ember.computed;
  const get = Ember.get;
  const set = Ember.set;
  const alias = Ember.computed.alias;
  const service = Ember.inject.service;
  const defaultRadix = 10;
  const defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'proxmoxve',
    config: alias('model.proxmoxveConfig'),
    app: service(),

    init() {
      const decodedLayout = window.atob(LAYOUT);
      const template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-proxmoxve/template'
      });
      set(this, 'layout', template);

      this._super(...arguments);
    },

    bootstrap: function bootstrap() {
      let config = get(this, 'globalStore').createRecord({
        type: 'proxmoxveConfig',
        pveNode: 'pve',
        pveHost: '',
        pveUser: 'docker-machine',
        pveRealm: 'pve',
        pvePasswd: 'D0ck3rS3cr3t',
        pveStorageName: 'docker-machine',
        pveCpuCores: 2,
        pveMemory: 8,
        pveStorageSize: 40,
        pvePool: 'docker-machine',
        pveSshUser: 'docker',
        pveSshPass: 'tcuser',
        pveImageFile: "docker-machine-iso:iso/rancheros-proxmoxve-autoformat.iso",
        pveVmName: "docker-rancher"
      });
      set(this, 'model.proxmoxveConfig', config);
    },

    validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (parseInt(get(this, 'config.memorySize'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    }

  });
});;
"use strict";

define("ui/components/driver-proxmoxve/component", ["exports", "nodes/components/driver-proxmoxve/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});