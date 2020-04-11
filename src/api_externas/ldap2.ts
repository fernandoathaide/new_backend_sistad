var ldap = require('ldapjs');

//ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

var client = ldap.createClient({
  url: 'ldap://172.16.38.168:389/ou=cpo,dc=fab,dc=intraer',
  idKey: 'uid'
});

client.bind('04076228456', 'wff@260981N', function (err) {
  client.search('ou=cpo,dc=fab,dc=intraer', function (err, search) {
    search.on('searchEntry', function (entry) {
      var user = entry.object;
      console.log(user.objectGUID);
    });
  });
});