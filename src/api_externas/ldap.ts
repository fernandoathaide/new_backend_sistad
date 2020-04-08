var senha = 'wff@260981N';
var usuario = '04076228456';

var ldap = require('ldapjs');
var tlsOptions = {
    port: '389'
};
var client = ldap.createClient({
    url: 'ldap://172.16.38.190',
    tlsOptions: tlsOptions
});

client.bind(usuario, senha, function (err) {
    if (err) {
        console.log('Error occurred while binding');
    } else {
        var base = 'dc=intraer';
        var search_options = {
            scope: 'sub',
            filter: '(&(objectClass=*)(CN=' + usuario + '))',
            attrs: 'memberOf'
        };
        client.search(base, search_options, function (err, res) {
            if (err) {
                console.log('Error occurred while ldap search');
            } else {
                res.on('searchEntry', function (entry) {
                    console.log('Entry', JSON.stringify(entry.object));
                });
                res.on('searchReference', function (referral) {
                    console.log('Referral', referral);
                });
                res.on('error', function (err) {
                    console.log('Error is', err);
                });
                res.on('end', function (result) {
                    console.log('Result is', result);
                });
            }
        });
    }
});