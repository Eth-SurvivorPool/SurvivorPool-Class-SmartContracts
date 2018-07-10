require('babel-register');
var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'shortness kitty coerce reselect sizably credit lapped referable lagged tactical cattishly oxidizing';

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*',
            gas: 6721975
        },
        // ropsten: {
        //     host: "localhost",
        //     port: 8545,
        //     network_id: "3",
	     //    gas:   3900000
        // },
        local: {
            host: "localhost",
            port: 9545,
            network_id: '*',
            gas: 6721975
        },
	    ropsten: {
		    provider: function() {
			    return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/JCs6qYLCphYtcJVWWUpR")
		    },
		    network_id: 3,
		    gas: 4600000,
		    gasPrice: 1000000000
	    }
    }
};
